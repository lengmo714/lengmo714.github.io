/*
 * @Author: JChan
 * @Date: 2024-12-02 16:31:20
 * @LastEditTime: 2024-12-02 17:16:58
 * @LastEditors: JChan
 * @Description: 中间状态
 * @FilePath: \longterm_website\src\stores\dialog.ts
 * 嘻嘻嘻
 */

export default (function useDialogStore() {
    /** 默认加载弹窗 */
    const defaultLoading = reactive({
        show: false,
    })
    /** 默认提示弹窗 */
    const defaultDialog = reactive({
        show: false,
        btnText: 'OK',
        message: 'Message',
        cb: undefined as undefined | Function
    })

    return {
        defaultLoading,
        defaultDialog,
    }
})()