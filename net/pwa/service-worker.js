// =====================
// VG Poker Service Worker
// =====================
const VERSION = "v1.1.3";
const CACHE_NAME = `vgpoker-cache-${VERSION}`;
const PRECACHE = [
  "/net/pwa/",
  "/net/pwa/index.html",
  "/net/pwa/goto.html",
  "/net/pwa/icons/icon-192x192.png",
  "/net/pwa/icons/icon-512x512.png"
];

// 安装阶段
self.addEventListener("install", event => {
  console.log("[SW] Installing", VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// 激活阶段
self.addEventListener("activate", event => {
  console.log("[SW] Activated", VERSION);
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 请求拦截
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // ⚠️ 不缓存 manifest.json，强制从网络读取（否则图标会卡旧版本）
  if (url.pathname.endsWith("/manifest.json")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 静态资源缓存优先
  if (PRECACHE.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then(resp => resp || fetch(event.request))
    );
    return;
  }

  // 默认策略：网络优先，失败时用缓存
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
