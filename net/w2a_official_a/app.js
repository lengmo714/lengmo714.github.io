
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
      translations: {
        en: {
          downloadNow: 'Download Now',
          download: 'Download',
          androidInstallation: 'Android installation',
          loginToClaim: 'Login to claim',
          amount: '$1.5',
          inCash: 'in cash',
          androidInstallationSteps: 'Android Installation Steps',
          step01: 'Step 01',
          step01text: 'Download the APK on your phone',
          step02_mid: 'Step 02',
          step02text_mid: 'Click Download anyway',
          step02: 'Step 03',
          step02text: 'Install the APK (allow “install from this source” if prompted)',
          step03: 'Step 04',
          step03text: 'Open VG.Poker and sign in with your account',
          loadingText: 'Requesting download...',
        },
        pt: {
          downloadNow: 'Baixe Agora',
          download: 'Baixar',
          androidInstallation: 'Passos de Instalação',
          loginToClaim: 'Faga login e ganhe',
          amount: 'R$10',
          inCash: '',
          androidInstallationSteps: 'Passos de Instalação',
          step01: 'Passo 01',
          step01text: 'Baixe o APK no seu celular',
          step02_mid: 'Passo 02',
          step02text_mid: 'Clique Fazer download mesmo assim',
          step02: 'Passo 03',
          step02text: 'Instale o APK (permita “instalar desta fonte” se solicitado)',
          step03: 'Passo 04',
          step03text: 'Abra o VG.Poker e entre com sua conta',
          loadingText: 'Solicitando o download...',
        },
        hi: {
          downloadNow: 'अभी डाउनलोड करें',
          download: 'डाउनलोड',
          androidInstallation: 'Android इंस्टॉलेशन स्टेप्स',
          loginToClaim: 'लॉगिन करें और',
          amount: '₹133',
          inCash: 'कैश पाएं।',
          androidInstallationSteps: 'Android इंस्टॉलेशन स्टेप्स',
          step01: 'चरण 01',
          step01text: 'अपने फ़ोन पर APK डाउनलोड करें',
          step02_mid: 'चरण 02',
          step02text_mid: '“फिर भी डाउनलोड करें” पर क्लिक करें',
          step02: 'चरण 03',
          step02text: 'डिवाइस पर APK इंस्टॉल करें (प्रॉम्प्ट मिलने पर “इस स्रोत से इंस्टॉल” की अनुमति दें)',
          step03: 'चरण 04',
          step03text: 'VG.Poker खोलें और अपने अकाउंट से लॉगिन करें',
          loadingText: 'डाउनलोड अनुरोध भेजा जा रहा है…',
        },
      }
    }
  },
  created() {
    this.initIpAndLang();
    this.clientevent(1);
    this.$nextTick(() => {
      this.clientevent(14);
    });
  },
  mounted() {
    // this.getip()
  },
  beforeUnmount() {
  },
  computed: {
    validPhone(){ return /^(?:\+?55)?\d{11}$/.test(this.phone) },
    validEmail(){ return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email) },
  },
  watch:{
    method(){},
    phone(){},
    email(){},
  },
  methods: {
    showLoading() {
      document.getElementById('global-loading').style.display = 'flex';
    },
    hideLoading() {
      document.getElementById('global-loading').style.display = 'none';
    },
    t(key) {
      return this.translations[this.currentLang]?.[key] || key;
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
      return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    isSafari() {
      return this.isIOS() && navigator.userAgent.includes("Safari") && 
              !navigator.userAgent.includes("CriOS") && !navigator.userAgent.includes("FxiOS");
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
      this.clientevent(4) //安卓下载下
    },
    download(){
      console.log('this.getDeviceType():', this.getDeviceType())
      if (this.getDeviceType() === 'Android') {
        this.showLoading(); //开始加载动画
        var platId = 1017
        var cfg = window.mylib.logic.getCfg(platId)
        window.mylib.logic.initGoogleAds(cfg.adsId)
        window.mylib.logic.googleDoDownload(platId)
       // 至少显示 5 秒
       setTimeout(() => {
        this.hideLoading();
      }, 5000);

        usercode = 'W2A_A' + `${Date.now()}`
        this.sendbegainTime(usercode)
      } else if (this.getDeviceType() === 'IOS') {
        this.initPWA()

        if (this.isIOS()) {
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
            
            guideDiv.innerHTML = `
                <img src="./ios-install-guide.png" 
                      alt="Click the Safari share button and select 'Add to Home Screen'"
                      style="max-width: 100%; max-height: 100%; border-radius: 10px;">
            `;
            
            guideDiv.onclick = () => document.body.removeChild(guideDiv);
            document.body.appendChild(guideDiv);
          } else {
              showDefaultDialog("If you're using Safari, tap the share button and select “Add to Home Screen” to install the PWA app.");
          }
        }
      }
    },
    initPWA() {
      if (this.pwaInitialized) return;
      this.pwaInitialized = true;

      if (!document.querySelector('link[rel="manifest"]')) {
        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = '/manifest.json';
        document.head.appendChild(link);
      }

      window.addEventListener('beforeinstallprompt', (e) => {
          e.preventDefault();
          this.deferredPrompt = e;
          localStorage.setItem('appinstalled', 'false');
      });
      
      if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('./service-worker.js')
              .then(() => console.log('ServiceWorker注册成功'))
              .catch(err => console.log('ServiceWorker注册失败:', err));
      }

      window.addEventListener('appinstalled', () => {
          this.installed = "true";
          localStorage.setItem('appinstalled', 'true');
      });
    },
    handleClickOutside(e) {
      if (this.showCc && this.$refs.ccWrapper && !this.$refs.ccWrapper.contains(e.target)) {
        this.showCc = false
      }
    },
  }
}).mount('#app')
