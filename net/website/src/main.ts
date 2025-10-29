import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// 根据不同的设备宽度来设置跟元素的字体大小
import 'amfe-flexible'
// 引入vant组件样式
import 'vant/lib/index.css';
// 引入多语言
import i18n from './language'
import router from './router'

const app = createApp(App)
const pinia = createPinia();

app.use(i18n)
app.use(pinia)
app.use(router)
app.mount('#app')