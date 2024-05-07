import './assets/main.scss'

// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from "@/router/index.js";
import 'element-plus/dist/index.css'
import App from './App.vue'
import locale from 'element-plus/dist/locale/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import {createPersistedState} from 'pinia-persistedstate-plugin'

const pinia = createPinia()
const persist = createPersistedState()
pinia.use(persist)

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus,{locale})
app.use(router)
app.mount('#app')
app.use(pinia)