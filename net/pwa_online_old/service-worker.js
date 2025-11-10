// ====================
// VG Poker Service Worker (Safe version)
// ====================
const CACHE_NAME = "vgpoker-cache-v1";
const PRECACHE = [
  "/",
  "/manifest.json",
  "/icons/icon-192x192.v1.png",
  "/icons/icon-512x512.v1.png",
];

// 安装阶段：缓存静态资源
self.addEventListener("install", event => {
  console.log("[SW] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// 激活阶段：清理旧缓存
self.addEventListener("activate", event => {
  console.log("[SW] Activated");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// 请求拦截：优先缓存，否则网络，否则返回兜底响应
self.addEventListener("fetch", event => {
  const req = event.request;
  event.respondWith(
    (async () => {
      const cached = await caches.match(req);
      if (cached) return cached;

      try {
        const res = await fetch(req);
        if (req.method === "GET" && req.url.startsWith(self.location.origin)) {
          const copy = res.clone();
          const cache = await caches.open(CACHE_NAME);
          cache.put(req, copy);
        }
        return res;
      } catch (err) {
        console.warn("[SW] Fetch failed:", err);
        // fallback response to avoid TypeError
        return cached || new Response("Offline or fetch failed", { status: 503 });
      }
    })()
  );
});
