
let AppConst: IAppCfg = {
    Name: EApp.VGPoker,
    FbCodeAddr: "https://www.domainprojectd.com/fb/landingpage",

    // TaAppId: "7206c4a5542f4f1d948df21cb028b9ed",
    // TaSrvAddr: "https://ta.rmgstation.com/sync_json",

    ApkCdnDir: "https://oss.domaingoogleapp.com/client/googlePlay/app",
    // IosUrl: "https://apps.apple.com/in/app/ggrummy-classical-rummy-game/id6739034700",
}

var cfgArr: IPlatCfg[] = [
    { pid: 1017, onelink: "https://vgpokergoogplay.onelink.me/phLu", pix: "569010552647107", apk: "VGPokerA" },
    { pid: 1018, onelink: "https://vgpokergoogplay.onelink.me/phLu", pix: "569010552647107", apk: "VGPokerB" },
]

var defaultPid = 1017;

function getCfg(pid: number): IPlatCfg {
    let platId = pid || defaultPid
    let dstCfg = cfgArr.find(value => { return value.pid == platId })
    if (!dstCfg)
        dstCfg = cfgArr.find(value => { return value.pid == defaultPid })
    return dstCfg
}

(async function () {
    window.itscfg = {
        getCfg: getCfg,
        appCfg: AppConst,
    }
})()
