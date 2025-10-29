/*
 * @Author: JChan
 * @Date: 2025-01-03 15:38:51
 * @LastEditTime: 2025-02-07 19:05:50
 * @LastEditors: JChan
 * @Description: i18n
 * @FilePath: \longterm_website2\src\language\index.ts
 * 嘻嘻嘻
 */
import { createI18n, useI18n } from "vue-i18n";
import en from './lang/en.json'
import cn from './lang/cn.json'
import pr from './lang/pr.json'

//创建实例
const i18n = createI18n({
    locale: localStorage.getItem("language") || 'en', //读取本地存储的语言
    datetimeFormats: {},
    numberFormats: {},
    globalInjection: true, //是否全局注入
    fallbackLocale: "en", //回退用的语言
    messages: {
        en,
        cn,
        pr,
    },
    silentTranslationWarn: true, //是否显示警告
    silentFallbackWarn: true, //是否显示回退警告
});

interface languageItem {
    key: string;
    name: string;
    cfg: any
}

const languages: Array<languageItem> = [
    {
        key: 'en',
        name: 'English',
        cfg: en
    },
    // {
    //     key: 'cn',
    //     name: '中文简体',
    //     cfg: cn
    // },
    {
        key: 'pr',
        name: 'Português',
        cfg: pr
    }
]

function getCurLanguage(): languageItem {
    const key = localStorage.getItem("language") || 'en'
    return languages.find(item => item.key === key) as languageItem
}

function setCurLanguage(lang: string) {
    const cfg = languages.find(item => item.key === lang) as languageItem
    if (cfg) {
        // const { locale } = useI18n();
        localStorage.setItem('language', lang)
        // locale.value = lang;
        location.reload()
    }
}

export { languages, getCurLanguage, setCurLanguage }
export default i18n;
