const CACHE_NAME = 'vgp-cache-v1';

self.addEventListener('install', (event) => {
    console.log("Service Worker 已安装");
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log("Service Worker 已激活");
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    console.log("拦截请求:", event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(networkResponse => {
                // 对图片、HTML、CSS 缓存
                if (event.request.url.startsWith(self.location.origin)) {
                    const cloned = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
                }
                return networkResponse;
            }).catch(() => {
                console.warn("请求失败:", event.request.url);
                return caches.match('/offline.html'); // 可选离线页
            });
        })
    );
});
