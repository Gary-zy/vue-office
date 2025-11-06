# 🚀 技术博客 & 文档预览平台

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.5.22-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-2.x-ffd859?style=for-the-badge&logo=pinia&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.11-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Naive UI](https://img.shields.io/badge/Naive%20UI-2.43.1-18a058?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.16-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**一个集技术博客和文档预览于一体的现代化前端展示平台**

*基于 Vue 3 + Pinia + Naive UI 构建，展示完整的前端技术栈应用*

[在线演示](https://gary-zy.github.io/vue-office/) • [快速开始](#-快速开始) • [功能特色](#-功能特色) • [技术栈](#-技术栈)

</div>

---

## ✨ 功能特色

### 📝 技术博客系统

- **文章管理** - 完整的文章列表、详情、分类、标签、搜索功能
- **Markdown 渲染** - 支持 Markdown 编写，代码高亮显示
- **交互功能** - 点赞、收藏、评论、分享等社交功能
- **阅读体验** - 文章目录（TOC）、阅读进度、相关推荐
- **数据持久化** - 本地存储用户偏好和阅读记录
- **响应式设计** - 完美适配桌面端和移动端

### 📄 文档预览系统

- **多格式支持** - 支持 DOCX、Excel、PDF、PPTX 在线预览
- **高保真渲染** - 保持原有格式和样式
- **灵活加载** - 支持网络地址、本地上传、二进制数据
- **用户友好** - 简洁的界面和流畅的操作体验

### 🎨 现代化 UI

- **主题切换** - 支持明暗主题自动切换
- **精美动画** - 流畅的页面过渡和交互动画
- **组件化设计** - 可复用的高质量组件
- **无障碍支持** - 遵循无障碍设计规范

## 🎬 功能演示

### 技术博客

| 博客首页 | 文章详情 |
|:---:|:---:|
| 文章列表、分类导航、标签云、热门文章 | Markdown 渲染、代码高亮、评论系统 |

| 搜索功能 | 归档页面 |
|:---:|:---:|
| 全文搜索、搜索历史、热门搜索 | 按时间归档、快速定位 |

### 文档预览

| Word 文档 | Excel 表格 | PDF 文档 | PowerPoint |
|:---:|:---:|:---:|:---:|
| DOCX 预览 | XLSX 预览 | PDF 预览 | PPTX 预览 |

## 🚀 快速开始

### 📋 环境要求

- **Node.js** >= 20.19.0 或 >= 22.12.0
- **npm** 或 **yarn** 包管理器

### 📦 安装依赖

```bash
# 克隆项目
git clone https://github.com/your-username/blog-preview-platform.git
cd blog-preview-platform

# 安装依赖
npm install
# 或
yarn install
```

### 🏃‍♂️ 启动开发服务器

```bash
# 启动开发服务器
npm run dev
# 或
yarn dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用

### 🏗️ 构建生产版本

```bash
# 构建生产版本
npm run build
# 或
yarn build

# 预览生产版本
npm run preview
# 或
yarn preview
```

## 📦 技术栈

### 🎯 核心框架

- **[Vue 3](https://vuejs.org/)** - 渐进式 JavaScript 框架
- **[Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)** - Vue 3 组合式 API
- **[Pinia](https://pinia.vuejs.org/)** - Vue 官方状态管理库
- **[Vue Router](https://router.vuejs.org/)** - Vue.js 官方路由管理器
- **[Vite](https://vitejs.dev/)** - 下一代前端构建工具

### 🎨 UI 与样式

- **[Naive UI](https://www.naiveui.com/)** - 现代化 Vue 3 组件库
- **[Tailwind CSS](https://tailwindcss.com/)** - 实用优先的 CSS 框架
- **[Vicons](https://www.xicons.org/)** - 精美的 Vue 图标库

### 📄 文档预览

- **[@vue-office/docx](https://github.com/501351981/vue-office)** - Word 文档预览
- **[@vue-office/excel](https://github.com/501351981/vue-office)** - Excel 表格预览
- **[@vue-office/pdf](https://github.com/501351981/vue-office)** - PDF 文档预览
- **[@vue-office/pptx](https://github.com/501351981/vue-office)** - PowerPoint 预览

### 🛠️ 工具库

- **[Axios](https://axios-http.com/)** - HTTP 客户端
- **[Markdown-it](https://markdown-it.github.io/)** - Markdown 解析器
- **[highlight.js](https://highlightjs.org/)** - 代码高亮
- **[dayjs](https://day.js.org/)** - 日期处理库
- **[nprogress](https://ricostacruz.com/nprogress/)** - 页面加载进度条
- **[@vueuse/core](https://vueuse.org/)** - Vue 组合式工具集

## 📁 项目结构

```
blog-preview-platform/
├── 📁 public/                  # 静态资源
├── 📁 src/
│   ├── 📁 api/                 # API 接口
│   │   ├── request.js          # Axios 封装
│   │   └── blog.js             # 博客接口
│   ├── 📁 assets/              # 资源文件
│   │   └── 📁 mock/            # Mock 数据
│   │       ├── articles.json   # 文章数据
│   │       ├── categories.json # 分类数据
│   │       └── tags.json       # 标签数据
│   ├── 📁 components/          # 组件
│   │   ├── ThemeToggle.vue     # 主题切换
│   │   ├── 📁 blog/            # 博客组件
│   │   │   ├── ArticleCard.vue   # 文章卡片
│   │   │   ├── ArticleList.vue   # 文章列表
│   │   │   ├── CategoryNav.vue   # 分类导航
│   │   │   ├── TagCloud.vue      # 标签云
│   │   │   ├── SearchBar.vue     # 搜索栏
│   │   │   ├── Comment.vue       # 评论组件
│   │   │   └── TOC.vue           # 文章目录
│   │   └── 📁 common/          # 通用组件
│   ├── 📁 router/              # 路由配置
│   │   └── index.js
│   ├── 📁 stores/              # Pinia 状态管理
│   │   ├── blog.js             # 博客状态
│   │   ├── theme.js            # 主题状态
│   │   └── user.js             # 用户状态
│   ├── 📁 utils/               # 工具函数
│   │   ├── markdown.js         # Markdown 处理
│   │   ├── date.js             # 日期格式化
│   │   └── storage.js          # 本地存储
│   ├── 📁 views/               # 页面组件
│   │   ├── Home.vue            # 平台首页
│   │   ├── About.vue           # 关于页面
│   │   ├── 📁 blog/            # 博客页面
│   │   │   ├── BlogHome.vue      # 博客首页
│   │   │   ├── ArticleDetail.vue # 文章详情
│   │   │   ├── Category.vue      # 分类页面
│   │   │   ├── Tag.vue           # 标签页面
│   │   │   └── Archive.vue       # 归档页面
│   │   ├── DocxPreview.vue     # DOCX 预览
│   │   ├── ExcelPreview.vue    # Excel 预览
│   │   ├── PdfPreview.vue      # PDF 预览
│   │   ├── PptxPreview.vue     # PPTX 预览
│   │   └── NotFound.vue        # 404 页面
│   ├── App.vue                 # 根组件
│   ├── main.js                 # 应用入口
│   └── style.css               # 全局样式
├── 📄 index.html               # HTML 模板
├── 📄 package.json             # 项目配置
├── 📄 vite.config.js           # Vite 配置
└── 📄 tailwind.config.js       # Tailwind 配置
```

## 🎯 核心功能实现

### 状态管理 (Pinia)

```javascript
// stores/blog.js
export const useBlogStore = defineStore('blog', () => {
  const articles = ref([])
  const categories = ref([])
  const tags = ref([])
  
  // 筛选后的文章
  const filteredArticles = computed(() => {
    // 支持搜索、分类、标签筛选
  })
  
  // 初始化博客数据
  async function initBlogData() {
    // 加载 Mock 数据
  }
  
  return { articles, filteredArticles, initBlogData }
})
```

### Markdown 渲染

```javascript
// utils/markdown.js
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const md = new MarkdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(str, { language: lang }).value
    }
    return ''
  }
})

