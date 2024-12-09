export function parseUrl(url: string): URL {
  try {
    return new URL(url);
  } catch (error) {
    throw new Error(`Invalid URL: ${url}`);
  }
}
