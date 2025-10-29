/*
 * @Author: JChan
 * @Date: 2024-11-26 10:32:02
 * @LastEditTime: 2025-02-08 10:08:51
 * @LastEditors: JChan
 * @Description: 官网配置
 * @FilePath: \longterm_website2\src\config\conf_page.ts
 * 嘻嘻嘻
 */
import i18n from "@/language";
import logo from '@/assets/images/mobile/VG_logo.png'
import pc_logo from '@/assets/images/pc/VG_logo.png'
import pc_logo_light from '@/assets/images/pc/banner_bonus_text.png'

import banner_1 from '@/assets/images/mobile/banner_1.png'
// import banner_2 from '@/assets/images/mobile/banner_2.png'
import pc_banner_1 from '@/assets/images/pc/banner_1.png'
import pc_banner_2 from '@/assets/images/pc/banner_2.png'
import pc_banner_info_1 from '@/assets/images/pc//UI_Web_Home_Poster.png'

import pc_banner_bonus_text from '@/assets/images/pc/banner_bonus_text.png'
import little_banner_1 from '@/assets/images/pc/little_banner_1.png'
import little_banner_2 from '@/assets/images/pc/little_banner_2.png'
import little_banner_3 from '@/assets/images/pc/little_banner_3.png'
import little_banner_4 from '@/assets/images/pc/little_banner_4.png'
import little_banner_5 from '@/assets/images/pc/little_banner_5.png'
import little_banner_6 from '@/assets/images/pc/little_banner_6.png'

import scroll_img_01 from '@/assets/images/pc/animate/scrollLeft/-h-1.png'
import scroll_img_02 from '@/assets/images/pc/animate/scrollLeft/-h-2.png'
import scroll_img_03 from '@/assets/images/pc/animate/scrollLeft/-h-3.png'
import scroll_img_04 from '@/assets/images/pc/animate/scrollLeft/-h-4.png'
import scroll_img_05 from '@/assets/images/pc/animate/scrollLeft/-h-5.png'
import scroll_img_06 from '@/assets/images/pc/animate/scrollLeft/-h-6.png'
import scroll_img_07 from '@/assets/images/pc/animate/scrollLeft/-h-7.png'
import scroll_img_08 from '@/assets/images/pc/animate/scrollLeft/-h-8.png'
import scroll_img_09 from '@/assets/images/pc/animate/scrollLeft/-h-9.png'
import scroll_img_10 from '@/assets/images/pc/animate/scrollLeft/-h-10.png'
import scroll_img_11 from '@/assets/images/pc/animate/scrollLeft/-h-11.png'
import scroll_img_12 from '@/assets/images/pc/animate/scrollLeft/-h-12.png'
import scroll_img_13 from '@/assets/images/pc/animate/scrollLeft/-h-13.png'
import scroll_img_14 from '@/assets/images/pc/animate/scrollLeft/-h-14.png'
import scroll_img_15 from '@/assets/images/pc/animate/scrollLeft/-h-15.png'
import scroll_img_16 from '@/assets/images/pc/animate/scrollLeft/-h-16.png'
import scroll_img_17 from '@/assets/images/pc/animate/scrollLeft/-h-17.png'
import scroll_img_18 from '@/assets/images/pc/animate/scrollLeft/-h-18.png'
import scroll_img_19 from '@/assets/images/pc/animate/scrollLeft/-h-19.png'
import scroll_img_20 from '@/assets/images/pc/animate/scrollLeft/-h-20.png'
import scroll_img_21 from '@/assets/images/pc/animate/scrollLeft/-h-21.png'
import scroll_img_22 from '@/assets/images/pc/animate/scrollLeft/-h-22.png'
import scroll_img_23 from '@/assets/images/pc/animate/scrollLeft/-h-23.png'
import scroll_img_24 from '@/assets/images/pc/animate/scrollLeft/-h-24.png'

