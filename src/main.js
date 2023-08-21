import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'
import axios from "./plugins/axios"
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
var app = createApp(App)
app.use(router)
app.config.globalProperties.$axios = axios;
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')