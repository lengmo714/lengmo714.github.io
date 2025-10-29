<template>
  <div class="mobile">
    <div class="mobile-notice" v-if="showNoticePanel">
      <div class="inner">
        <div class="left-text">
          {{ pageConfig.notice.content }}
        </div>
        <div class="right-btn-learn-more" @click="toLink(pageConfig.notice.btn_learn_more_toUrl)">{{ pageConfig.notice.btn_learn_more_txt }}</div>
        <div class="right-btn-close" @click="showNoticePanel = false"></div>
      </div>
    </div>
    <header class="mobile-header" :class="{ fixed: headerFixedTop }">
      <div class="header-left-logo">
        <img :src="pageConfig.header.logo" alt="">
      </div>
      <div class="header-rigth-text">
        <!-- <div class="btn_login">{{ pageConfig.header.btn_group.login }}</div> -->
        <div class="header-right-logo"></div>
        <div class="btn_menu" @click="showMenuSwitch = !showMenuSwitch"></div>
      </div>
    </header>
    <div class="zhanwei" v-if="headerFixedTop"></div>
    <div v-show="navActiveIdx === 0">
      <div class="mobile-banner">
        <van-swipe class="banner-content" ref="bannerContent" :autoplay="pageConfig.banner.autoplay" indicator-color="white">
          <van-swipe-item v-for="(item, index) in pageConfig.banner.list" :key="index">
            <img :src="item" alt="">
          </van-swipe-item>
          <template #indicator="{ active, total }">
            <div class="custom-indicator" v-if="pageConfig.banner.list.length > 1">
              <div class="custom-indicator-item" :class="index === active ? 'custom-indicator-item-active' : ''" v-for="(item, index) in pageConfig.banner.list.length" :key="index">
                <div class="custom-indicator-item-bg"></div>
              </div>
            </div>
          </template>
        </van-swipe>
        <div class="banner-info-left-btn" v-if="pageConfig.banner.list.length > 1" @click="prevBanner"></div>
        <div class="banner-info-right-btn" v-if="pageConfig.banner.list.length > 1" @click="nextBanner"></div>
        <div class="banner-info-desc">
          <div class="banner-info-desc-text">
            {{ pageConfig.banner.bannerInfo.mobile_banner_bonus_text2 }}
          </div>
        </div>
        <div class="banner-info-btn-group">
          <div class="btn-android" v-if="getDeviceType() === 'Android'" @click="toAndroid">
            <!-- <div class="btn-blur"></div> -->
            <img :src="pageConfig.bottom.mobile_btn_android" alt="">
            <p>{{ pageConfig.bottom.mobile_btn_android_text }}</p>
          </div>
          <div class="btn-ios" v-else @click="toIos">
            <!-- <div class="btn-blur"></div> -->
            <img :src="pageConfig.bottom.mobile_btn_ios" alt="">
            <p>{{ pageConfig.bottom.mobile_btn_ios_text }}</p>
          </div>
          <div class="btn-telegram" @click="toTelegram">
            <!-- <div class="btn-blur"></div> -->
            <img :src="pageConfig.bottom.mobile_btn_telegram" alt="">
            <p>{{ pageConfig.bottom.mobile_btn_telegram_text }}</p>
          </div>
        </div>
        <div class="banner-border-radius"></div>
      </div>
      <div class="mobile-intro">
        <div class="mobile-intro-title">{{ conf_page.littleBanner.text }}</div>
        <div class="mobile-intro-desc">{{ conf_page.littleBanner.desc }}</div>
        <div class="mobile-intro-view">
          <div class="mobile-intro-view-item" v-for="(item, index) in conf_page.littleBanner.list" :key="index">
            <div class="mobile-intro-view-item-img">
              <img :src="item.url" alt="">
            </div>
            <div class="mobile-intro-view-item-title">
              {{ item.title }}
            </div>
            <div class="mobile-intro-view-item-desc">
              {{ item.desc }}
            </div>
          </div>
        </div>
        <div class="scroll-view">
          <div class="row-1">
            <div class="row-group">
              <img :src="item" alt="" v-for="(item, index) in pageConfig.intro.scroll_view.row1" :key="index">
            </div>
            <div class="row-group">
              <img :src="item" alt="" v-for="(item, index) in pageConfig.intro.scroll_view.row1" :key="index">
            </div>
          </div>

          <div class="row-2">
            <div class="row-group">
              <img :src="item" alt="" v-for="(item, index) in pageConfig.intro.scroll_view.row2" :key="index">
            </div>
            <div class="row-group">
              <img :src="item" alt="" v-for="(item, index) in pageConfig.intro.scroll_view.row2" :key="index">
            </div>
          </div>

          <div class="row-3">
            <div class="row-group">
              <img :src="item" alt="" v-for="(item, index) in pageConfig.intro.scroll_view.row3" :key="index">
            </div>
            <div class="row-group">
              <img :src="item" alt="" v-for="(item, index) in pageConfig.intro.scroll_view.row3" :key="index">
            </div>
          </div>
          <div class="left_overflow"></div>
          <div class="right_overflow"></div>
        </div>
        <div class="intro-view-1">
          <div class="intro-view-title">
            {{ pageConfig.intro.intro_view_1.title }}
          </div>
          <div class="intro-view-little-title">
            {{ pageConfig.intro.intro_view_1.little_title }}
          </div>
          <div class="intro-view-desc">
            {{ pageConfig.intro.intro_view_1.desc }}
          </div>
          <div class="intro-view-btn" @click="toLink(pageConfig.intro.intro_view_1.link)">
            {{ pageConfig.intro.intro_view_1.btn }}
            <div class="icon"></div>
          </div>
          <div class="intro-view-img">
          </div>
        </div>
        <div class="intro-view-2">
          <div class="intro-view-title">
            {{ pageConfig.intro.intro_view_2.title }}
          </div>
          <div class="intro-view-desc">
            {{ pageConfig.intro.intro_view_2.desc }}
          </div>
          <div class="intro-view-btn" @click="toLink(pageConfig.intro.intro_view_2.link)">
            {{ pageConfig.intro.intro_view_2.btn }}
          </div>
          <div class="intro-view-img">
            <div class="row-group">
              <img :src="item" alt="" v-for="(item, index) in pageConfig.intro.intro_view_2.img" :key="index">
            </div>
            <div class="row-group">
              <img :src="item" alt="" v-for="(item, index) in pageConfig.intro.intro_view_2.img" :key="index">
            </div>
          </div>

          <div class="left_overflow"></div>
          <div class="right_overflow"></div>
        </div>
      </div>
    </div>
    <DownloadPage v-show="navActiveIdx === 1" />
    <AboutPage v-show="navActiveIdx === 2" />
    <div class="mobile-footer">
      <div class="mobile-follow-us">
        <div class="mobile-follow-item" v-for="(item, index) in conf_page.fllowUs.list" :key="index">
          <div class="bg"></div>
          <div class="mobile-follow-item-icon">
            <img :src="item.icon" alt="">
          </div>
          <div class="mobile-follow-item-txt">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="mobile-security">
        <div class="img-security"></div>
      </div>
    </div>

    <div class="mobile-notify" @click="footClick">
      <div class="blur"></div>
      <div class="icon"></div>
      <div class="text">{{ pageConfig.footerInfo.notice }}</div>
    </div>

    <div class="mobile-toTop" v-if="showToTop" @click="toTop">
      <img :src="pageConfig.bottom.pc_btn_toTop" alt="">
    </div>

    <van-popup v-model:show="showMenuSwitch" :style="{ width: '88%', height: '100%' }" position="right">
      <div class="menu-content">
        <div class="menu-header">
          <div class="header-left-logo">
            <img :src="pageConfig.header.logo" alt="">
          </div>
        </div>
        <div class="menu-main">
          <div class="menu-item" v-for="(item, index) in pageConfig.header.nav_cfg" :key="index" @click="toRouter(item.name, index)">
            <div class="menu-item-title">{{ item.label }}</div>
            <div class="menu-item-icon"></div>
          </div>
        </div>
        <div class="btn_language" @click="showLanguageMenu = !showLanguageMenu">
          <div class="icon"></div>
          <div class="txt">
            <div class="lang">{{ lang }}</div>
            <div class="more" :class="{ active: showLanguageMenu }"></div>
          </div>

          <div class="header-btn-language-menu" v-if="showLanguageMenu">
            <div class="header-btn-language-menu-item" :class="{
              active: selectLang === item.key
            }" v-for="(item, index) in languages" :key="index" @click="setCurLanguage(item.key)">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang='ts'>
