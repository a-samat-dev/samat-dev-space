export const systemDesign = [
  {
    id: "url-shortener",
    menuLabel: "URL Shortener",
    title: "Design a URL Shortener",
    description:
      "A running implementation: API gateway, write and read services, Postgres, a Redis cache and a Redis global counter on Kubernetes. Drive it with simulated traffic and watch it in Grafana.",
    tags: ["Scalability", "Storage", "Caching"],
    links: [],
    // Present when the design has a live system behind it; see UrlShortenerLab.
    lab: {
      // Same hostname as this site, so the browser needs no CORS setup.
      apiBase: "/url-shortener",
      grafanaUrl: "https://samat-dev.space/grafana/d/url-shortener/url-shortener",
      logsUrl: "https://samat-dev.space/grafana/d/url-shortener-logs/url-shortener-logs",
    },
  },
  {
    id: "rate-limiter",
    menuLabel: "Rate Limiter",
    title: "Design a Rate Limiter",
    description: "Token bucket vs. sliding window, and distributed enforcement.",
    tags: ["Distributed Systems"],
    links: [],
  },
];
