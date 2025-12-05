
const { createApp } = Vue
const { ref, reactive, computed, onMounted } = Vue

createApp({
  data() {
    return {
      // reqUrl: "https://www.projectdtest.com/domain/", //测试服
      reqUrl: 'https://www.projectdinternational.com/domain/', //正式服
      showModal: false,
      step: 'login',
      method: 'phone',
      phone: '',
      email: '',
      code: '',
      countdown: 0,
      timerId: null,
      codeError: false,
      cc:'55',
      showCc:false,
      errorMsg: '',
      showValidation: false,
      pwaInitialized: false,
      installed: null,
      deferredPrompt: null,
      account: {
        uid: 0
      },
      token: '',
      currentPage: 'home',

      // 多语言相关
      ipaddress: 'USA',
      currentLang: 'en',
      availableLanguages: [
        { code: 'en', name: 'English' },
        { code: 'pt', name: 'Português' },
        { code: 'es', name: 'Español' },
        { code: 'zh', name: '中文' }
      ],
      langPack: {},
      popupShown: false,
    }
  },
  created() {
    this.initIpAndLang();
    this.clientevent(17);
    this.$nextTick(() => {
      this.clientevent(16);
    });
    this.loadLangPack();
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.updateScale();
    });
  },
  beforeUnmount() {
  },
  computed: {
    validPhone(){ return /^(?:\+?55)?\d{11}$/.test(this.phone) },
    validEmail(){ return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email) },
    countryClass() {
      return window.countryButtonMap?.[this.ipaddress] || 'en';
    }
  },
  watch:{
    method(){},
    phone(){},
    email(){},
  },
  methods: {
    async loadLangPack() {
      const lang = this.currentLang;
      try {
        const resp = await fetch(`./js/lang/${lang}.json`);
        this.langPack = await resp.json();
        document.fonts.load("24px RobotoLocal").then(() => {
          const t = document.getElementById('progress-text');
          const p = document.getElementById('progress-percent');
          if (t) t.style.opacity = 1;
          if (p) p.style.opacity = 1;
        });
      } catch (e) {
        console.error("Lang load error:", e);
        this.langPack = {};
      }
    },
    showLoading() {
      const btn = document.getElementById('download-btn');
      const wrap = document.getElementById('install-progress');
      const progressInner = document.getElementById('progress-inner');
      const progressPercent = document.getElementById('progress-percent');
      const progressText = document.getElementById('progress-text');
    
      document.getElementById('download-btn').style.display = 'none'
      document.getElementById('progress-box').style.display = 'flex';
      this.$nextTick(() => {
        this.updateScale();
      });
    
      // 启动 . .. ... 动效
      this.startDotAnimation();
    
      let current = 0;
      let duration = 5000;
      let frame = 50;
      let step = 100 / (duration / frame);
    
      this.loadingTimer = setInterval(() => {
        current += step;
        if (current > 100) current = 100;
    
        progressInner.style.width = current + "%";
        progressPercent.textContent = Math.floor(current) + "%";
    
        // 到 100% → 停止点点动画 + 替换成完成文字
        if (current >= 100) {
          this.stopDotAnimation();
          progressText.textContent = this.t("installationOver");
    
          if (!this.popupShown) {
            this.popupShown = true;
            this.showPopup(this.t("installationOver"));
          }
    
          clearInterval(this.loadingTimer);
        }
      }, frame);
    },
    
    showPopup(text) {
      const wrapper = document.getElementById('center-popup');
      const popupBox = wrapper.querySelector('.popup-box');
      const popupText = document.getElementById('popup-text');
    
      popupText.textContent = text;
    
      wrapper.style.display = 'flex';
    
      // 播放出现动画
      popupBox.style.animation = 'popup-show 0.2s forwards';
    
      // 3 秒后消失动画
      setTimeout(() => {
        popupBox.style.animation = 'popup-hide 0.2s forwards';
    
        setTimeout(() => {
          wrapper.style.display = 'none';
        }, 200);
    
      }, 3000);
    },
    
    t(key) {
      return this.langPack?.[key] || key;
    },
    clientevent(eventid) {
      try {
        const eventName = 'landingpageeventflow'
        const bodyObj = {
          eid: this.geneid(),
          eventid: eventid,
          deviced: this.getDeviceType(),
        }

        const payload = {
          eventName: eventName,
          eventBody: JSON.stringify(bodyObj)
        }
        console.log('payload:', payload)
        let url = this.reqUrl + 'clientevent'
        const res =  fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        console.log("clientevent res:", res)
      } catch (err) {
        console.log("clientevent err:",err);
      }
    },
    async initIpAndLang() {
      // 先尝试从缓存取
      const savedIp = localStorage.getItem('ipaddress');
      if (savedIp) {
        this.ipaddress = savedIp;
        this.applyIpRules();   // 按规则设置 cc 和 currentLang
      } else {
        // 没取到就走 getip
        await this.getip();
      }
    },
    // 根据 ipaddress 设置 cc 和语言
    applyIpRules() {
      if (this.ipaddress === "Brazil") {
        this.cc = '55';
        this.currentLang = 'pt';
      } else if (this.ipaddress === "India") {
        this.cc = '91';
        this.currentLang = 'hi';
      } else {
        this.cc = '1';
        this.currentLang = 'en';
      }
    },
    getip() {
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          console.log("IP:", data.ip);
          console.log("国家:", data.country_name);
          console.log("国家代码:", data.country); // 比如 BR, IN
          console.log("城市:", data.city);
        this.ipaddress = data.country_name
        //不同ip 某些值需要有默认值
        if (this.ipaddress==="Brazil") {
          this.currentLang = 'pt'
        } else if (this.ipaddress==="India") {
          this.currentLang = 'hi'
        } else {
          this.currentLang = 'en'
        }
      });
    },
    toTelegram() {
      const url = 'https://t.me/VGPoker_bot'
      window.open(url);
    },
    openLogin(){ this.showModal=true; this.step='login'; this.code='' },
    closeModal(){ this.showModal=false; this.codeError = false; this.clearTimer() },
    getLogininfo() {
      return this.account.uid
    },
    getDeviceType() {
      const userAgent = navigator.userAgent;
      if (userAgent.match(/android/i)) {
        return 'Android';
      }
      if (userAgent.match(/iPad|iPhone|iPod/i)) {
        return 'IOS';
      }
      return 'unknown';
    },
    geneid() {
      let eid = localStorage.getItem('eid');
      if (!eid) {
        let d = new Date().getTime();
        const eidTmpl = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        eid = eidTmpl.replace(/[xy]/g, (c) => {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        localStorage.setItem('eid', eid);
      }
      return eid;
    },
    parseFlags(resp) {
      const src = resp?.accounts;
      const isFirstLogin = src.isNewLogin ?? false;
      const hasClaimed =  src.isReceive ?? false;
      return { isFirstLogin: Boolean(isFirstLogin), hasClaimed: Boolean(hasClaimed) };
    },
    saveAccountToLocal(acc, token) {
      try {
        localStorage.setItem('vg_account', JSON.stringify(acc));
        localStorage.setItem('token', JSON.stringify(token));
      } catch (e) {
        console.warn('localStorage save failed', e);
      }
    },
    loadAccountFromLocal() {
      try {
        const raw = localStorage.getItem('vg_account');
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        console.warn('localStorage read failed', e);
        return null;
      }
    },
    isIOS() {
      const ua = navigator.userAgent;
      return /iPad|iPhone|iPod/.test(ua) || 
          (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    },
    isSafari() {
      return this.isIOS() && navigator.userAgent.includes("Safari") && 
              !navigator.userAgent.includes("CriOS") && !navigator.userAgent.includes("FxiOS");
    },
    isAndroid() { return /Android/i.test(navigator.userAgent); },
    isPC() {
      return !this.isAndroid() && !this.isIOS();
    },
    sendbegainTime(uerCode){
      var url = this.reqUrl + 'clientevent';
      var data = JSON.stringify({
          eventname:"webpageeventflow",
          eventBody:JSON.stringify({
            "fbuuid": uerCode,
            "eventtime": new Date(),
            "timestamp": Date.now(),
            "eventname": `fbuuid: ${uerCode}`,
          })
      });
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      console.log("xhr = ", xhr);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log("发送成功2");
        }
      };
      xhr.send(data);
    },
    downloadup() {
      this.download()
      this.clientevent(3) //安卓下载上
    },
    downloadlow() {
      this.download()
      this.clientevent(18) //安卓下载c
      window.mylib.logic.upDownload();
    },
    download(){
      if (this.isAndroid()) {
        if (window.deferredPrompt) {
          window.deferredPrompt.prompt();
          window.deferredPrompt.userChoice.then((choiceResult) => {
            this.showLoading(); //开始加载动画
            console.log(choiceResult.outcome === 'accepted' ? '✅ 用户接受安装' : '❌ 用户拒绝');
            if (choiceResult.outcome === 'accepted') {
              createProgressBar('progress-bar-container',
                "intent://lengmo714.top/net/w2a_official_c_pwa/goto.html" +
                 "#Intent;scheme=https;package=com.android.chrome;end;");
              document.getElementById('progress-bar-container').style.display = 'flex';
            }
          });
        } else {
            const currentUrl = window.location.href;
            const noScheme = currentUrl.replace(/^https?:\/\//, "");
            const intentUrl = `intent://${noScheme}` + "#Intent;scheme=https;package=com.android.chrome;end;";
            window.location.href = intentUrl;
        }
        // this.sendbegainTime(usercode)
      } else if (this.isIOS()) {
          if (this.isSafari()) {
            const guideDiv = document.createElement('div');
            guideDiv.id = 'ios-install-guide';
            guideDiv.style.cssText = `
              display: flex;
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(255, 255, 255, 0.8);
              justify-content: center;
              align-items: center;
              z-index: 9999;
            `;
            const guideSrc = `./UI_PWA_Popus_${this.countryClass}.png`;
            guideDiv.innerHTML = `<img src="${guideSrc}"
                      alt="Click the Safari share button and select 'Add to Home Screen'"
                      style="max-width: 80%; max-height: 80%; border-radius: 10px;">
                `;
            
            guideDiv.onclick = () => document.body.removeChild(guideDiv);
            document.body.appendChild(guideDiv);
          } else {
              const iosTip = this.t("iosTip");
              alert(iosTip);
          }
      }else if (this.isPC()) {
        if (window.deferredPrompt) {
          window.deferredPrompt.prompt();
          window.deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              window.location.href = targetUrl;
            }
          });
        } else {
          const winTip = this.t("winTip");
          alert(winTip);
        }
      }
    },
    handleClickOutside(e) {
      if (this.showCc && this.$refs.ccWrapper && !this.$refs.ccWrapper.contains(e.target)) {
        this.showCc = false
      }
    },

    dotTimer: null,
    dotCount: 0,
    startDotAnimation() {
      const progressText = document.getElementById('progress-text');
      // 先清掉旧的（避免重复触发）
      if (this.dotTimer) clearInterval(this.dotTimer);
    
      this.dotCount = 0;
      progressText.textContent = this.t("installation");
      this.dotTimer = setInterval(() => {
        this.dotCount = (this.dotCount + 1) % 4; 
        const dots = '.'.repeat(this.dotCount); 
        progressText.textContent = this.t("installation") + dots;
      }, 500);   // 速度可调
    },
    stopDotAnimation() {
      if (this.dotTimer) {
        clearInterval(this.dotTimer);
        this.dotTimer = null;
      }
    },
    updateScale() {
      const box = document.getElementById('progress-box');
      if (!box) return;
    
      const inner = box.querySelector('.content-inner');
      if (!inner) return;
    
      // progress-box 的高度 / 设计稿高度 170
      const scale = box.clientHeight / 170;
      inner.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
  }
}).mount('#app')