import pageConfig from '@/config/conf_page'
import { getDeviceType, pxtorem } from '@/utils'
import { useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LogicTool } from '@/utils/LogicTool'
import { showDefaultDialog, showDefaultLoading } from '@/utils'
import conf_page from '@/config/conf_page'
import conf_links from '@/config/conf_links'
import { getCurLanguage, setCurLanguage, languages } from '@/language'
import AboutPage from './about/index.vue'
import DownloadPage from './download/index.vue'


const showMenuSwitch = ref(false)
/** 当前选中语言 */
const selectLang = ref('')
// 是否展示切换语言菜单
const showLanguageMenu = ref(false)
// 是否展示toTop按钮
const showToTop = ref(false)
// const faqActiveName = ref(pageConfig.faq.list[0].id)
const inLinkType = ref('')
/** 当前选中的菜单 */
const navActiveIdx = ref(0)
const BannerContentRef = useTemplateRef('bannerContent')
const headerFixedTop = ref(false)

enum jumpType {
  Zero,
  Cur,
  Blank,
}

const deviceType = getDeviceType();
const route = useRoute()
const router = useRouter()

// 是否展示通知栏
const showNoticePanel = ref(true)



const lang = computed(() => {
  return getCurLanguage().name
})

onMounted(() => {
  const isQuickLink = getQuickLinkConfig(route.path)
  if (isQuickLink) inLinkType.value = isQuickLink.file

  selectLang.value = getCurLanguage().key
  showNoticePanel.value = conf_page.notice.showSwitch

  init()
  var headerElement = document.querySelector(".mobile-header");
  window.addEventListener('scroll', () => {
    if (window.scrollY > pageConfig.bottom.pc_toTop_limit_y) {
      showToTop.value = true
    } else {
      showToTop.value = false
    }

    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    if (headerElement) {
      if (scrollTop >= 135) {
        // 吸顶，给元素设置固定定位
        // className 通过这个属性添加一个类名
        // nav.className = 'fd'
        headerFixedTop.value = true
      } else {
        headerFixedTop.value = false
        // 取消吸顶
        // nav.className = ''
      }
    }
  })
  // 监听窗口尺寸变化事件
  // window.addEventListener('resize', function () {
  //   pageSize.width = document.documentElement.clientWidth + 'px'
  //   pageSize.height = document.documentElement.clientHeight - pxtorem(50 + 66) + 'px'
  // });
})


