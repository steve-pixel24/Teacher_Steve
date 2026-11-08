// Backend health check: one call on page load, logged to the console only

const HEALTH_URL = '/api/health';
const TIMEOUT_MS = 5000; // longer than the backend's 3-second database check

// Ask the backend how it is doing and log the reply. Never throws, so the app
// works the same when the backend is down or missing.
export async function logBackendHealth(): Promise<void> {
  try {
    const response = await fetch(HEALTH_URL, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) {
      console.warn(`[health] backend answered HTTP ${response.status}`);
      return;
    }
    // Inside the try on purpose: without a backend, Vite answers with the app's HTML.
    console.info('[health]', await response.json());
  } catch (error) {
    console.warn('[health] backend unreachable:', error instanceof Error ? error.name : error);
  }
}
