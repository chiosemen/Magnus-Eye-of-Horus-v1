
import { getApiBaseUrl } from "./env";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export async function eyeFetch<T>(
  path: string,
  method: HttpMethod = "GET",
  body?: unknown,
  opts?: { token?: string }
): Promise<T> {
  const base = getApiBaseUrl(); // throws -> fail closed
  const url = `${base}${path}`;

  // This is a placeholder for the UI skeleton. In a real app, this would
  // make a network request. For now, we simulate the fail-closed behavior
  // by having getApiBaseUrl() throw, and we'll never successfully return data.
  // If we ever remove the error from env.ts, this will return a mock response.

  console.log(`Simulating fetch to ${url}`);
  
  if(path.includes('/v1/dashboard/summary')) {
    return Promise.resolve({
      orgScore: 92,
      controlIntegrity: 99,
      openCritical: 1,
    } as T);
  }

  // To properly test the fail-closed UI, the `getApiBaseUrl` function in `env.ts`
  // will throw an error, so this part of the code will not be reached.
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
