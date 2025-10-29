
import { showDefaultDialog, showDefaultLoading } from '@/utils'
import conf_page from '@/config/conf_page'
import { LogUtil } from '@/utils/LogUtil'

const enum EPageType {
    Luodi = 1,
    Agent = 2,
    Official = 3
}

enum jumpType {
    Zero,
    Cur,
    Blank,
}

export class LogicTool {
    public static async clickIos() {
        this.toLink(conf_page.bottom.ios_link)
        // showDefaultDialog(conf_page.tips.come_tips)
    }

    public static async clickTelegram() {
        this.toLink(conf_page.bottom.telegram_link)
        // showDefaultDialog(conf_page.tips.come_tips)
    }

    public static async clickAndroid() {
        // this.toLink(conf_page.bottom.android_link)
        this.androidload()
    }

    //归因
    public static async androidload() {
        var platId = 1017
        const params = new URLSearchParams(window.location.search)
        // 获取 share 参数的值
        const shareValue = params.get('share')
        console.log("shareValue = ",shareValue)
        if(shareValue){
            if(shareValue == "A"){
                platId = 1017;
            }else if(shareValue == "B"){
                platId = 1018;
            }
        }
        console.log('window.mylib:', window.mylib)
        var cfg = window.mylib.logic.getCfg(platId)
        console.log('cfg:', cfg)
        window.mylib.logic.fbInit(cfg.pix)
        window.mylib.logic.doDownload(platId)
    }


    // 导航到指定的URL
    public static toLink(url: string) {
        if (url.length == 0) {
            showDefaultDialog(conf_page.tips.come_tips)
            return
        }

        if (conf_page.global.jump_type === jumpType.Cur) {
            location.href = url
        } else if (conf_page.global.jump_type === jumpType.Blank) {
            window.open(url);
        }
    }

    public static taInit() {
        try {
            let platId = window.myPlatId || window.mylib.logic.getPlatId()
            let pageType = window.myPlatId ? EPageType.Official : EPageType.Agent
            window.mylib.taLogic.init(platId, pageType)
        } catch {}
    }
}
