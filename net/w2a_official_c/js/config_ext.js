var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let AppConst = {
    Name: "VGPoker" /* EApp.VGPoker */,
    FbCodeAddr: "https://www.domainprojectd.com/fb/landingpage",
    // TaAppId: "7206c4a5542f4f1d948df21cb028b9ed",
    // TaSrvAddr: "https://ta.rmgstation.com/sync_json",
    ApkCdnDir: "https://oss.domaingoogleapp.com/client/googlePlay/app",
    // IosUrl: "https://apps.apple.com/in/app/ggrummy-classical-rummy-game/id6739034700",
};
var cfgArr = [
    { pid: 1017, onelink: "https://vgpokergoogplay.onelink.me/phLu", pix: "569010552647107", apk: "VGPokerA" },
    { pid: 1018, onelink: "https://vgpokergoogplay.onelink.me/phLu", pix: "569010552647107", apk: "VGPokerB" },
];
var defaultPid = 1017;
function getCfg(pid) {
    let platId = pid || defaultPid;
    let dstCfg = cfgArr.find(value => { return value.pid == platId; });
    if (!dstCfg)
        dstCfg = cfgArr.find(value => { return value.pid == defaultPid; });
    return dstCfg;
}
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        window.itscfg = {
            getCfg: getCfg,
            appCfg: AppConst,
        };
    });
})();
