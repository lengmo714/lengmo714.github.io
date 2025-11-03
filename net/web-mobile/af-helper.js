// af-helper.js
// 自动初始化并执行 AppsFlyer Web SDK 归因流程（PWA 专用）

(function () {
  const WEB_APP_ID = "4b126db1-18d6-4353-bfb9-547b3df55cfe"; // ⚠️ 替换为你的 AppsFlyer Web(PBA) 应用 ID
  const STORAGE_KEY_INIT = "AF_INIT_DONE";

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = false; // ⚠️ 保证按顺序执行
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function log(...args) {
    console.log("[AF]", ...args);
  }

  async function initAF() {
    try {
      log("加载 AppsFlyer Web SDK...");

      // ✅ 必须是完整路径（注意：非 .com 结尾！）
      await loadScript("https://websdk.appsflyer.com/websdk/latest/appsflyer.js");

      if (typeof AF === "undefined") {
        throw new Error("AF 未定义，SDK 未正确加载");
      }

      // ✅ 初始化 PBA（People-Based Attribution）
      AF("pba", "start", { pba: { webAppId: WEB_APP_ID } }, () => {
        log("SDK 初始化完成");
        runAttribution();
      });
    } catch (err) {
      console.error("[AF] SDK 加载失败:", err);
    }
  }

  function runAttribution() {
    try {
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
    } catch (e) {
      console.error("[AF] runAttribution 出错:", e);
    }
  }

  // ---------- 自动执行 ----------
  window.addEventListener("load", initAF);
})();
