# Magnus Eye of Horus — Server (Skeleton)

Purpose: hold secrets and proxy model/API calls on behalf of the frontend. DO NOT store provider API keys in the client.

Endpoints (skeleton):
- GET /health - simple health check
- GET /auth/login - redirect to OIDC provider for user login
  - GET /auth/callback - OIDC callback; server sets an HTTP-only session cookie (TTL 5 min)
  - POST /auth/logout - clear session cookie
- POST /proxy/model - forwards model requests to provider using server secret
  - Headers: Authorization: Bearer <jwt>
  - Body: { model: 'gemini', input: {...} }

Security notes:
- JWT TTL defaults to 5 minutes (short-lived session tokens)
- Rate limiting is applied; requests are size-limited and logged
- Add audit logging and persistent storage before production

Run locally:
- cp .env.example .env
- fill in SERVER_GEMINI_API_KEY and SERVER_JWT_SECRET
- npm install
- npm run dev
