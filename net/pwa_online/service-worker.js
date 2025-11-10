// =====================
// VG Poker Service Worker
// =====================
const VERSION = "v1.1.4";
const CACHE_NAME = `vgpoker-cache-${VERSION}`;
const PRECACHE = [
  "/",                    // 首页展示页
  "/index.html",
  "/goto.html",           // PWA 应用页
  "/manifest.json",       // 需要缓存，但仍建议动态拉取一次最新
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// 安装阶段：缓存静态资源
self.addEventListener("install", event => {
  console.log("[SW] Installing", VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting(); // 跳过等待，立即生效
});

// 激活阶段：清理旧缓存
self.addEventListener("activate", event => {
  console.log("[SW] Activated", VERSION);
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k !== CACHE_NAME)
        .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim(); // 控制页面立即生效
});

// 请求拦截逻辑
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // ⚠️ 1. manifest.json 总是从网络拉取（否则图标更新不同步）
  if (url.pathname.endsWith("/manifest.json")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // ⚠️ 2. 对 Service Worker 自己也跳过缓存，避免版本错乱
  if (url.pathname.endsWith("/service-worker.js")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // ✅ 3. 静态资源：缓存优先
  if (PRECACHE.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then(resp => {
        return resp || fetch(event.request).then(networkResp => {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResp.clone()));
          return networkResp;
        });
      })
    );
    return;
  }

  // ✅ 4. 其他资源：网络优先（离线 fallback）
  event.respondWith(
    fetch(event.request)
      .then(resp => {
        // 可选：自动缓存图片、脚本等资源
        if (resp.status === 200 && resp.type === "basic") {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return resp;
      })
      .catch(() => caches.match(event.request))
  );
});
