var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let isDocLoaded = false;
document.addEventListener("DOMContentLoaded", function () {
    isDocLoaded = true;
});
// 固定参数, 如果更具项目变动, 可以配置 config_ext 中
var MyConst;
(function (MyConst) {
    MyConst["JsOnelink"] = "https://lengmo714.top/net/w2a_official_c_pwa/js/onelink02_ext.js";
    MyConst["JsClipboard"] = "https://lengmo714.top/net/w2a_official_c_pwa/js/clipboard.min.js";
    MyConst["JsVConsole"] = "https://lengmo714.top/net/w2a_official_c_pwa/js/vconsole.min.js";
})(MyConst || (MyConst = {}));
var ELogLevel;
(function (ELogLevel) {
    ELogLevel[ELogLevel["Debug"] = 1] = "Debug";
    ELogLevel[ELogLevel["Warn"] = 2] = "Warn";
    ELogLevel[ELogLevel["Error"] = 3] = "Error";
    ELogLevel[ELogLevel["None"] = 4] = "None";
})(ELogLevel || (ELogLevel = {}));
class LogUtil {
    static Now() {
        let d = new Date();
        let str = d.getHours().toString();
        let timeStr = "";
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMinutes().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getSeconds().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMilliseconds().toString();
        if (str.length == 1)
            str = "00" + str;
        if (str.length == 2)
            str = "0" + str;
        timeStr += str;
        timeStr = timeStr + " |";
        return timeStr;
    }
    static SetLv(lv) {
        LogUtil.logLevel = lv;
    }
    static D(fmt, ...args) {
        if (ELogLevel.Debug < LogUtil.logLevel)
            return;
        console.log(LogUtil.Now(), fmt, ...this.argsToJson(...args));
    }
    static E(fmt, ...args) {
        if (ELogLevel.Error < LogUtil.logLevel)
            return;
        console.error(LogUtil.Now(), fmt, ...this.argsToJson(...args));
    }
    static A(cond, fmt, ...args) {
        if (ELogLevel.Error < LogUtil.logLevel || cond)
            return;
        LogUtil.E(fmt, ...this.argsToJson(...args));
        throw new Error("--- exception, stop!");
    }
    static argsToJson(...args) {
        if (!utils.isMobole())
            return args;
        else
            return args.map((ele, index, tmpArr) => { return typeof (ele) == "object" ? JSON.stringify(ele) : ele; });
    }
}
LogUtil.logLevel = ELogLevel.Error;
class utils {
    static getArg(key) {
        var url = window.location.href;
        if (!window.rmg_args) {
            window.rmg_args = {};
            const reg = /(?<=[\? | \&])([^=]+)=([^\&]+)/g;
            url.replace(reg, ($1, $2, $3) => {
                window.rmg_args[$2] = $3;
                return "";
            });
        }
        return window.rmg_args[key];
    }
    static getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        LogUtil.D("--- cookie:", ca);
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    // 使用前必须先引入 clipboard.min.js
    static clipboardSet(txt) {
        if (!txt || txt.length == 0)
            return;
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            if (!window.itsJsClip) {
                yield utils.loadScript(MyConst.JsClipboard);
                window.itsJsClip = true;
            }
            yield logic.createCopyButton();
            // <button id="copy" style="display: none;" data-clipboard-text=""> </button>
            var clipboard = new ClipboardJS("#copy", {
                text: function (trigger) {
                    return txt;
                }
            });
            clipboard.on('success', function (e) {
                e.clearSelection();
                LogUtil.D("--- copy succ!!", txt);
                resolve(null);
            });
            clipboard.on('error', function (e) {
                LogUtil.D("--- copy fail!!", e);
                resolve(e);
            });
            var btn = document.getElementById("copy");
            btn.click();
        })).catch(err => {
            LogUtil.E("--- cp err:", err);
            return err;
        });
    }
    // src 使用引入改脚本的相对路径或绝对路径
    static loadScript(src, attrs) {
        attrs = attrs != undefined ? attrs : { async: true };
        return new Promise((resolve) => {
            let scriptEle = document.createElement('script');
            scriptEle.type = 'text/javascript';
            scriptEle.src = src;
            for (let key in attrs) {
                scriptEle.setAttribute(key, attrs[key]);
            }
            scriptEle.addEventListener('load', function () {
                resolve(src);
            });
            var head = document.head || document.getElementsByTagName('head')[0];
            // head.appendChild(scriptEle);
            // document.body.parentNode.appendChild(scriptEle) // body 还没渲染, 不能使用 body
        }).catch(err => {
            LogUtil.E("--- loadScript err:", err);
            return err;
        });
    }
    static wait(sec) {
        return new Promise((resolve) => {
            setTimeout(() => { resolve(); }, sec * 1000);
        });
    }
    static isAndroid() {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            return false;
        }
        else if (/(Android)/i.test(navigator.userAgent)) {
            return true;
        }
        else {
            return false;
        }
    }
    static isIos() {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            return true;
        }
        else if (/(Android)/i.test(navigator.userAgent)) {
            return false;
        }
        else {
            return false;
        }
    }
    static isMobole() {
        return utils.isAndroid() || utils.isIos();
    }
    static openDev() {
        return __awaiter(this, void 0, void 0, function* () {
            yield utils.loadScript(MyConst.JsVConsole);
            yield utils.wait(0.005);
            new VConsole();
        });
    }
    static ParseNum(num) {
        if (!num)
            return;
        var res = Number(num);
        return !isNaN(res) ? res : null;
    }
    static downloadFile(url) {
        const a = document.createElement('a');
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    static httpReq(url, data, method, header) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                data = data != null && typeof (data) == "object" ? JSON.stringify(data) : data;
                method = method || "POST";
                var xhr = new XMLHttpRequest();
                if (header) {
                    header.forEach((value, key) => {
                        xhr.setRequestHeader(key, value);
                    });
                }
                xhr.ontimeout = () => {
                    xhr.abort();
                    // logger.D(`--- rsp ontimeout`)
                    resolve({ isOk: false, msg: "--- xhr ontimeout" });
                };
                xhr.onerror = () => {
                    // logger.D(`--- rsp onerror`)
                    resolve({ isOk: false, msg: "--- xhr onerror" });
                };
                xhr.open(method || "POST", url, true);
                // xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        LogUtil.D(`--- rsp status: ${xhr.status}, data: ${xhr.responseText}`);
                        resolve({ isOk: xhr.status === 200, msg: xhr.responseText });
                    }
                };
                // logger.D(`--- req url: ${url}, data: ${data}`)
                xhr.send(data);
            });
        });
    }
    // 检测是否标准的 uuid
    static IsStdUUID(txt) {
        return txt != null ? txt.match(/^\w{8}(-\w{4}){3}-\w{12}$/) != null : false;
    }
    // 检测是否游戏 uid
    static IsGameUid(txt) {
        return txt != null ? txt.match(/^\d{10,11}$/) != null : false;
    }
}
class logic {
    // fb 像素初始化
    static fbInit(pixelId) {
        (function (f, b, e, v, n, t, s) {
            if (f.fbq)
                return;
            n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!f._fbq)
                f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', pixelId);
        fbq('track', 'PageView');
        LogUtil.D("--- init fb by pixelId:", pixelId);
    }
    static reqSrvCode(reqObj) {
        return __awaiter(this, void 0, void 0, function* () {
            var url = itscfg.appCfg.FbCodeAddr;
            var data = JSON.stringify({
                "PixelAppId": reqObj.pixelId,
                "Fbc": reqObj.fbc,
                "Fbp": reqObj.fbp,
                "UserAgent": navigator.userAgent,
            });
            let res = yield utils.httpReq(url, data, "POST");
            var txt = null;
            if (res.isOk) {
                var info = JSON.parse(res.msg);
                txt = info.uuid;
            }
            return txt;
        });
    }
    static getFbCode(pixelId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (window.itsfbcode) {
                LogUtil.D("--- cache code:", window.itsfbcode);
                return window.itsfbcode;
            }
            var fbclid = utils.getArg("fbclid");
            if (!fbclid) {
                LogUtil.D("--- no arg: fbclid");
                return;
            }
            var _fbc = utils.getCookie("_fbc");
            var _fbp = utils.getCookie("_fbp");
            _fbc = _fbc != null && _fbc.length > 0 ? _fbc : fbclid;
            if (!_fbc.startsWith("fb.")) {
                _fbc = `fb.1.${new Date().getTime()}.` + _fbc; // 拼接上符合格式的 fbc 数据
            }
            LogUtil.D('--- _fbc:', _fbc);
            LogUtil.D('--- _fbp:', _fbp);
            var code = yield logic.reqSrvCode({ fbc: _fbc, fbp: _fbp, pixelId: pixelId });
            LogUtil.D("--- req code:", code);
            window.itsfbcode = code; // 缓存
            localStorage.setItem("vgp_params", (window.fbCode || ""));
            console.log("[PWA] ✅ 写入成功", (window.fbCode || ""));
            return code;
        });
    }
    static async getPwaCode() {
        let platId = 1007;
        const cfg = logic.getCfg(platId);
        let msg = "";
        if (cfg.pix) {
            const fbCode = await logic.getFbCode(cfg.pix);
            console.log("--- req fbcode:", fbCode);
            msg = fbCode ? `&fbCode=${fbCode}` : "";
            // await utils.clipboardSet(msg);
        }
        return msg;
    }
    static beginDownLoadApk(url, taEvent) {
        LogUtil.A(url != null, "--- download url is null");
        taEvent = (taEvent != undefined) ? taEvent : "ta_page_upload"; //"downLoad"
        var hiddenIframe = document.getElementById('hiddenIframe');
        if (!hiddenIframe) {
            hiddenIframe = document.createElement("iframe");
            hiddenIframe.style.display = "none";
            hiddenIframe.id = "hiddenIframe";
            document.body.appendChild(hiddenIframe);
        }
        if (hiddenIframe) {
            hiddenIframe.src = url;
        }
        else {
            window.location.href = url;
        }
        window.ta && window.ta.track(taEvent);
        window.fbq && window.fbq('trackCustom', 'download', { promotion: 'share_discount_100%' });
    }

    static upDownload(){
        window.fbq && window.fbq('trackCustom', 'download', { promotion: 'share_discount_100%' });
    }
    static getCfg(platId) {
        LogUtil.D(`--- platId: ${platId}`);
        LogUtil.A(itscfg != null, "--- no itscfg"); // 暂时不通过参数传入
        var cfg = itscfg.getCfg(platId);
        LogUtil.D("--- getCfg:", cfg);
        return cfg;
    }
    static getApkUrl(platId) {
        var cfg = logic.getCfg(platId);
        var url = `${itscfg.appCfg.ApkCdnDir}/${cfg.apk}.apk`;
        LogUtil.D("--- apk url:", url);
        return url;
    }
    // 解析规则
    static getTgStartParam(txt) {
        let param = {};
        if (!txt || txt.length == 0)
            return param;
        try {
            let arr = txt.split("_");
            if (arr.length < 2)
                return param;
            let argType = utils.ParseNum(arr[0]) || 0 /* ETgType.None */;
            // 1_5361d114-aaaa-42d3-bd06-992bba39310c_2060
            if (argType == 1 /* ETgType.FbCode */) {
                let fbc = arr[1];
                param.FbCode = utils.IsStdUUID(fbc) ? fbc : null;
            }
            else if (argType == 2 /* ETgType.AgentUid */) {
                let aid = arr[1];
                param.AgentUid = utils.IsGameUid(aid) ? aid : null;
            }
            else {
                LogUtil.D("--- unknow type:", argType);
            }
            if (arr.length >= 3) {
                param.PlatId = utils.ParseNum(arr[2]);
            }
        }
        catch (error) {
            LogUtil.E("--- getTgStartParam, err:", error);
        }
        LogUtil.D("--- dyn param:", param);
        return param;
    }
    // 落地页 使用
    static doDownload(platId) {
        console.log('download start')
        return __awaiter(this, void 0, void 0, function* () {
            console.log('--- click download')
            var cfg = logic.getCfg(platId);
            var dstUrl = null;
            if (cfg.onelink && cfg.pix) {
                var fbCode = yield logic.getFbCode(cfg.pix);
                console.log("--- req fbcode:", fbCode);
                var msg = fbCode != null ? JSON.stringify({ "FbCode": fbCode }) : "";
                yield utils.clipboardSet(msg);
                var gaid = utils.getArg("gaid"); // doDownload测试参数
                console.log("--- gaid:", gaid);
                dstUrl = yield logic.oneLinkGetResultUrl(msg, cfg.onelink, cfg.pid, gaid);
                console.log("--- dst onelink url:", dstUrl);
            }
            if (!dstUrl) {
                dstUrl = logic.getApkUrl(cfg.pid);
            }
            console.log("--- final url:", dstUrl);
            logic.beginDownLoadApk(dstUrl);
        });
    }
    static oneLinkGetResultUrl(jsonMsg, oneLinkURL, platId, gaid) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("--- window.itsJsOnelink:", window.itsJsOnelink);
            if (!window.itsJsOnelink) {
                yield utils.loadScript(MyConst.JsOnelink);
                window.itsJsOnelink = true;
            }
            console.log("--- itsonelink:", itsonelink);
            return yield itsonelink.getResultUrl(jsonMsg, oneLinkURL, platId, gaid);
        });
    }
    // 动态创建 拷贝 需要用到的按钮
    static createCopyButton() {
        return __awaiter(this, void 0, void 0, function* () {
            while (!isDocLoaded) {
                yield utils.wait(0.1);
            }
            let button = document.getElementById("copy");
            if (!button) {
                button = document.createElement("button");
                button.id = "copy";
                button.style.display = "none";
                button.setAttribute("data-clipboard-text", "");
                document.body.appendChild(button);
                LogUtil.D("--- copy btn create succ");
            }
            else {
                LogUtil.D("--- copy btn already exist ");
            }
        });
    }
    // 获取动态渠道号
    static getPlatId() {
        var platId = utils.ParseNum(utils.getArg("platId"));
        var fbArg = logic.getTgStartParam(utils.getArg("fbarg"));
        if (fbArg) {
            if (fbArg.PlatId)
                platId = fbArg.PlatId;
        }
        if (!platId) {
            // 返回默认渠道
            var cfg = logic.getCfg(platId);
            platId = cfg.pid;
        }
        return platId;
    }
    // 官网 使用
    static doOfficial(platId) {
        return __awaiter(this, void 0, void 0, function* () {
            LogUtil.D("--- click doOfficial");
            // 渠道号 和 代理 id
            var agentUid = utils.getArg("agentuid");
            platId = platId || utils.ParseNum(utils.getArg("platId"));
            var fbArg = logic.getTgStartParam(utils.getArg("fbarg"));
            if (fbArg) {
                if (fbArg.AgentUid)
                    agentUid = fbArg.AgentUid;
                if (fbArg.PlatId)
                    platId = fbArg.PlatId;
            }
            LogUtil.D(`--- platId: ${platId}, agentUid: ${agentUid}`);
            var cfg = logic.getCfg(platId);
            var dstUrl = null;
            if (cfg.onelink && cfg.pix) {
                var msg = agentUid != null ? JSON.stringify({ "AgentUid": agentUid }) : "";
                yield utils.clipboardSet(msg);
                var gaid = utils.getArg("gaid"); // 测试参数
                dstUrl = yield logic.oneLinkGetResultUrl(msg, cfg.onelink, cfg.pid, gaid);
                LogUtil.D("--- dst onelink url:", dstUrl);
            }
            if (!dstUrl) {
                dstUrl = logic.getApkUrl(cfg.pid);
            }
            LogUtil.D("--- final url:", dstUrl);
            logic.beginDownLoadApk(dstUrl);
        });
    }
    // 官网 使用
    static doOfficialIos(platId) {
        return __awaiter(this, void 0, void 0, function* () {
            LogUtil.D("--- click doOfficialIos");
            // 渠道号 和 代理 id
            var agentUid = utils.getArg("agentuid");
            platId = platId || utils.ParseNum(utils.getArg("platId"));
            LogUtil.D(`--- platId: ${platId}, agentUid: ${agentUid}`);
            var dstUrl = itscfg.appCfg.IosUrl;
            var msg = agentUid != null ? JSON.stringify({ "AgentUid": agentUid }) : "";
            yield utils.clipboardSet(msg);
            let taEvent = "ta_page_upload";
            window.ta && window.ta.track(taEvent);
            LogUtil.D("--- final url:", dstUrl);
            window.location.href = dstUrl;
        });
    }
    static showLoading() {
        const loadingElement = document.getElementById('loading');
        loadingElement.classList.add('show');
        LogUtil.D('show loading');
        // 禁用所有交互元素
        const elements = document.querySelectorAll('button, input, a, img'); // 可以选择更多元素
        elements.forEach(el => {
            el.style.pointerEvents = 'none'; // 禁用所有点击事件
            el.style.opacity = '0.5'; // 可选：改变透明度来表示禁用状态
        });
    }
    static hideLoading() {
        const loadingElement = document.getElementById('loading');
        loadingElement.classList.remove('show');
        LogUtil.D('hide loading');
        // 恢复所有交互元素
        const elements = document.querySelectorAll('button, input, a, img'); // 恢复同样的元素
        elements.forEach(el => {
            el.style.pointerEvents = 'auto'; // 重新启用点击事件
            el.style.opacity = ''; // 恢复透明度
        });
    }
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        window.mylib = {
            utils: utils,
            logic: logic,
        };
        utils.getArg("save_data"); // 第一时间缓存参数
        // 调试模式
        let isDev = utils.getArg("isdev") != null;
        if (isDev) {
            LogUtil.SetLv(ELogLevel.Debug);
            yield utils.openDev();
        }
        LogUtil.D("--- inited succ2, app:", itscfg.appCfg.Name);
        // 以下逻辑需要等待 document 完全加载完, 如需要动态创建原始
        // while (!isDocLoaded) {
        //     await utils.wait(0.1)
        // }
    });
})();
