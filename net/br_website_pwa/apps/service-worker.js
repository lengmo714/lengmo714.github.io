self.addEventListener('install', (event) => {
    console.log("Service Worker 已安装");
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log("Service Worker 已激活");
});

self.addEventListener('fetch', (event) => {
    console.log("拦截请求:", event.request.url);
});