function footClick() {
  var deviceType = getDeviceType()
  if (deviceType == 'IOS') {
    toIos()
  } else {
    toAndroid()
  }
}

function toAndroid() {
    LogicTool.clickAndroid()
}
function toTelegram() {
    LogicTool.clickTelegram()
}
function toIos() {
    LogicTool.clickIos()
}

function init() {
  LogicTool.taInit()
}

// 导航到指定路由
function toRouter(name: string, index: number) {
  navActiveIdx.value = index
  showMenuSwitch.value = false
  router.push({ 
    name,
    query: route.query
  })
}

// 导航到指定的URL
function toLink(url: string) {
  if (url.length == 0) {
    showDefaultDialog(conf_page.tips.come_tips)
    return
  }

  if (pageConfig.global.jump_type === jumpType.Cur) {
    location.href = url
  } else if (pageConfig.global.jump_type === jumpType.Blank) {
    window.open(url);
  }
}

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function prevBanner() {
  (BannerContentRef.value as any).prev()
}
function nextBanner() {
  (BannerContentRef.value as any).next()
}

function getQuickLinkConfig(name: string) {
  return conf_links.find(item => item.name === name)
}

watch(() => route, (val) => {
  const target = conf_page.header.nav_cfg.find(item => item.name === val.name)
  if (target) {
    navActiveIdx.value = target.index
  }
},
  { deep: true, immediate: true }
)

</script>

<style lang='less' scoped>
@import './index.less';
</style>