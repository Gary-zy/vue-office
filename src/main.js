import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

/**
 * @description 创建 Vue 应用实例并挂载到 DOM
 * 集成路由系统，使应用支持单页面导航
 */
const app = createApp(App)

// 使用路由
app.use(router)

// 挂载应用
app.mount('#app')
