// ====================
// VG Poker Service Worker
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
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE);
    })
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

// 请求拦截：优先缓存命中，否则网络请求并更新缓存
self.addEventListener("fetch", event => {
  const req = event.request;
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) {
        return cached;
      }
      return fetch(req)
        .then(res => {
          if (
            req.method === "GET" &&
            req.url.startsWith(self.location.origin)
          ) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
