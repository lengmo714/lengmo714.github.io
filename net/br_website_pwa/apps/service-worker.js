self.addEventListener('install', (event) => {
    console.log("Service Worker 已安装");
    self.skipWaiting();
    event.waitUntil(Promise.resolve());
});

self.addEventListener('activate', (event) => {
    console.log("Service Worker 已激活");
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    console.log("拦截请求:", event.request.url);
});