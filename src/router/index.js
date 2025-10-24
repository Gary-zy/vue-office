import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import DocxPreview from '../views/DocxPreview.vue'
import ExcelPreview from '../views/ExcelPreview.vue'
import PdfPreview from '../views/PdfPreview.vue'
import PptxPreview from '../views/PptxPreview.vue'

/**
 * @description 路由配置
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '相关文档'
    }
  },
  {
    path: '/docx-preview',
    name: 'DocxPreview',
    component: DocxPreview,
    meta: {
      title: 'DOCX 文档预览'
    }
  },
  {
    path: '/excel-preview',
    name: 'ExcelPreview',
    component: ExcelPreview,
    meta: {
      title: 'Excel 表格预览'
    }
  },
  {
    path: '/pdf-preview',
    name: 'PdfPreview',
    component: PdfPreview,
    meta: {
      title: 'PDF 文档预览'
    }
  },
  {
    path: '/pptx-preview',
    name: 'PptxPreview',
    component: PptxPreview,
    meta: {
      title: 'PPTX 演示文稿预览'
    }
  }
]

/**
 * @description 创建路由实例
 * 使用 HTML5 History 模式
 * @returns {Router} Vue Router 实例
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

/**
 * @description 路由守卫 - 设置页面标题
 * 在每次路由跳转后更新页面标题
 */
router.afterEach((to) => {
  document.title = to.meta.title || 'Vue3 应用'
})

export default router