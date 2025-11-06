import { createRouter, createWebHistory } from 'vue-router'

/**
 * @description 路由配置
 * 使用路由懒加载优化性能
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '首页 - 技术博客与文档预览平台'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      title: '关于我'
    }
  },
  // 博客路由
  {
    path: '/blog',
    name: 'BlogHome',
    component: () => import('../views/blog/BlogHome.vue'),
    meta: {
      title: '技术博客'
    }
  },
  {
    path: '/blog/article/:id',
    name: 'ArticleDetail',
    component: () => import('../views/blog/ArticleDetail.vue'),
    meta: {
      title: '文章详情'
    }
  },
  {
    path: '/blog/category/:id',
    name: 'Category',
    component: () => import('../views/blog/Category.vue'),
    meta: {
      title: '分类'
    }
  },
  {
    path: '/blog/tag/:id',
    name: 'Tag',
    component: () => import('../views/blog/Tag.vue'),
    meta: {
      title: '标签'
    }
  },
  {
    path: '/blog/archive',
    name: 'Archive',
    component: () => import('../views/blog/Archive.vue'),
    meta: {
      title: '文章归档'
    }
  },
  // 文档预览路由
  {
    path: '/docx-preview',
    name: 'DocxPreview',
    component: () => import('../views/DocxPreview.vue'),
    meta: {
      title: 'DOCX 文档预览'
    }
  },
  {
    path: '/excel-preview',
    name: 'ExcelPreview',
    component: () => import('../views/ExcelPreview.vue'),
    meta: {
      title: 'Excel 表格预览'
    }
  },
  {
    path: '/pdf-preview',
    name: 'PdfPreview',
    component: () => import('../views/PdfPreview.vue'),
    meta: {
      title: 'PDF 文档预览'
    }
  },
  {
    path: '/pptx-preview',
    name: 'PptxPreview',
    component: () => import('../views/PptxPreview.vue'),
    meta: {
      title: 'PPTX 演示文稿预览'
    }
  },
  // 404 页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: '页面不存在'
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
  routes,
  // 路由切换时滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

/**
 * @description 路由守卫 - 设置页面标题
 * 在每次路由跳转后更新页面标题
 */
router.afterEach((to) => {
  document.title = to.meta.title || '技术博客与文档预览平台'
})

export default router