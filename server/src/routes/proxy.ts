import { FastifyInstance } from 'fastify';
import fetch from 'node-fetch';

export default async function (fastify: FastifyInstance) {
  fastify.addHook('preHandler', async (req: any, reply: any) => {
    // Require authenticated session via cookie or Authorization header (Bearer)
    const authHeader = req.headers.authorization;
    const cookie = req.cookies?.session;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : cookie;

    if (!token) return reply.status(401).send({ error: 'missing_token' });

    try {
      const payload = await fastify.jwt.verify(token);
      // attach user for downstream processing
      req.user = payload;
    } catch (e) {
      fastify.log.warn('invalid_token_attempt');
      return reply.status(401).send({ error: 'invalid_token' });
    }

    // enforce kill switch
    if ((fastify as any).killSwitch && (fastify as any).killSwitch.enabled) {
      return reply.status(503).send({ error: 'service_unavailable', reason: (fastify as any).killSwitch.reason });
    }
  });

  fastify.post('/model', async (req, reply) => {
    const body = req.body as unknown;

    // basic validation
    if (!body || typeof body !== 'object' || !('model' in body) || !('input' in (body as any))) {
      return reply.status(400).send({ error: 'bad_request' });
    }

    // size limit
    const serialized = JSON.stringify(body);
    if (serialized.length > 64_000) return reply.status(413).send({ error: 'payload_too_large' });

    // Forward to model provider with server-side secret
    const providerUrl = process.env.PROVIDER_URL || 'https://api.gemini.example/v1/models/gemini:chat:ft';
    const providerKey = process.env.SERVER_GEMINI_API_KEY;
    if (!providerKey) return reply.status(500).send({ error: 'no_provider_key' });

    // Trace id for correlation
    const traceId = `t-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;

    // Audit: started
    try {
      await (fastify as any).appendAudit({
        traceId,
        user: { sub: (req as any).user?.sub, email: (req as any).user?.email, role: (req as any).user?.role },
        timestamp: new Date().toISOString(),
        action: 'model_request',
        outcome: 'started',
        detail: { model: (body as any).model }
      });
    } catch (e) {
      fastify.log.warn('audit_append_failed_start');
    }

    try {
      const res = await fetch(providerUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${providerKey}`,
          'x-trace-id': traceId
        },
        body: serialized,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        fastify.log.warn({ traceId, status: res.status }, 'provider_error');
        try {
          await (fastify as any).appendAudit({
            traceId,
            user: { sub: (req as any).user?.sub, email: (req as any).user?.email, role: (req as any).user?.role },
            timestamp: new Date().toISOString(),
            action: 'model_request',
            outcome: 'error',
            detail: { status: res.status, providerMessage: String(text).slice(0, 500) }
          });
        } catch (e) {
          fastify.log.warn('audit_append_failed_error');
        }
        return reply.status(502).send({ error: 'provider_error', detail: text.slice(0, 500) });
      }

      const json = await res.json();
      // redact any provider-internal fields before returning (example)
      fastify.log.info({ traceId }, 'model_request_success');
      try {
        await (fastify as any).appendAudit({
          traceId,
          user: { sub: (req as any).user?.sub, email: (req as any).user?.email, role: (req as any).user?.role },
          timestamp: new Date().toISOString(),
          action: 'model_request',
          outcome: 'success',
          detail: { resultSummary: 'OK' }
        });
      } catch (e) {
        fastify.log.warn('audit_append_failed_success');
      }
      return reply.send({ traceId, result: json });
    } catch (err) {
      fastify.log.error({ err }, 'proxy_request_failed');
      try {
        await (fastify as any).appendAudit({
          traceId,
          user: { sub: (req as any).user?.sub, email: (req as any).user?.email, role: (req as any).user?.role },
          timestamp: new Date().toISOString(),
          action: 'model_request',
          outcome: 'error',
          detail: { error: String(err).slice(0, 500) }
        });
      } catch (e) {
        fastify.log.warn('audit_append_failed_exception');
      }
      return reply.status(502).send({ error: 'proxy_error' });
    }
  });
}
