import { dynamicAtlasManager, macro, sys } from "cc"
import { Lang, LanguageList } from "../module/language/Lang"
import { ELogLevel, LogUtil } from "../module/log/LogUtil"
import { ResMgr } from "../module/res/ResMgr"
import { AudioMgr } from "./audio/AudioMgr"
import { ConfigMgr } from "./common/ConfigMgr"
import { EnumUI } from "./common/EnumUI"
import { DataMgr } from "./data/DataMgr"
import { HttpMgr } from "./net/HttpMgr"
import { NetConfig } from "./net/NetConfig"
import { PlatformMgr } from "./platform/PlatformMgr"
import { TipsManager } from "./ui/TipsMgr"
import { UIMgr } from "./ui/UIMgr"
import { localStorageMgr } from "../logic/common/LocalStorageMgr";
import { ClientDottingName, Prefs } from "../logic/common/EnumCommon";
import { HttpReq } from "./data/HttpReq"
import { UIPnlHotupdateLogic } from "./ui/login/UIPnlHotupdate/UIPnlHotupdateLogic"
import { LogicTool } from "../module/common/LogicTool"
import { Tool } from "../module/common/Tool"

export class App {
    public static Ins: App

    constructor() {
        App.Ins = this
        macro.CLEANUP_IMAGE_CACHE = false;
        dynamicAtlasManager.enabled = true; // -- 动态合图
        PlatformMgr.Ins = new PlatformMgr()
        HttpMgr.Ins = new HttpMgr()
        ResMgr.Ins = new ResMgr()
        UIMgr.Ins = new UIMgr()
        ConfigMgr.Ins = new ConfigMgr()
        AudioMgr.Ins = new AudioMgr()
        DataMgr.Ins = new DataMgr()
        TipsManager.Ins = new TipsManager()
        NetConfig.Ins = new NetConfig()
    }

    async start() {
        LogUtil.setLog(ELogLevel.None);
        // LogUtil.setLog(ELogLevel.Debug);
        await UIMgr.Ins.start();
        await PlatformMgr.Ins.Start();
        await this.goThree();
        // await Tool.getMyUid();        
        LogUtil.D("--- app start")
        window["device"] = "Mobile";
        LogUtil.D("--- pack_cfg = ", window["pack_cfg"]);
        LogUtil.D("--- pack_data = ", window["pack_data"]);
        if (!sys.isNative && (sys.platform === sys.Platform.MOBILE_BROWSER || sys.platform === sys.Platform.DESKTOP_BROWSER)) {
            this.setWebData();
        }
        HttpReq.Ins.reqDottingNoUid(ClientDottingName.gameenterpathflow, { eid: `${LogicTool.GetDeviceID()}`, eventname: "6", channel: window["pack_data"] ? window["pack_data"].channel_id : "" });
        AudioMgr.Ins.init()
        let lineno1 = 0;
        let colno1 = 0;
        let message1;
        window.onerror = (message, source, lineno, colno, error) => {
            if (lineno != lineno1 && colno1 != lineno && message != message1) {
                HttpReq.Ins.reqDotting(ClientDottingName.clientError, { type: `5`, content: `捕获到全局错误:来源: ${source},行号: ${lineno},列号: ${colno}`, additional: `错误对象: ${error}` });
            }
            lineno1 = lineno;
            colno1 = colno;
            message1 = message;
            return true;
        };
        window.addEventListener("unhandledrejection", (event) => {
            let errorInfo = {
                message: "",
                stack: "",
            };

            if (event.reason instanceof Error) {
                errorInfo.message = event.reason.message;
                errorInfo.stack = event.reason.stack;
            } else {
                errorInfo.message = event.reason.toString();
            }
            const errorInfoString = JSON.stringify(errorInfo);
            HttpReq.Ins.reqDotting(ClientDottingName.clientError, { type: `3`, content: `未处理的 Promise 异常`, additional: `${errorInfoString}` });
        });
        window.addEventListener("error", (event) => {
            const target = event.target as HTMLElement;
            if (target && (target.tagName === "IMG" || target.tagName === "SCRIPT" || target.tagName === "LINK")) {
                HttpReq.Ins.reqDotting(ClientDottingName.clientError, { type: `4`, content: `资源加载失败:`, additional: `${target.getAttribute("src") || target.getAttribute("href")}` });
            }
        }, true);
        let fiatCurrency = localStorageMgr.get(Prefs.fiatCurrency);
        if (fiatCurrency == "null" || !fiatCurrency) {
            localStorageMgr.set(Prefs.fiatCurrency, "R$");
        }
        let lang = localStorageMgr.get(Prefs.language);
        LogUtil.D("lang = ", lang);
        if (lang == "null" || !lang) {
            localStorageMgr.set(Prefs.language, LanguageList.pt_br);
            await Lang.Start(LanguageList.pt_br);
        } else {
            await Lang.Start(localStorageMgr.get(Prefs.language));
        }
        let firstEntering = localStorageMgr.get(Prefs.firstEntering);
        if (firstEntering == null) {
            localStorageMgr.set(Prefs.firstEntering, "true");
        }
        let logicIns: UIPnlHotupdateLogic = await UIMgr.Ins.CreateWindowCustomAsync(EnumUI.Hotupdate, UIPnlHotupdateLogic);
    }
    private async setWebData() {
        let searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get("channlId")) {
            window["pack_data"] = {
                channel_id: searchParams.get("channlId"),
            }
        }
        if (searchParams.get("scheme")) {
            localStorageMgr.set(Prefs.scheme, searchParams.get("scheme"));
        }
        if (searchParams.get("pwa")) {
            localStorageMgr.set(Prefs.pwa, searchParams.get("pwa"));
            let fiatCurrency = localStorageMgr.get(Prefs.fiatCurrency);
            if (fiatCurrency == "null" || !fiatCurrency) {
                localStorageMgr.set(Prefs.fiatCurrency, "$");
            }
            let lang = localStorageMgr.get(Prefs.language);
            LogUtil.D("lang = ", lang);
            if (lang == "null" || !lang) {
                localStorageMgr.set(Prefs.language, LanguageList.en_us);
                await Lang.Start(LanguageList.en_us);
            } else {
                await Lang.Start(localStorageMgr.get(Prefs.language));
            }
        }
        if (searchParams.get("androidId")) {
            localStorageMgr.set(Prefs.MMuuid, searchParams.get("androidId"));
        } else {
            LogicTool.GetDeviceID();
        }
        if (searchParams.get("afuid")) {
            localStorageMgr.set(Prefs.mAfUid, searchParams.get("afuid"));
            HttpReq.Ins.reqDottingNoUid(ClientDottingName.apptrackingdata, { af_status: "Non-organic", afid: `${searchParams.get("afuid")}` });
        }
        LogUtil.D("-----pwa = ", searchParams.get("pwa"))
        LogUtil.D("-----androidId = ", searchParams.get("androidId"))
        LogUtil.D("-----channlId = ", searchParams.get("channlId"))
        LogUtil.D("-----scheme = ", searchParams.get("scheme"))
    }
    private async goThree() {
        if (sys.platform == sys.Platform.ANDROID) {
            Tool.afEvent("getInstall");
            Tool.afEvent("getAfUid");
            Tool.getUrl("getUrl");
            Tool.getFCMtoken();
            Tool.getHaveGGLogin();
        } else if (sys.platform == sys.Platform.IOS) {
            await Tool.getIOSDeviedId();
            await Tool.readPackdb();
            await Tool.iosAfEvent("getInstall");
            await Tool.iosAfEvent("getAfUid");
            await Tool.getIosFCMtoken();
        }
    }
}