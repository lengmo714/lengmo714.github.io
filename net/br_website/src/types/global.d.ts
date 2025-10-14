
// 三方库
declare var ClipboardJS: any;
declare var VConsole: any;

// window
interface Window {
    itsfbcode?: string
    itsJsOnelink?: boolean
    itsJsClip?: boolean

    [key: string]: any;
}

// Facebook
declare var fbq: any;



interface ItsCfg {
    getCfg?: (number) => IPlatCfg
    appCfg?: IAppCfg
}

// window 属性
declare var itscfg: ItsCfg;
declare var itsonelink: typeof onelink02; // 定义为类, 就能直接访问静态方法


interface IPlatCfg {
    pid?: number
    onelink?: string
    pix?: string
    apk?: string
}



interface IDynParam {
    FbCode?: string,
    AgentUid?: string,
    PlatId?: number
}

interface IFbInfo {
    pixelId?: string,
    fbc?: string,
    fbp?: string,
}

interface IHttpRsp {
    isOk: boolean,
    msg?: string,
}

const enum ETgType {
    None = 0,
    FbCode = 1,
    AgentUid = 2,
}

const enum EPageType {
    Luodi = 1,
    Agent = 2,
    Official = 3
}

interface IAppCfg {
    Name?: string, // 存储用来区分项目, 后期扩展可以根据项目去定义
    FbCodeAddr?: string,
    TaAppId?: string,
    TaSrvAddr?: string,
    ApkCdnDir?: string,
    IosUrl?: string,
}

const enum EApp {
    VGPoker = "VGPoker",
}

// class
