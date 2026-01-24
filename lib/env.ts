
export function requireEnv(name: string): string {
  // In a real Node.js environment, this would be process.env[name].
  // For this browser-based skeleton, we'll simulate it.
  // To demonstrate the fail-closed UI, we will throw an error by default.
  // To see the "happy path", you would change the line below.
  const v = "https://api.eyeofhorus.local"; // Simulating a configured environment
  
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

export function getApiBaseUrl(): string {
  // Set a default for demonstration purposes when not in fail-closed mode.
  // The requireEnv call above will prevent this from being used by default.
  return process.env.EYE_API_BASE_URL || requireEnv("EYE_API_BASE_URL");
}
