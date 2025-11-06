# 🚀 Vue 3 前端技术展示平台

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.5.22-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-2.x-ffd859?style=for-the-badge&logo=pinia&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.11-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Naive UI](https://img.shields.io/badge/Naive%20UI-2.43.1-18a058?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.16-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**全栈前端技术展示平台 - 博客系统 + 前端工具集**

*基于 Vue 3 + Node.js 构建，展示完整的全栈开发能力*

[快速开始](#-快速开始) • [功能特色](#-功能特色) • [技术栈](#-技术栈) • [项目结构](#-项目结构)

</div>

---

## ✨ 功能特色

### 📝 技术博客系统

- **文章管理** - 完整的文章 CRUD、列表、详情、分类、标签功能
- **Markdown 渲染** - 支持 Markdown 编写，代码高亮显示
- **搜索功能** - 全文搜索，支持标题、内容、标签
- **归档浏览** - 按时间线展示文章归档
- **交互功能** - 点赞、收藏、评论、分享等社交功能
- **阅读体验** - 文章目录（TOC）、阅读进度、相关推荐
- **后端 API** - RESTful API，支持文章增删改查
- **响应式设计** - 完美适配桌面端和移动端

### 🛠️ 前端工具集

#### 📄 文档预览工具

- **多格式支持** - DOCX、Excel、PDF、PPTX 在线预览
- **高保真渲染** - 保持原有格式和样式
- **灵活加载** - 支持网络地址、本地上传、二进制数据
- **用户友好** - 简洁的界面和流畅的操作体验

#### ✍️ 富文本编辑器

- **Markdown 编辑** - 实时 Markdown 编辑和预览
- **代码高亮** - 支持多种编程语言语法高亮
- **导出功能** - 支持导出为 Markdown 和 HTML 格式
- **字数统计** - 实时统计字数

#### 🤖 AI 工具（规划中）

- AI 问答助手
- 代码生成工具
- 更多实用工具...

### 🎨 现代化 UI

- **主题切换** - 支持明暗主题自动切换，本地持久化
- **精美动画** - 流畅的页面过渡和交互动画
- **组件化设计** - 可复用的高质量组件
- **加载反馈** - NProgress 进度条，提升用户体验

## 🎬 功能演示

### 技术博客

| 博客首页 | 文章详情 |
|:---:|:---:|
| 文章列表、分类导航、标签云、热门文章 | Markdown 渲染、代码高亮、评论系统 |

| 搜索功能 | 归档页面 |
|:---:|:---:|
| 全文搜索、搜索历史、热门搜索 | 按时间归档、快速定位 |

### 前端工具

| 文档预览 | 富文本编辑器 |
|:---:|:---:|
| DOCX/Excel/PDF/PPTX 在线预览 | Markdown 实时编辑和预览 |

## 🚀 快速开始

### 📋 环境要求

- **Node.js** >= 18.0.0
- **npm** 或 **yarn** 包管理器

### 📦 安装依赖

```bash
# 克隆项目
git clone https://github.com/your-username/vue-tech-platform.git
cd vue-tech-platform

# 安装前端依赖
npm install

# 安装后端依赖
cd server
npm install
cd ..
```

### 🏃‍♂️ 启动开发服务器

#### 方式 1：仅启动前端（使用 Mock 数据）

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用

#### 方式 2：启动前后端（推荐）

**终端 1 - 启动后端 API：**

```bash
cd server
npm run dev
```

后端运行在 [http://localhost:3000](http://localhost:3000)

**终端 2 - 启动前端：**

```bash
npm run dev
```

前端运行在 [http://localhost:5173](http://localhost:5173)

> **注意**：如需连接后端 API，请修改 `src/api/request.js` 中的 `baseURL` 为 `http://localhost:3000/api`

### 🏗️ 构建生产版本

#### 前端构建

```bash
npm run build
```

构建产物在 `dist/` 目录

#### 后端部署

```bash
cd server

# 直接运行
npm start

# 或使用 PM2
npm install -g pm2
pm2 start index.js --name blog-api
```

### 🔧 预览构建结果

```bash
npm run preview
```

## 🛠️ 技术栈

### 前端技术

- **核心框架**：Vue 3.5 (Composition API)
- **构建工具**：Vite 7.x
- **UI 组件库**：Naive UI 2.x
- **状态管理**：Pinia 2.x
- **路由管理**：Vue Router 4.x
- **样式方案**：Tailwind CSS 4.x
- **HTTP 客户端**：Axios 1.x
- **Markdown 解析**：markdown-it + markdown-it-anchor
- **代码高亮**：highlight.js
- **日期处理**：dayjs
- **进度条**：nprogress
- **文档预览**：@vue-office 系列组件
  - @vue-office/docx
  - @vue-office/excel
  - @vue-office/pdf
  - @vue-office/pptx

### 后端技术

- **运行环境**：Node.js 18+
- **Web 框架**：Express 4.x
- **跨域处理**：CORS
- **请求体解析**：body-parser
- **数据存储**：JSON 文件（可升级为 MongoDB、MySQL 等）
- **API 风格**：RESTful API

## 📁 项目结构

```
vue-project/
├── src/                          # 前端源码
│   ├── api/                      # API 接口封装
│   │   ├── blog.js               # 博客相关接口
│   │   └── request.js            # Axios 封装
│   ├── assets/                   # 静态资源
│   │   └── mock/                 # Mock 数据
│   │       ├── articles.json     # 文章数据
│   │       ├── categories.json   # 分类数据
│   │       └── tags.json         # 标签数据
│   ├── components/               # 公共组件
│   │   ├── ThemeToggle.vue       # 主题切换
│   │   └── blog/                 # 博客组件
│   │       ├── ArticleCard.vue   # 文章卡片
│   │       ├── ArticleList.vue   # 文章列表
│   │       ├── TagCloud.vue      # 标签云
│   │       ├── CategoryNav.vue   # 分类导航
│   │       ├── SearchBar.vue     # 搜索栏
│   │       ├── Comment.vue       # 评论组件
│   │       └── TOC.vue           # 文章目录
│   ├── stores/                   # Pinia 状态管理
│   │   ├── blog.js               # 博客状态
│   │   ├── user.js               # 用户状态
│   │   └── theme.js              # 主题状态
│   ├── utils/                    # 工具函数
│   │   ├── markdown.js           # Markdown 处理
│   │   ├── date.js               # 日期格式化
│   │   └── storage.js            # 本地存储
│   ├── views/                    # 页面组件
│   │   ├── Home.vue              # 首页
│   │   ├── About.vue             # 关于页面
│   │   ├── DocxPreview.vue       # DOCX 预览
│   │   ├── ExcelPreview.vue      # Excel 预览
│   │   ├── PdfPreview.vue        # PDF 预览
│   │   ├── PptxPreview.vue       # PPTX 预览
│   │   ├── blog/                 # 博客页面
│   │   │   ├── BlogHome.vue      # 博客首页
│   │   │   ├── ArticleDetail.vue # 文章详情
│   │   │   ├── Category.vue      # 分类页面
│   │   │   ├── Tag.vue           # 标签页面
│   │   │   └── Archive.vue       # 归档页面
│   │   ├── tools/                # 工具页面
│   │   │   └── RichEditor.vue    # 富文本编辑器
│   │   └── NotFound.vue          # 404 页面
│   ├── router/                   # 路由配置
│   │   └── index.js              # 路由表
│   ├── App.vue                   # 根组件
│   ├── main.js                   # 入口文件
│   └── style.css                 # 全局样式
├── server/                       # 后端源码
│   ├── data/                     # 数据存储
│   │   └── articles.json         # 文章数据
│   ├── index.js                  # 后端入口
│   ├── package.json              # 后端依赖
│   └── README.md                 # 后端文档
├── public/                       # 公共资源
│   └── favicon.ico               # 网站图标
├── dist/                         # 构建产物
├── node_modules/                 # 依赖包
├── index.html                    # HTML 模板
├── package.json                  # 前端依赖配置
├── vite.config.js                # Vite 配置
├── tailwind.config.js            # Tailwind 配置
├── postcss.config.js             # PostCSS 配置
├── jsconfig.json                 # JS 配置
└── README.md                     # 项目说明
```

## 🌟 核心特性详解

### 1. 博客系统

- **文章展示**：首页展示文章列表，支持分页加载
- **文章详情**：Markdown 渲染，代码高亮，文章目录
- **分类筛选**：按分类浏览文章
- **标签筛选**：按标签筛选文章
- **搜索功能**：全文搜索文章标题和内容
- **归档功能**：按时间线展示文章归档
- **后端 API**：完整的 RESTful API，支持文章 CRUD

#### 后端 API 接口

```javascript
// 获取所有文章
GET /api/articles?page=1&pageSize=10&category=vue&tag=Vue3&keyword=性能

// 获取单篇文章
GET /api/articles/:id

// 创建新文章
POST /api/articles

// 更新文章
PUT /api/articles/:id

// 删除文章
DELETE /api/articles/:id

// 点赞文章
POST /api/articles/:id/like

// 增加浏览量
POST /api/articles/:id/view
```

### 2. 前端工具集

#### 文档预览工具

- **多格式支持**：DOCX、Excel、PDF、PPTX
- **在线预览**：无需下载，直接在浏览器中查看
- **响应式**：自适应不同屏幕尺寸

#### 富文本编辑器

- **Markdown 编辑**：实时编辑和预览
- **代码高亮**：支持多种编程语言
- **导出功能**：导出 Markdown 和 HTML

### 3. 主题切换

- **深色模式**：护眼的深色主题
- **浅色模式**：清爽的浅色主题
- **本地持久化**：主题选择自动保存

### 4. 性能优化

- **路由懒加载**：按需加载路由组件
- **组件懒加载**：提升首屏加载速度
- **NProgress**：页面切换加载进度提示

### 5. 全栈架构

- **前后端分离**：Vue 3 前端 + Node.js 后端
- **RESTful API**：标准化的 API 设计
- **数据持久化**：支持文章数据的增删改查
- **可扩展性**：易于接入数据库（MongoDB、MySQL 等）

## 📝 开发说明

### 前端开发

#### 添加新文章（Mock 数据）

1. 在 `src/assets/mock/articles.json` 中添加文章数据
2. 文章内容使用 Markdown 格式编写
3. 确保分类和标签已在对应的 JSON 文件中定义

#### 自定义主题

Naive UI 支持主题定制，可以在 `App.vue` 中配置：

```javascript
const themeOverrides = {
  common: {
    primaryColor: '#18a058'
  }
}
```

#### 路由配置

在 `src/router/index.js` 中配置路由，支持：

- 路由懒加载
- Meta 信息
- 页面标题自动更新

### 后端开发

#### 添加新文章（通过 API）

```bash
# POST 请求创建文章
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "文章标题",
    "summary": "文章摘要",
    "content": "Markdown 内容",
    "category": "vue",
    "tags": ["Vue 3", "Composition API"],
    "author": {
      "name": "作者名",
      "avatar": "https://example.com/avatar.jpg"
    }
  }'
```

#### 扩展 API

在 `server/index.js` 中添加新的路由和接口：

```javascript
app.get('/api/custom', (req, res) => {
  // 自定义逻辑
  res.json({ code: 200, data: {} })
})
```

#### 接入数据库

替换 `readArticles()` 和 `writeArticles()` 函数，实现数据库 CRUD 操作：

```javascript
// 示例：MongoDB
import { MongoClient } from 'mongodb'

async function getArticles() {
  const client = new MongoClient(mongoUrl)
  await client.connect()
  const db = client.db('blog')
  return await db.collection('articles').find().toArray()
}
```

详细的后端 API 文档请查看 [server/README.md](server/README.md)

## 📋 待办事项

### 博客功能
- [x] 文章列表和详情
- [x] 分类和标签筛选
- [x] 搜索功能
- [x] Markdown 渲染
- [x] 后端 API 基础实现
- [ ] 文章评论真实后端对接
- [ ] 用户认证系统（JWT）
- [ ] 文章点赞/收藏功能
- [ ] 管理后台界面
- [ ] 数据库集成（MongoDB/PostgreSQL）
- [ ] 图片上传功能
- [ ] RSS 订阅

### 工具功能
- [x] 文档预览（DOCX/Excel/PDF/PPTX）
- [x] Markdown 编辑器
- [x] WangEditor 富文本编辑器
- [x] Vditor Markdown 编辑器
- [x] 甘特图项目管理
- [x] 地图工具
- [x] 视频播放器
- [x] JSON 格式化工具
- [x] 条形码/二维码生成器
- [ ] AI 工具问答
- [ ] 代码格式化工具
- [ ] 图片压缩工具
- [ ] 更多实用工具

### 优化
- [ ] 移动端深度优化
- [ ] SEO 优化
- [ ] 国际化支持（i18n）
- [ ] PWA 支持
- [ ] 性能监控
- [ ] 单元测试
- [ ] E2E 测试

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 提交规范

```bash
# 功能开发
git commit -m "feat: 添加新功能"

# Bug 修复
git commit -m "fix: 修复某个问题"

# 文档更新
git commit -m "docs: 更新文档"

# 样式调整
git commit -m "style: 调整样式"

# 代码重构
git commit -m "refactor: 重构代码"

# 性能优化
git commit -m "perf: 性能优化"

# 测试
git commit -m "test: 添加测试"
```

## 📄 许可证

[MIT License](LICENSE)

## 🙏 鸣谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Naive UI](https://www.naiveui.com/) - Vue 3 组件库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理
- [Express](https://expressjs.com/) - Node.js Web 框架
- [@vue-office](https://github.com/501351981/vue-office) - 文档预览组件

## 📞 联系方式

- 作者：Your Name
- 邮箱：your.email@example.com
- GitHub：[@your-username](https://github.com/your-username)

---

<div align="center">

**如果这个项目对你有帮助，请给它一个 ⭐ Star！**

Made with ❤️ by [Your Name]

</div>
