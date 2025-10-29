// ====================
// VG Poker Service Worker
// ====================
const CACHE_NAME = "vgpoker-cache-v2";
const PRECACHE = [
  "/net/pwa/manifest.json",
  "/net/pwa/icons/icon-192x192.png",
  "/net/pwa/icons/icon-512x512.png"
];

// 安装阶段：缓存静态资源
self.addEventListener("install", event => {
  console.log("[SW] Installing...");
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      for (const url of PRECACHE) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            await cache.put(url, res);
            console.log("[SW] Cached:", url);
          } else {
            console.warn("[SW] Skip (status " + res.status + "):", url);
          }
        } catch (err) {
          console.warn("[SW] Failed to fetch:", url, err);
        }
      }
      self.skipWaiting();
    })()
  );
});

// 激活阶段：清理旧缓存
self.addEventListener("activate", event => {
  console.log("[SW] Activated");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 请求拦截：优先缓存命中，否则网络请求并更新缓存
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        return cached;
      }
      return fetch(event.request)
        .then(res => {
          if (
            event.request.method === "GET" &&
            event.request.url.startsWith(self.location.origin)
          ) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          }
          return res;
        })
        .catch(() => {
          console.warn("[SW] Network failed, no cache:", event.request.url);
          return new Response("Offline");
        });
    })
  );
});
