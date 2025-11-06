import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

// 导入 Naive UI 相关
import naive from 'naive-ui'
// 导入字体
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

// 导入 nprogress 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置 NProgress
NProgress.configure({ 
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
})

// 路由进度条
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

/**
 * @description 创建 Vue 应用实例并挂载到 DOM
 * 集成路由系统、状态管理和 Naive UI 组件库
 */
const app = createApp(App)
const pinia = createPinia()

// 使用 Pinia 状态管理
app.use(pinia)

// 使用路由
app.use(router)

// 使用 Naive UI
app.use(naive)

// 挂载应用
app.mount('#app')
