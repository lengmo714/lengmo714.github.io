// =======================================================
// af-helper.js
// AppsFlyer Web SDK 自动加载 + 归因数据收集 + 激活事件上报（PWA专用）
// =======================================================

(function (t, e, n, s, a, c, i, o, p) {
  const WEB_APP_ID = "4b126db1-18d6-4353-bfb9-547b3df55cfe"; // ⚠️ 替换为你的 AppsFlyer Web(PBA) 应用 ID
  const STORAGE_KEY_INIT = "AF_INIT_DONE"; // 本地标记是否已上报激活事件

  // ---------- 1. 初始化 AF 全局对象（官方模板逻辑） ----------
  t.AppsFlyerSdkObject = a;
  t.AF = t.AF || function () {
    (t.AF.q = t.AF.q || []).push([Date.now()].concat([].slice.call(arguments)));
  };
  t.AF.id = t.AF.id || i;
  t.AF.plugins = {};

  o = e.createElement(n);
  p = e.getElementsByTagName(n)[0];
  o.async = 1;

  // ---------- 2. 多节点加载策略 ----------
  // 默认使用香港节点，如果失败自动回退到主站点
  const baseUrls = [
    "https://websdk-hk.appsflyer.com",
    "https://websdk.appsflyer.com"
  ];

  function tryLoad(index) {
    if (index >= baseUrls.length) {
      console.error("[AF] ❌ 所有节点加载失败，请检查网络或 CSP 策略");
      return;
    }

    o.src =
      baseUrls[index] +
      "?" +
      (c.length > 0 ? "st=" + c.split(",").sort().join(",") + "&" : "") +
      (i.length > 0 ? "af_id=" + encodeURIComponent(JSON.stringify(i)) : "");

    o.onload = () => {
      console.log("[AF] ✅ SDK 加载成功:", baseUrls[index]);
      initAfterLoad();
    };

    o.onerror = () => {
      console.warn("[AF] ⚠️ 节点加载失败:", baseUrls[index]);
      tryLoad(index + 1);
    };

    p.parentNode.insertBefore(o, p);
  }

  // ---------- 3. SDK 加载完成后的逻辑 ----------
  function initAfterLoad() {
    try {
      AF("pba", "start", { pba: { webAppId: WEB_APP_ID } }, () => {
        console.log("[AF] 🚀 SDK 初始化完成");
        runAttribution();
      });
    } catch (err) {
      console.error("[AF] ❌ SDK 初始化异常:", err);
    }
  }

  // ---------- 4. 获取 AFID + 归因数据 + 激活上报 ----------
  function runAttribution() {
    try {
      // 获取 AFID
      AF("pba", "getAppsFlyerUID", (uid) => {
        console.log("[AF] 🆔 AFID:", uid);
        localStorage.setItem("AFID", uid);
      });

      // 获取归因数据
      AF("pba", "getData", (data) => {
        console.log("[AF] 📊 归因数据:", data);
        localStorage.setItem("AF_ATTR", JSON.stringify(data));
      });

      // 激活事件上报（只执行一次）
      if (!localStorage.getItem(STORAGE_KEY_INIT)) {
        AF("pba", "event", {
          eventType: "CUSTOM",
          eventName: "activation",
          eventValue: { source: "pwa_auto" },
        });
        localStorage.setItem(STORAGE_KEY_INIT, "1");
        console.log("[AF] 🎯 激活事件已上报");
      } else {
        console.log("[AF] 🔁 已上报过激活事件，跳过");
      }
    } catch (err) {
      console.error("[AF] ⚠️ runAttribution 出错:", err);
    }
  }

  // ---------- 5. 启动加载流程 ----------
  tryLoad(0);

})(window, document, "script", 0, "AF", "pba", {
  pba: { webAppId: "4b126db1-18d6-4353-bfb9-547b3df55cfe" },
});