import scroll_img2_1 from '@/assets/images/pc/animate/scrollLeft2/UI_Introduce_Image1.png'
import scroll_img2_2 from '@/assets/images/pc/animate/scrollLeft2/UI_Introduce_Image2.png'
import scroll_img2_3 from '@/assets/images/pc/animate/scrollLeft2/UI_Introduce_Image3.png'
import scroll_img2_4 from '@/assets/images/pc/animate/scrollLeft2/UI_Introduce_Image4.png'
import scroll_img2_5 from '@/assets/images/pc/animate/scrollLeft2/UI_Introduce_Image5.png'
import scroll_img2_6 from '@/assets/images/pc/animate/scrollLeft2/UI_Introduce_Image6.png'

import about_page_1000 from '@/assets/images/pc/about/UI_Mobile_About_1000.png'
import about_page_60000 from '@/assets/images/pc/about/UI_Mobile_About_60000.png'
import about_page_300000 from '@/assets/images/pc/about/UI_Mobile_About_300000.png'

import icon_facebook from '@/assets/images/pc/UI_Web_Home_Follow_Facebook.png'
import icon_youtube from '@/assets/images/pc/UI_Web_Home_Follow_Youtube.png'
import icon_tiktok from '@/assets/images/pc/UI_Web_Home_Follow_Tiktok.png'
import icon_telegram from '@/assets/images/pc/UI_Web_Home_Follow_Telegram.png'

import pc_btn_android from '@/assets/images/pc/btn_android.png'
import pc_btn_ios from '@/assets/images/pc/btn_ios.png'
import pc_btn_telegram from '@/assets/images/pc/btn_telegram.png'
import mobile_btn_android from '@/assets/images/mobile/UI_Web_Downland_Android.png'
import mobile_btn_telegram from '@/assets/images/mobile/UI_Web_Downland_Telegram.png'
import mobile_btn_ios from '@/assets/images/mobile/UI_Web_Downland_Ios.png'
// import btn_toTop from '@/assets/images/mobile/btn_toTop.png'
import pc_btn_toTop from '@/assets/images/pc/btn_toTop.png'

import btn_android_img from '@/assets/images/pc/download/UI_Web_Downland_Android.png'
import btn_ios_img from '@/assets/images/pc/download/UI_Web_Downland_Ios.png'
import btn_telegram_img from '@/assets/images/pc/download/UI_Web_Downland_Windows.png'

import step_img_01 from '@/assets/images/pc/download/UI_Web_Downland_Icon1.png'
import step_img_02 from '@/assets/images/pc/download/UI_Web_Downland_Icon2.png'
import step_img_03 from '@/assets/images/pc/download/UI_Web_Downland_Icon3.png'


