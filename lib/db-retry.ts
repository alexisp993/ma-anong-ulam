// Neon's serverless Postgres occasionally drops the first query after an
// idle period ("Can't reach database server") — the connection recovers
// immediately after, so a single short retry clears it without surfacing
// a false error to the user.
export async function withDbRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return fn();
  }
}
