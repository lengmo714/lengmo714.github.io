/* eslint-disable no-restricted-globals */
const VERSION = "v46";
const CACHE_NAME = `pwamp-${VERSION}`;

// ✅ 你列出的首批必须资源（按需自改）
const PRECACHE = [
  "./",
  "./index.html",
  "./vconsole.min.js",
];

// —— 小工具 ——

// 判断是否是 HTML 导航（包括 SPA 场景，url 非 .html 也能识别）
function isNavigateHTML(event, url) {
  // event.request.mode === 'navigate' 能覆盖绝大多数“打开页面/路由切换”场景
  if (event.request.mode === "navigate") return true;
  // 补充：显式的 .html 文件
  if (url.pathname.endsWith(".html")) return true;
  return false;
}

// 你原来的“html 不走缓存”语义：所有 html 统一网络优先
function isNoCacheHTML(url) {
  return url.pathname.includes(".html");
}

// 常见静态资源后缀（缓存优先 + 后台更新）
const STATIC_EXTS = [
  ".js", ".css", ".png", ".jpg", ".jpeg", ".webp", ".gif",
  ".svg", ".ico", ".ttf", ".otf", ".woff", ".woff2", ".mp3", ".mp4"
];

function isStaticAsset(url) {
  const p = url.pathname.toLowerCase();
  return STATIC_EXTS.some(ext => p.endsWith(ext));
}

// —— 安装阶段 ——
// 注意：addAll 是“全有或全无”，任何一个失败会让 install 失败，影响后续激活。
// 这里对 index.html 用 {cache:'reload'} 避免命中浏览器 HTTP 磁盘缓存。
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const requests = PRECACHE.map(u => {
      // 对 index.html、根路径强制绕过 HTTP 缓存
      if (u === "./" || u.endsWith("index.html")) {
        return new Request(u, { cache: "reload" });
      }
      return new Request(u);
    });
    try {
      await cache.addAll(requests);
    } catch (e) {
      // 某些资源 404/跨域时可逐个添加，避免整批失败
      for (const req of requests) {
        try { await cache.add(req); } catch (_) { /* 忽略单个失败 */ }
      }
    }
  })());
});

// —— 激活阶段 ——
// 清理旧版本缓存 + 立即接管页面
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names.map((name) => (name !== CACHE_NAME ? caches.delete(name) : Promise.resolve()))
    );
    await clients.claim();
  })());
});

// 可选：页面可通过 navigator.serviceWorker.controller.postMessage({type:'SKIP_WAITING'})
// 来触发版本热切换
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// —— 主拦截逻辑 ——
// 规则：
// 1) 只处理同源 + GET
// 2) /widgets/ 忽略（按你原来的需求）
// 3) HTML/导航：网络优先，失败回退缓存（有离线页就更好）
// 4) 静态资源：缓存优先 + 后台刷新（stale-while-revalidate）
// 5) 其它 GET：简化为缓存优先 -> 网络
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.origin !== location.origin) return;
  if (event.request.method !== "GET") return;
  if (url.pathname.includes("/widgets/")) return;

  // —— HTML 导航：网络优先（并把成功响应写回缓存以便回退）
  if (isNavigateHTML(event, url) || isNoCacheHTML(url)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);

      // 尝试网络
      try {
        // 使用原始请求，保留头信息/credentials 等
        const resp = await fetch(event.request);
        // 只缓存正常 200 的 HTML
        if (resp && resp.ok) {
          cache.put(event.request, resp.clone());
        }
        return resp;
      } catch (e) {
        // 失败回退缓存；没有就给一个简易 Response 或离线页（如已预缓存 /offline.html）
        const cached = await cache.match(event.request);
        if (cached) return cached;
        // 若你有离线页，建议预缓存后在此返回：await cache.match('./offline.html')
        return new Response(
          "<h1>离线</h1><p>当前网络不可用，且本页尚未缓存。</p>",
          { headers: { "Content-Type": "text/html; charset=utf-8" }, status: 503 }
        );
      }
    })());
    return;
  }

  // —— 静态资源：stale-while-revalidate（先返回缓存，同时后台更新）
  if (isStaticAsset(url)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(event.request);
      const fetchAndUpdate = (async () => {
        try {
          const netResp = await fetch(event.request);
          // 只把 ok 的响应写入缓存，避免把 4xx/5xx 污染进去
          if (netResp && netResp.ok) {
            await cache.put(event.request, netResp.clone());
          }
          return netResp;
        } catch (e) {
          // 网络失败时不抛出，让上层回退到 cached
          return undefined;
        }
      })();

      // 有缓存就先秒回，没有再等网络
      if (cached) {
        // 背景刷新，不阻塞返回
        event.waitUntil(fetchAndUpdate);
        return cached;
      } else {
        const netResp = await fetchAndUpdate;
        if (netResp) return netResp;
        // 全部失败：给个兜底错误
        return new Response("资源获取失败且未命中缓存。", { status: 504 });
      }
    })());
    return;
  }

  // —— 其它 GET：简单缓存优先（命中就用；不命中走网络并写回）
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(event.request);
    if (cached) return cached;
    try {
      const resp = await fetch(event.request);
      if (resp && resp.ok) {
        cache.put(event.request, resp.clone());
      }
      return resp;
    } catch (e) {
      return new Response("网络不可用且未命中缓存。", { status: 503 });
    }
  })());
});
