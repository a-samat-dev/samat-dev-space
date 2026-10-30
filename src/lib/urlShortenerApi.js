// Client for the URL shortener behind the System Design lab page.

async function request(url, options) {
  const response = await fetch(url, { cache: "no-store", ...options });
  if (!response.ok) {
    throw new Error(`${options?.method ?? "GET"} ${url} answered ${response.status}`);
  }
  return response;
}

export function createUrlShortenerApi(apiBase) {
  const urls = `${apiBase}/api/v1/urls`;
  const cache = `${apiBase}/api/v1/cache`;

  return {
    /** Creates a short url and returns its short code. */
    async createShortUrl(originalUrl, userId) {
      const response = await request(urls, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-User-Id": String(userId) },
        body: JSON.stringify({ originalUrl }),
      });
      return (await response.json()).shortCode;
    },

    /**
     * Requests a short url the way a visitor would, without following the redirect: the
     * simulator must not load whatever page the short url points to.
     *
     * @returns "redirected", "notFound" or "failed"
     */
    async visit(shortCode) {
      const response = await fetch(`${apiBase}/${encodeURIComponent(shortCode)}`, {
        redirect: "manual",
        cache: "no-store",
      });
      // An unfollowed redirect is all the browser reveals about a 302.
      if (response.type === "opaqueredirect") return "redirected";
      if (response.status === 404 || response.status === 410) return "notFound";
      return "failed";
    },

    /** A random selection of existing short codes. */
    async sampleShortCodes(limit) {
      const response = await request(`${urls}?limit=${limit}`);
      return (await response.json()).shortCodes;
    },

    async stats() {
      const [urlStats, cacheStats] = await Promise.all([
        request(`${urls}/stats`).then((r) => r.json()),
        request(`${cache}/stats`).then((r) => r.json()),
      ]);
      return { urls: urlStats.urls, counter: urlStats.counter, cached: cacheStats.entries };
    },

    /**
     * Deletes every short url and resets the counter, then empties the cache. In that order,
     * so a redirect served in between cannot put a deleted url back into the cache.
     */
    async clearEverything() {
      await request(urls, { method: "DELETE" });
      await request(cache, { method: "DELETE" });
    },
  };
}