const { t } = i18n.global
export default {
    /** 全局配置 */
    global: {
        /** 部署根目录 */
        base_url: '/',
        /** 跳转方式 1:当前页面跳转 2:新开窗口跳转 */
        jump_type: 2,
        /** 路由模式 
         * 1:哈希模式（链接带#） 
         * 2:历史模式 (链接不带#，服务器转发需要配置)
         * 详细文档：https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%85%8D%E7%BD%AE%E7%A4%BA%E4%BE%8B
         */
        router_mode: 2
    },
    /** 通知栏 */
    notice: {
        content: 'Win your way to APT Manlia calissic 2025|Over 120 seats to be win | $50,000 Main Event bonus for VGpoker Only',
        /** learn more按钮文案 */
        btn_learn_more_txt: 'LEARN MORE',
        /** learn more按钮跳转地址 */
        btn_learn_more_toUrl: '',
        /** 显示开关 */
        showSwitch: false
    },
    /** 头部配置 */
    header: {
        logo,
        pc_logo,
        pc_logo_light,
        // 导航栏
        nav_cfg: [
            {
                index: 0,
                name: 'layout',
                label: t("header.nav_cfg.Menu_1"),
            },
            {
                index: 1,
                name: 'download',
                label: t("header.nav_cfg.Menu_2"),
            },
            {
                index: 2,
                name: 'about',
                label: t("header.nav_cfg.Menu_3")
            }
        ],
        // 登录注册
        btn_group: {
            register: "Join",
            login: "Log In",
        }
    },
    /** 主图配置 */
    banner: {
        /** 轮播图配置 */
        list: [
            banner_1,
        ],
        /** pc端轮播图配置 */
        pc_list: [
            pc_banner_1,
        ],
        /** pc端轮播图信息区域背景配置 */
        pc_banner_info_list: [
            pc_banner_info_1,
        ],
        /** 自动滚动轮播图时长，单位：毫秒 */
        autoplay: 3000,
        bannerInfo: {
            pc_banner_bonus_text,
            pc_banner_bonus_text2: t("header.nav_cfg.Menu_4"),
            mobile_banner_bonus_text2: t("header.nav_cfg.Menu_5"),
            pc_banner_info_title: 'Download VG·POKER',
            pc_banner_info_desc: 'Start your poker journey, bonuses are waiting for you.',
        }
    },
    /** 小banner配置 */
    littleBanner: {
        text: t("homePage.Homepage_3"),
        desc: t("homePage.Homepage_4"),
        /** 轮播图配置 */
        list: [
            {
                width: 72,
                height: 54,
                url: little_banner_1,
                title: t("homePage.Homepage_5"),
                desc: t("homePage.Homepage_6"),
            },
            {
                width: 64,
                height: 64,
                url: little_banner_2,
                title: t("homePage.Homepage_7"),
                desc: t("homePage.Homepage_8")
            },
            {
                width: 68,
                height: 48,
                url: little_banner_3,
                title: t("homePage.Homepage_9"),
                desc: t("homePage.Homepage_10")
            },
            {
                width: 59,
                height: 56,
                url: little_banner_4,
                title: t("homePage.Homepage_11"),
                desc: t("homePage.Homepage_12")
            },
            {
                width: 59,
                height: 56,
                url: little_banner_5,
                title: t("homePage.Homepage_13"),
                desc: t("homePage.Homepage_14")
            },
            {
                width: 59,
                height: 56,
                url: little_banner_6,
                title: t("homePage.Homepage_15"),
                desc: t("homePage.Homepage_16")
            },
        ],
        /** 自动滚动轮播图时长，单位：毫秒 */
        autoplay: 3000,
    },
    /** 简介配置 */
    intro: {
        /** 动画视图配置 */
        scroll_view: {
            row1: [
                scroll_img_01,
                scroll_img_02,
                scroll_img_03,
                scroll_img_04,
                scroll_img_05,
                scroll_img_06,
                scroll_img_07,
                scroll_img_08
            ],
            row2: [
                scroll_img_09,
                scroll_img_10,
                scroll_img_11,
                scroll_img_12,
                scroll_img_13,
                scroll_img_14,
                scroll_img_15,
                scroll_img_16
            ],
            row3: [
                scroll_img_17,
                scroll_img_18,
                scroll_img_19,
                scroll_img_20,
                scroll_img_21,
                scroll_img_22,
                scroll_img_23,
                scroll_img_24
            ]
        },
        intro_view_1: {
            title: t("homePage.Homepage_17"),
            little_title: t("homePage.Homepage_18"),
            desc: t("homePage.Homepage_19"),
            btn: t("homePage.Homepage_26"),
            img: '',
            /** 跳转地址 */
            link: 'https://oss.domaingoogleapp.com/client/googlePlay/app/VGPoker2400.apk'
        },
        intro_view_2: {
            title: t("homePage.Homepage_20"),
            desc: t("homePage.Homepage_21"),
            btn: 'DOWLAND',
            img: [
                scroll_img2_1,
                scroll_img2_2,
                scroll_img2_3,
                scroll_img2_4,
                scroll_img2_5,
                scroll_img2_6,
            ],
            /** 跳转地址 */
            link: 'https://oss.domaingoogleapp.com/client/googlePlay/app/VGPoker2400.apk'
        }
    },
    /** 关注我们配置 */
    fllowUs: {
        title: t("homePage.Homepage_22"),
        desc: t("homePage.Homepage_23"),
        list: [
            {
                icon: icon_telegram,
                /** 跳转地址 */
                link: 'https://t.me/VGPoker_en',
                name: t('homePage.Homepage_24'),
            },
            {
                icon: icon_facebook,
                /** 跳转地址 */
                link: '',
                name: t('homePage.Homepage_25'),
            },
            {
                icon: icon_youtube,
                /** 跳转地址 */
                link: '',
                name: t('homePage.Homepage_25'),
            },
            {
                icon: icon_tiktok,
                /** 跳转地址 */
                link: '',
                name: t('homePage.Homepage_25'),
            },
        ]
    },
    /** 底部链接配置 */
    // quickLinks: {
    //     title: '@Vigor Poker all rights reserved',
    //     list: [
    //         {
    //             text: "About us",
    //             /** 跳转地址 */
    //             link: ''
    //         },
    //         {
    //             text: "Terms of use",
    //             /** 跳转地址 */
    //             link: ''
    //         }
    //     ]
    // },
    /** 底部信息配置 */
    footerInfo: {
        notice: 'DOWNLOAD',
        link: 'https://oss.domaingoogleapp.com/client/googlePlay/app/VGPoker2400.apk'
    },
    /** 吸底栏配置 */
    bottom: {
        // btn_android,
        // btn_ios,
        pc_btn_android,
        pc_btn_android_text: "Android",
        pc_btn_ios,
        pc_btn_ios_text: "IOS",
        pc_btn_telegram,
        pc_btn_telegram_text: "Telegram",
        mobile_btn_android,
        mobile_btn_android_text: "Download",
        mobile_btn_telegram,
        mobile_btn_telegram_text: "Download",
        mobile_btn_ios,
        mobile_btn_ios_text: "Download",
        // btn_toTop,
        pc_btn_toTop,
        /** pc端滚动多少像素后显示toTop */
        pc_toTop_limit_y: 500,
        /** 点击安卓跳转地址 */
        android_link: 'https://oss.domaingoogleapp.com/client/googlePlay/app/VGPoker2400.apk',
        /** 点击Telegram跳转地址 */
        telegram_link: 'https://t.me/VGPoker_bot',
        /** 点击Ios跳转地址 */
        ios_link: '',
    },
    /** 提示信息 */
    tips: {
        ios_down_tips: 'iOS version coming soon.',
        come_tips: 'Coming soon.',
    },
    /** download Page */
    downloadPage: {
        title: t('downloadPage.Download_1'),
        desc: t('downloadPage.Download_2'),
        btn_android_img,
        btn_android_text: t('downloadPage.Download_3'),
        btn_ios_img,
        btn_ios_text: 'IOS',
        btn_telegram_img,
        btn_telegram_text: t('downloadPage.Download_4'),
        step_list: [
            {
                desc: t('downloadPage.Download_5'),
                img: step_img_01,
                intro: t('downloadPage.Download_6'),
            },
            {
                desc: t('downloadPage.Download_7'),
                img: step_img_02,
                intro: t('downloadPage.Download_8'),
            },
            {
                desc: t('downloadPage.Download_9'),
                img: step_img_03,
                intro: t('downloadPage.Download_10'),
            }
        ]
    },
    /** about Page */
    aboutPage: {
        title: t('aboutPage.Aboutus_1'),
        desc: t('aboutPage.Aboutus_2'),
        intro: t('aboutPage.Aboutus_3'),
        activePlayer: "About VGPoker",
        intro_list: [
            {
                title: '60000+',
                titleImg: about_page_300000,
                desc: t('aboutPage.Aboutus_4')
            },
            {
                title: '300000+',
                titleImg: about_page_60000,
                desc: t('aboutPage.Aboutus_6')
            },
            {
                title: '1000+',
                titleImg: about_page_1000,
                desc: t('aboutPage.Aboutus_5')
            },
        ]
    }
}