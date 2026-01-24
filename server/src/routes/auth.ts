import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  // Redirect the user to the OIDC provider for login
  fastify.get('/login', async (req, reply) => {
    const client = (fastify as any).oidcClient;
    const redirectUri = process.env.OIDC_REDIRECT_URI || `http://localhost:${process.env.PORT || 4000}/auth/callback`;
    const url = client.authorizationUrl({ scope: 'openid email profile', redirect_uri: redirectUri });
    return reply.redirect(url);
  });

  // Callback endpoint - exchange code for tokens and create a short-lived session JWT
  fastify.get('/callback', async (req: any, reply: any) => {
    const client: any = (fastify as any).oidcClient;
    const params = client.callbackParams(req.raw);
    const redirectUri = process.env.OIDC_REDIRECT_URI || `http://localhost:${process.env.PORT || 4000}/auth/callback`;
    try {
      const tokenSet = await client.callback(redirectUri, params, { response_type: 'code' });
      const claims = tokenSet.claims();

      // Determine role from email against configured admin list
      const adminList = (process.env.SERVER_ADMIN_EMAILS || '').split(',').map(s => s.trim()).filter(Boolean);
      const role = adminList.includes(claims.email) ? 'admin' : 'user';

      const sessionToken = fastify.jwt.sign({ sub: claims.sub, email: claims.email, role }, { expiresIn: '5m' });

      // Set cookie (HTTP-only, Secure in prod)
      const secure = process.env.NODE_ENV === 'production';
      reply.setCookie('session', sessionToken, { httpOnly: true, secure, sameSite: 'lax', path: '/', maxAge: 300 });
      return reply.redirect('/');
    } catch (err) {
      fastify.log.error(err);
      return reply.status(401).send({ error: 'invalid_auth' });
    }
  });

  // Logout: clear cookie
  fastify.post('/logout', async (req, reply) => {
    // clear cookie if plugin present
    if ((reply as any).clearCookie) (reply as any).clearCookie('session');
    return reply.send({ ok: true });
  });
}
