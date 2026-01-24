import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  // Admin-only endpoints
  fastify.addHook('preHandler', async (req: any, reply: any) => {
    // require session
    const authHeader = req.headers.authorization;
    const cookie = req.cookies?.session;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : cookie;
    if (!token) return reply.status(401).send({ error: 'missing_token' });
    try {
      const payload = await fastify.jwt.verify(token) as any;
      if (payload.role !== 'admin') return reply.status(403).send({ error: 'forbidden' });
      req.user = payload;
    } catch (e) {
      return reply.status(401).send({ error: 'invalid_token' });
    }
  });

  fastify.get('/kill-switch', async (req: any) => ({ enabled: (fastify as any).killSwitch.enabled, reason: (fastify as any).killSwitch.reason }));

  fastify.post('/kill-switch', async (req: any, reply: any) => {
    const body = req.body as any;
    if (!body || typeof body.enabled !== 'boolean' || (body.enabled && !body.reason)) {
      return reply.status(400).send({ error: 'bad_request' });
    }
    (fastify as any).killSwitch = { enabled: body.enabled, reason: body.reason };
    return { ok: true };
  });
}