export function renderMarkdown(markdown) {
  return md.render(markdown)
}
```

### 文档预览

```vue
<!-- DOCX 预览 -->
<template>
  <VueOfficeDocx 
    :src="docxUrl" 
    @rendered="onRendered"
    @error="onError"
  />
</template>

<script setup>
import VueOfficeDocx from '@vue-office/docx'
const docxUrl = 'https://example.com/document.docx'
</script>
```

## 🎨 特色功能

### 1. 智能搜索

- 全文搜索（标题、摘要、标签、内容）
- 搜索历史记录
- 热门搜索推荐
- 搜索结果高亮

### 2. 阅读体验

- 自动生成文章目录（TOC）
- 实时显示阅读进度
- 代码块一键复制
- 响应式图片加载

### 3. 社交互动

- 点赞收藏功能
- 评论系统（Mock 数据）
- 相关文章推荐
- 文章分享

### 4. 性能优化

- 路由懒加载
- 组件按需引入
- 图片懒加载
- 本地数据缓存
- 虚拟滚动（大列表）

## 🛠️ 开发指南

### 添加新文章

编辑 `src/assets/mock/articles.json`：

```json
{
  "id": "art_new",
  "title": "新文章标题",
  "summary": "文章摘要",
  "content": "# Markdown 内容\n\n正文...",
  "cover": "https://example.com/cover.jpg",
  "category": "vue",
  "tags": ["Vue 3", "Composition API"],
  "author": {
    "name": "作者名",
    "avatar": "https://example.com/avatar.jpg"
  },
  "publishTime": "2024-01-20T10:00:00Z",
  "views": 0,
  "likes": 0,
  "comments": 0,
  "collections": 0,
  "readingTime": 5
}
```

### 添加新分类

编辑 `src/assets/mock/categories.json`：

```json
{
  "id": "new-category",
  "name": "新分类",
  "description": "分类描述",
  "icon": "🚀",
  "color": "#ff6b6b"
}
```

### 自定义主题

修改 Naive UI 主题变量或 Tailwind 配置：

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#18a058',
        secondary: '#2080f0'
      }
    }
  }
}
```

## 📈 未来计划

- [ ] 后端 API 集成
- [ ] 用户认证系统
- [ ] 文章编辑器（WYSIWYG）
- [ ] 图片上传功能
- [ ] 评论系统实现
- [ ] RSS 订阅
- [ ] PWA 支持
- [ ] 国际化 (i18n)
- [ ] 单元测试
- [ ] E2E 测试

## 🤝 贡献指南

我们欢迎所有形式的贡献！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源协议。

## 🙏 致谢

感谢以下开源项目的支持：

- [Vue.js](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Naive UI](https://www.naiveui.com/)
- [vue-office](https://github.com/501351981/vue-office)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐ Star 支持一下！**

Made with ❤️ by [Your Name](https://github.com/your-username)

</div>
