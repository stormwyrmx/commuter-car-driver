import './assets/main.scss'

// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from "@/router/index.js";
import 'element-plus/dist/index.css'
import App from './App.vue'
import locale from 'element-plus/dist/locale/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus,{locale})
app.use(router)
app.mount('#app')