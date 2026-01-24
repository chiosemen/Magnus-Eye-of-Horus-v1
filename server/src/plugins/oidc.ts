import { FastifyInstance } from 'fastify';
import * as OpenID from 'openid-client';

export default async function (fastify: FastifyInstance) {
  const issuerUrl = process.env.OIDC_ISSUER;
  const clientId = process.env.OIDC_CLIENT_ID;
  const clientSecret = process.env.OIDC_CLIENT_SECRET;
  const redirectUri = process.env.OIDC_REDIRECT_URI || `http://localhost:${process.env.PORT || 4000}/auth/callback`;

  if (!issuerUrl || !clientId || !clientSecret) {
    fastify.log.error('OIDC configuration missing. Set OIDC_ISSUER, OIDC_CLIENT_ID and OIDC_CLIENT_SECRET.');
    throw new Error('Missing OIDC configuration'); // fail-closed
  }

  const Issuer = (OpenID as any).Issuer;
  const issuer = await Issuer.discover(issuerUrl);
  const client = new issuer.Client({ client_id: clientId, client_secret: clientSecret, redirect_uris: [redirectUri], response_types: ['code'] });

  // Expose client via decorate for routes
  fastify.decorate('oidcClient', client);
}
