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
  // 工具路由
  {
    path: '/tools',
    name: 'Tools',
    redirect: '/tools/preview/docx'
  },
  // 文档预览工具
  {
    path: '/tools/preview/docx',
    name: 'DocxPreview',
    component: () => import('../views/DocxPreview.vue'),
    meta: {
      title: 'DOCX 文档预览 - 工具'
    }
  },
  {
    path: '/tools/preview/excel',
    name: 'ExcelPreview',
    component: () => import('../views/ExcelPreview.vue'),
    meta: {
      title: 'Excel 表格预览 - 工具'
    }
  },
  {
    path: '/tools/preview/pdf',
    name: 'PdfPreview',
    component: () => import('../views/PdfPreview.vue'),
    meta: {
      title: 'PDF 文档预览 - 工具'
    }
  },
  {
    path: '/tools/preview/pptx',
    name: 'PptxPreview',
    component: () => import('../views/PptxPreview.vue'),
    meta: {
      title: 'PPTX 演示文稿预览 - 工具'
    }
  },
  // 富文本编辑器
  {
    path: '/tools/editor/rich',
    name: 'RichEditor',
    component: () => import('../views/tools/RichEditor.vue'),
    meta: {
      title: 'Markdown 编辑器 - 工具'
    }
  },
  // WangEditor 富文本编辑器
  {
    path: '/tools/editor/wang',
    name: 'WangEditor',
    component: () => import('../views/tools/WangEditor.vue'),
    meta: {
      title: 'WangEditor 富文本编辑器 - 工具'
    }
  },
  // Vditor Markdown 编辑器
  {
    path: '/tools/editor/vditor',
    name: 'VditorEditor',
    component: () => import('../views/tools/VditorEditor.vue'),
    meta: {
      title: 'Vditor Markdown 编辑器 - 工具'
    }
  },
  // 甘特图
  {
    path: '/tools/gantt',
    name: 'GanttChart',
    component: () => import('../views/tools/GanttChart.vue'),
    meta: {
      title: '甘特图 - 工具'
    }
  },
  // 地图工具
  {
    path: '/tools/map',
    name: 'MapViewer',
    component: () => import('../views/tools/MapViewer.vue'),
    meta: {
      title: '地图工具 - 工具'
    }
  },
  // 视频播放器
  {
    path: '/tools/video',
    name: 'VideoPlayer',
    component: () => import('../views/tools/VideoPlayer.vue'),
    meta: {
      title: '视频播放器 - 工具'
    }
  },
  // JSON 格式化工具
  {
    path: '/tools/json',
    name: 'JsonFormatter',
    component: () => import('../views/tools/JsonFormatter.vue'),
    meta: {
      title: 'JSON 格式化 - 工具'
    }
  },
  // 条形码二维码生成器
  {
    path: '/tools/barcode',
    name: 'BarcodeGenerator',
    component: () => import('../views/tools/BarcodeGenerator.vue'),
    meta: {
      title: '条形码二维码生成 - 工具'
    }
  },
  // 室内导览工具
  {
    path: '/tools/indoor-guide',
    name: 'IndoorGuide',
    component: () => import('../views/tools/IndoorGuide.vue'),
    meta: {
      title: '室内导览 - 工具'
    }
  },
  // 兼容旧路由（重定向）
  {
    path: '/docx-preview',
    redirect: '/tools/preview/docx'
  },
  {
    path: '/excel-preview',
    redirect: '/tools/preview/excel'
  },
  {
    path: '/pdf-preview',
    redirect: '/tools/preview/pdf'
  },
  {
    path: '/pptx-preview',
    redirect: '/tools/preview/pptx'
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