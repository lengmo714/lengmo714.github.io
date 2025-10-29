/*
 * @Author: JChan
 * @Date: 2024-11-20 11:19:45
 * @LastEditTime: 2025-02-06 16:13:01
 * @LastEditors: JChan
 * @Description: 工具
 * @FilePath: \longterm_website2\src\utils\index.ts
 * 嘻嘻嘻
 */

import useDialogStore from '@/stores/dialog'

export function isMobile() {
    const userAgent = navigator.userAgent;
    return /iPhone|iPad|iPod|Android/i.test(userAgent);
}

/** pxtorem */
export function pxtorem(px: number) {
    // @ts-ignore
    const rootFontSize = Number(document.getElementsByTagName("html")[0].style["font-size"].slice(0, -2));
    return (px / 37.5) * rootFontSize;
}

/**
 * 弹出加载弹窗
 * @param duration 展示时长(单位：秒)
 * @returns ins 返回一个带close方法的对象
 */
export function showDefaultLoading(duration: number) {
    const { defaultLoading } = useDialogStore

    defaultLoading.show = true
    setTimeout(() => {
        close()
    }, duration * 1000);

    const close = () => {
        defaultLoading.show = false
    }

    return {
        close
    }
}
/**
 * 弹出提示弹窗
 * @param message 弹窗文案
 * @param callBack 回调
 */
export function showDefaultDialog(message?: string, callBack?: Function) {
    const { defaultDialog } = useDialogStore

    defaultDialog.message = (message ? message : 'Message')
    callBack && (defaultDialog.cb = callBack)
    defaultDialog.show = true
}

export function getDeviceType() {
    const userAgent = navigator.userAgent;
    if (userAgent.match(/android/i)) {
      return 'Android';
    }  
    if (userAgent.match(/iPad|iPhone|iPod/i)) {
      return 'IOS';
    }
    return 'unknown';
  }