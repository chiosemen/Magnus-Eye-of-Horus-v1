
import { getApiBaseUrl } from "./env.ts";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export async function eyeFetch<T>(
  path: string,
  method: HttpMethod = "GET",
  body?: unknown,
  opts?: { token?: string }
): Promise<T> {
  const base = getApiBaseUrl(); // throws -> fail closed
  const url = `${base}${path}`;

  console.log(`Simulating fetch to ${url}`);
  
  if(path.includes('/v1/dashboard/summary')) {
    return Promise.resolve({
      orgScore: 92,
      controlIntegrity: 99,
      openCritical: 1,
    } as T);
  }

  const res = await fetch(url, {
    method,
    headers: {
      "content-type": "application/json",
      ...(opts?.token ? { authorization: `Bearer ${opts.token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}
