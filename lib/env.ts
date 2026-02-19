
export function requireEnv(name: string): string {
  // In production, environment variables are provided server-side. For the frontend
  // prefer a relative '/api' base so the client talks only to the backend proxy.
  const v = import.meta.env.VITE_EYE_API_BASE_URL || '/api';
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

export function getApiBaseUrl(): string {
  // Use Vite-provided env or fall back to a relative API path so the frontend calls the backend proxy.
  return import.meta.env.VITE_EYE_API_BASE_URL || '/api';
}
