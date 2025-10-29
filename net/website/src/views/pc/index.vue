<template>
  <div class="pc">
    <div class="pc-notice" v-if="showNoticePanel">
      <div class="inner">
        <div class="left-text">
          {{ pageConfig.notice.content }}
        </div>
        <div class="right-btn-group">
          <div class="right-btn-learn-more" @click="toLink(pageConfig.notice.btn_learn_more_toUrl)">{{ pageConfig.notice.btn_learn_more_txt }}</div>
          <div class="right-btn-close" @click="showNoticePanel = false"></div>
        </div>
      </div>
    </div>
    <header class="pc-header" :class="{ fixed: headerFixedTop }">
      <div class="inner">
        <div class="header-left-logo">
          <img :src="pageConfig.header.pc_logo" alt="">
        </div>
        <div class="header-center-navList">
          <div class="nav" :class="{ active: navActiveIdx === index }" v-for="(item, index) in pageConfig.header.nav_cfg" :key="index" @click="toRouter(item.name, index)">{{ item.label }}</div>
        </div>
        <div class="header-right">
          <div class="header-right-logo"></div>
          <div class="line"></div>
          <div class="header-btn-language" @mouseleave="showLanguageMenu = false" @mouseenter="showLanguageMenu = true" @click="showLanguageMenu = !showLanguageMenu">
            <div class="header-btn-language-light" v-if="showLanguageMenu"></div>
            <div class="header-btn-language-icon"></div>
            <div class="header-btn-language-menu" v-if="showLanguageMenu">
              <div class="header-btn-language-menu-item" :class="{
                active: selectLang === item.key
              }" v-for="(item, index) in languages" :key="index" @click="setCurLanguage(item.key)">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div v-show="navActiveIdx === 0">
      <div class="pc-banner">
        <van-swipe class="banner-content" ref="bannerContent" :autoplay="pageConfig.banner.autoplay" indicator-color="white" @change="onSwipeChange">
          <van-swipe-item v-for="(item, index) in pageConfig.banner.pc_list" :key="index">
            <img :src="item" alt="">
          </van-swipe-item>
          <template #indicator="{ active }">
            <div class="custom-indicator" v-if="pageConfig.banner.pc_list.length > 1">
              <div class="custom-indicator-item" :class="index === active ?
                'custom-indicator-item-active'
                : ''" v-for="(item, index) in pageConfig.banner.pc_list.length" :key="index" @click="clickIndicator(index)">
                <div class="custom-indicator-item-bg"></div>
              </div>
            </div>
          </template>
        </van-swipe>
        <div class="banner-info-left-btn" v-if="pageConfig.banner.pc_list.length > 1" @click="prevBanner"></div>
        <div class="banner-info-right-btn" v-if="pageConfig.banner.pc_list.length > 1" @click="nextBanner"></div>
        <div class="banner-info-pendent">
          <div class="banner-info-bonus">
            <img :src="pageConfig.banner.bannerInfo.pc_banner_bonus_text" alt="">
            <p>{{ pageConfig.banner.bannerInfo.pc_banner_bonus_text2 }}</p>
          </div>
          <div class="banner-info-btn-groups">
            <div class="banner-info-blur"></div>
            <div class="banner-info-bg">
              <img :src="pageConfig.banner.pc_banner_info_list[0]" alt="">
            </div>
            <div class="banner-info-title">{{ pageConfig.banner.bannerInfo.pc_banner_info_title }}</div>
            <div class="banner-info-desc">{{ pageConfig.banner.bannerInfo.pc_banner_info_desc }}</div>
            <div class="row">
              <div class="btn-android" @click="toAndroid()">
                <img :src="pageConfig.bottom.pc_btn_android" alt="">
                {{ pageConfig.bottom.pc_btn_android_text }}
              </div>
              <div class="btn-ios" @click="toIos()">
                <img :src="pageConfig.bottom.pc_btn_ios" alt="">
                {{ pageConfig.bottom.pc_btn_ios_text }}
              </div>
              <div class="btn-telegram" @click="toTelegram()">
                <img :src="pageConfig.bottom.pc_btn_telegram" alt="">
                {{ pageConfig.bottom.pc_btn_telegram_text }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pc-little-banner">
        <div class="banner-info-power">
          {{ pageConfig.littleBanner.text }}
        </div>
        <div class="little-banner-desc">
          {{ pageConfig.littleBanner.desc }}
        </div>
        <div class="little-banner-content">
          <div class="little-banner-item" v-for="(item, index) in pageConfig.littleBanner.list" :key="index">
            <div class="little-banner-item-icon" :style="{
              width: '100%',
              height: '100%',
            }">
              <img :src="item.url" alt="">
            </div>
            <div class="little-banner-item-title">
              {{ item.title }}
            </div>
            <div class="little-banner-item-desc1">
              {{ item.desc }}
            </div>
          </div>
        </div>
      </div>
      <div class="pc-intro">
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
          <div class="intro-view-desc" v-html="pageConfig.intro.intro_view_1.desc.replace(/\./g, '.<br />')">
          </div>
          <div class="intro-view-btn" @click="toLink(pageConfig.intro.intro_view_1.link)">
            {{ pageConfig.intro.intro_view_1.btn }}
            <div class="icon"></div>
          </div>
          <div class="intro-view-img"></div>
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
    <!-- <div class="pc-linksContent" v-show="navActiveIdx === 100" v-if="inLinkType !== ''">
      <iframe class="pc-linksContent-iframe" :src="inLinkType" frameborder="0"></iframe>
    </div> -->
    <div class="pc-footerInfo">
      <div class="pc-followUs">
        <div class="inner">
          <div class="left">
            <div class="title">{{ pageConfig.fllowUs.title }}</div>
            <div class="desc">{{ pageConfig.fllowUs.desc }}</div>
          </div>
          <div class="inner-list">
            <div class="inner-list-item" @click="toLink(item.link)" v-for="(item, index) in pageConfig.fllowUs.list" :key="index">
              <div class="icon">
                <img :src="item.icon" alt="">
                <div class="bg"></div>
              </div>
              <div class="name">
                {{ index === 0 ? '@' : '' }}{{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="pc-quickLinks">
        <div class="inner">
          <div class="left">
            <div class="botton-logo">
              <img :src="pageConfig.header.pc_logo_light" alt="">
            </div>
            <div class="title">{{ pageConfig.quickLinks.title }}</div>
          </div>
          <div class="inner-list">
            <div class="inner-list-item" @click="toLink(item.link)" v-for="(item, index) in pageConfig.quickLinks.list" :key="index">
              <span>{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div> -->
      <div class="pc-security">
        <div class="img-security"></div>
      </div>
    </div>
    <div class="pc-notify" @click="toAndroid">
      <div class="blur"></div>
      <div class="icon"></div>
      <div class="text">{{ pageConfig.footerInfo.notice }}</div>
    </div>
    <div class="pc-toTop" v-if="showToTop" @click="toTop">
      <img :src="pageConfig.bottom.pc_btn_toTop" alt="">
    </div>
  </div>
</template>

<script setup lang='ts'>
import pageConfig from '@/config/conf_page'
import { showDefaultDialog } from '@/utils'
import { useRoute, useRouter } from 'vue-router'
import conf_page from '@/config/conf_page'
import conf_links from '@/config/conf_links'
import { languages, getCurLanguage, setCurLanguage } from '@/language'
import AboutPage from './about/index.vue'
import DownloadPage from './download/index.vue'
import { LogicTool } from '@/utils/LogicTool'
const curSwiperIdx = ref(0)
const showToTop = ref(false)
const inLinkType = ref('')
const route = useRoute()
const router = useRouter()
const headerFixedTop = ref(false)
// 是否展示通知栏
const showNoticePanel = ref(false)
// 是否展示切换语言菜单
const showLanguageMenu = ref(false)
const showSelectOption = ref(false)
/** 当前选中语言 */
const selectLang = ref('')
/** 当前选中的菜单 */
const navActiveIdx = ref(0)

enum jumpType {
  Zero,
  Cur,
  Blank,
}

onMounted(() => {
  document.body.style.background = '#000000'
  const isQuickLink = getQuickLinkConfig(route.path)
  if (isQuickLink) inLinkType.value = isQuickLink.file

  selectLang.value = getCurLanguage().key
  showNoticePanel.value = conf_page.notice.showSwitch
  var selectElement = document.querySelector(".header-right-select-language");
  var headerElement = document.querySelector(".pc-header");

  if (selectElement) {
    selectElement.addEventListener("change", function () {
      const lang = (selectElement as any).value
      if (!lang) return
      setCurLanguage(lang)
    });
    selectElement.addEventListener('focus', () => { showSelectOption.value = true });
    selectElement.addEventListener('blur', () => { showSelectOption.value = false });
  }

  if (headerElement) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > pageConfig.bottom.pc_toTop_limit_y) {
        showToTop.value = true
      } else {
        showToTop.value = false
      }

      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop

      if (scrollTop >= 60) {
        // 吸顶，给元素设置固定定位
        // className 通过这个属性添加一个类名
        // nav.className = 'fd'
        headerFixedTop.value = true
      } else {
        headerFixedTop.value = false
        // 取消吸顶
        // nav.className = ''
      }
    })
  }

  document.body.addEventListener('click', (e: any) => {
    if (e.target.className !== "header-btn-language") {
      showLanguageMenu.value = false
    }
  })
})

const BannerContentRef = useTemplateRef('bannerContent')

function toAndroid() {
    LogicTool.clickAndroid()
}
function toTelegram() {
    LogicTool.clickTelegram()
}
function toIos() {
    LogicTool.clickIos()
}

function onSwipeChange(idx: number) {
  curSwiperIdx.value = idx
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

// 导航到指定路由
function toRouter(name: string, index: number) {
  navActiveIdx.value = index
  router.push({ 
    name, 
    query: route.query
  })
}

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function clickIndicator(idx: number) {
  (BannerContentRef.value as any).swipeTo(idx)
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