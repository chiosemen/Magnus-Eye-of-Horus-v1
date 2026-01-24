
import { getApiBaseUrl } from "./env.ts";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

function timeout(ms: number) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return { controller, clear: () => clearTimeout(id) };
}

async function fetchWithTimeout(url: string, init: RequestInit, ms = 8000) {
  const { controller, clear } = timeout(ms);
  const merged = { ...init, signal: controller.signal } as RequestInit;
  try {
    const res = await fetch(url, merged);
    clear();
    return res;
  } catch (e) {
    clear();
    throw e;
  }
}

export async function eyeFetch<T>(
  path: string,
  method: HttpMethod = "GET",
  body?: unknown,
  opts?: { token?: string; retry?: number }
): Promise<T> {
  const base = getApiBaseUrl(); // throws -> fail closed
  const url = `${base}${path}`;

  const headers: Record<string, string> = {
    "content-type": "application/json",
  };
  if (opts?.token) headers.authorization = `Bearer ${opts.token}`;

  const retriable = method === 'GET' || method === 'PATCH';
  const maxRetries = opts?.retry ?? (retriable ? 2 : 0);
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const res = await fetchWithTimeout(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        cache: 'no-store'
      }, 8000);

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`API error ${res.status}: ${text || res.statusText}`);
      }
      const json = await res.json();
      return json as T;
    } catch (err) {
      attempt++;
      const isAbort = (err as Error).name === 'AbortError';
      if (attempt > maxRetries || isAbort) throw err;
      // simple exponential backoff
      await new Promise((r) => setTimeout(r, 200 * Math.pow(2, attempt)));
    }
  }
  // Should not reach here
  throw new Error('Unreachable');
}
