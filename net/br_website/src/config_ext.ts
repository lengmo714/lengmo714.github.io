
let AppConst: IAppCfg = {
    Name: EApp.VGPoker,
    FbCodeAddr: "https://www.domainprojectd.com/fb/landingpage",

    // TaAppId: "7206c4a5542f4f1d948df21cb028b9ed",
    // TaSrvAddr: "https://ta.rmgstation.com/sync_json",

    ApkCdnDir: "https://oss.domaingoogleapp.com/client/app",
    // IosUrl: "https://apps.apple.com/in/app/ggrummy-classical-rummy-game/id6739034700",
}

var cfgArr: IPlatCfg[] = [
    { pid: 1017, onelink: "https://vgpokergoogplay.onelink.me/phLu/m3xf2w3s", pix: "569010552647107", apk: "VGPokerA.apk" },
    { pid: 1018, onelink: "https://vgpokergoogplay.onelink.me/phLu/b33cdle8", pix: "569010552647107", apk: "VGPokerB.apk" },
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
