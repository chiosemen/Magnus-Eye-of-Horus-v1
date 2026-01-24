import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import proxyRoutes from './routes/proxy.js';
import authRoutes from './routes/auth.js';

const server = Fastify({ logger: true });

server.register(cors, { origin: true });

// Ensure required server secrets present (fail-closed)
if (!process.env.SERVER_JWT_SECRET) {
  server.log.error('Missing SERVER_JWT_SECRET - refusing to start');
  throw new Error('Missing SERVER_JWT_SECRET');
}

server.register(jwt, { secret: process.env.SERVER_JWT_SECRET });

server.register(rateLimit, { max: 100, timeWindow: '1 minute' });

server.register((fastify, opts, done) => {
  fastify.register(require('fastify-cookie'));
  done();
});

server.get('/health', async () => ({ status: 'ok', ts: Date.now() }));

// simple kill switch (in-memory; replace with durable store in prod)
let killSwitch = { enabled: false, reason: '' };
server.decorate('killSwitch', killSwitch);

// Attach audit appender
import { appendAudit } from './lib/audit.js';
server.decorate('appendAudit', appendAudit);

// Register OIDC plugin (will throw if not configured)
import oidcPlugin from './plugins/oidc.js';
await server.register(oidcPlugin);

server.register(authRoutes, { prefix: '/auth' });
server.register(proxyRoutes, { prefix: '/proxy' });

import adminRoutes from './routes/admin.js';
server.register(adminRoutes, { prefix: '/admin' });

const start = async () => {
  try {
    const port = Number(process.env.PORT || 4000);
    await server.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
