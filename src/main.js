import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// 导入 Naive UI 相关
import naive from 'naive-ui'
// 导入字体
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

/**
 * @description 创建 Vue 应用实例并挂载到 DOM
 * 集成路由系统和 Naive UI 组件库，使应用支持单页面导航和丰富的 UI 组件
 */
const app = createApp(App)

// 使用路由
app.use(router)

// 使用 Naive UI
app.use(naive)

// 挂载应用
app.mount('#app')
