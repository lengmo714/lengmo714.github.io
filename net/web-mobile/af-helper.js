// af-helper.js
// 自动初始化并执行 AppsFlyer Web SDK 归因流程

(function() {
  const WEB_APP_ID = "4b126db1-18d6-4353-bfb9-547b3df55cfe"; // ⚠️ 替换为你的 AppsFlyer Web(PBA) 应用 ID
  const STORAGE_KEY_INIT = "AF_INIT_DONE";

  // ---------- 内部工具 ----------
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function log(...args) {
    console.log("[AF]", ...args);
  }

  // ---------- 主逻辑 ----------
  async function initAF() {
    try {
      log("加载 AppsFlyer Web SDK...");
      await loadScript("https://websdk.appsflyer.com");

      // 初始化 SDK
      AF("pba", "start", { pba: { webAppId: WEB_APP_ID } }, () => {
        log("SDK 初始化完成");
        runAttribution();
      });
    } catch (err) {
      console.error("[AF] SDK 加载失败:", err);
    }
  }

  async function runAttribution() {
    // 获取 afid
    AF("pba", "getAppsFlyerUID", (uid) => {
      log("AFID:", uid);
      localStorage.setItem("AFID", uid);
    });

    // 获取归因数据
    AF("pba", "getData", (data) => {
      log("归因数据:", data);
      localStorage.setItem("AF_ATTR", JSON.stringify(data));
    });

    // 上报激活事件（只上报一次）
    if (!localStorage.getItem(STORAGE_KEY_INIT)) {
      AF("pba", "event", {
        eventType: "CUSTOM",
        eventName: "activation",
        eventValue: { source: "pwa_auto" },
      });
      localStorage.setItem(STORAGE_KEY_INIT, "1");
      log("激活事件已上报");
    } else {
      log("已上报过激活事件，跳过");
    }
  }

  // ---------- 自动执行 ----------
  window.addEventListener("load", initAF);
})();
