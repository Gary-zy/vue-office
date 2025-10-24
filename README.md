# 📄 Vue3 文档预览系统

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.5.22-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.11-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Naive UI](https://img.shields.io/badge/Naive%20UI-2.43.1-18a058?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.16-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**🚀 一个现代化的多格式文档在线预览系统**

*支持 Word、Excel、PDF、PowerPoint 等多种文档格式的高质量在线预览*

[在线演示](https://gary-zy.github.io/vue-office/) • [快速开始](#-快速开始) • [功能特色](#-功能特色) • [技术文档](#-使用说明)

</div>

---

## ✨ 功能特色

### 🎯 多格式支持
- **📄 Word 文档** - 完美支持 `.docx` 格式，保持原有排版和样式
- **📊 Excel 表格** - 支持 `.xlsx` 格式，多工作表切换，数据完整展示
- **📋 PDF 文档** - 高质量 PDF 预览，支持缩放、导航和全屏查看
- **🎨 PowerPoint** - 支持 `.pptx` 格式，保持动画和样式效果

### 🛠️ 技术亮点
- ⚡ **极速加载** - 基于 Vite 构建，开发体验丝滑流畅
- 🎨 **现代 UI** - 采用 Naive UI 组件库，界面美观易用
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🌙 **主题切换** - 支持明暗主题切换
- 🔧 **高度可配置** - 丰富的配置选项，满足不同需求

### 🚀 使用方式
- 🌐 **网络地址预览** - 直接输入文档 URL 进行预览
- 📁 **文件上传预览** - 支持本地文件上传预览
- 💾 **二进制数据** - 支持 ArrayBuffer、Blob 等格式

## 🎬 功能演示

<div align="center">

| Word 文档预览 | Excel 表格预览 |
|:---:|:---:|
| ![Word Preview](https://via.placeholder.com/400x250/4FC08D/FFFFFF?text=Word+Preview) | ![Excel Preview](https://via.placeholder.com/400x250/217346/FFFFFF?text=Excel+Preview) |

| PDF 文档预览 | PowerPoint 预览 |
|:---:|:---:|
| ![PDF Preview](https://via.placeholder.com/400x250/DC2626/FFFFFF?text=PDF+Preview) | ![PPT Preview](https://via.placeholder.com/400x250/7C3AED/FFFFFF?text=PPT+Preview) |

</div>

## 🚀 快速开始

### 📋 环境要求

- **Node.js** >= 20.19.0 或 >= 22.12.0
- **npm** 或 **yarn** 包管理器

### 📦 安装依赖

```bash
# 克隆项目
git clone https://github.com/your-username/vue3-document-preview.git
cd vue3-document-preview

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
- **[Vite](https://vitejs.dev/)** - 下一代前端构建工具
- **[Vue Router](https://router.vuejs.org/)** - Vue.js 官方路由管理器

### 🎨 UI 组件
- **[Naive UI](https://www.naiveui.com/)** - 现代化 Vue 3 组件库
- **[Tailwind CSS](https://tailwindcss.com/)** - 实用优先的 CSS 框架
- **[Vicons](https://www.xicons.org/)** - 精美的 Vue 图标库

### 📄 文档预览
- **[@vue-office/docx](https://github.com/501351981/vue-office)** - Word 文档预览组件
- **[@vue-office/excel](https://github.com/501351981/vue-office)** - Excel 表格预览组件
- **[@vue-office/pdf](https://github.com/501351981/vue-office)** - PDF 文档预览组件
- **[@vue-office/pptx](https://github.com/501351981/vue-office)** - PowerPoint 预览组件

## 📁 项目结构

```
vue3-document-preview/
├── 📁 public/                 # 静态资源
├── 📁 src/
│   ├── 📁 components/         # 公共组件
│   │   └── ThemeToggle.vue   # 主题切换组件
│   ├── 📁 lib/               # 工具库
│   │   └── utils.js          # 工具函数
│   ├── 📁 router/            # 路由配置
│   │   └── index.js          # 路由定义
│   ├── 📁 views/             # 页面组件
│   │   ├── Home.vue          # 首页
│   │   ├── About.vue         # 关于页面
│   │   ├── DocxPreview.vue   # Word 预览页
│   │   ├── ExcelPreview.vue  # Excel 预览页
│   │   ├── PdfPreview.vue    # PDF 预览页
│   │   └── PptxPreview.vue   # PowerPoint 预览页
│   ├── App.vue               # 根组件
│   ├── main.js               # 应用入口
│   └── style.css             # 全局样式
├── 📄 index.html             # HTML 模板
├── 📄 package.json           # 项目配置
├── 📄 vite.config.js         # Vite 配置
└── 📄 tailwind.config.js     # Tailwind 配置
```

## 🎯 使用说明

### 📄 Word 文档预览

```vue
<template>
  <VueOfficeDocx 
    :src="docxUrl" 
    style="height: 100vh;"
    @rendered="onRendered"
    @error="onError"
  />
</template>

<script setup>
import { VueOfficeDocx } from '@vue-office/docx'

const docxUrl = 'https://example.com/document.docx'

const onRendered = () => {
  console.log('文档渲染完成')
}

const onError = (error) => {
  console.error('文档加载失败:', error)
}
</script>
```

### 📊 Excel 表格预览

```vue
<template>
  <VueOfficeExcel 
    :src="excelUrl"
    :options="excelOptions"
    style="height: 100vh;"
    @rendered="onRendered"
  />
</template>

<script setup>
import { VueOfficeExcel } from '@vue-office/excel'

const excelUrl = 'https://example.com/spreadsheet.xlsx'
const excelOptions = {
  minColLength: 10,
  minRowLength: 20,
  widthOffset: 10,
  heightOffset: 10
}
</script>
```

### 📋 PDF 文档预览

```vue
<template>
  <VueOfficePdf 
    :src="pdfUrl"
    style="height: 100vh;"
    @rendered="onRendered"
  />
</template>

<script setup>
import { VueOfficePdf } from '@vue-office/pdf'

const pdfUrl = 'https://example.com/document.pdf'
</script>
```

## 🛠️ 开发指南

### 🔧 本地开发

1. **克隆仓库**
   ```bash
   git clone https://github.com/your-username/vue3-document-preview.git
   cd vue3-document-preview
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **访问应用**
   打开浏览器访问 [http://localhost:5173](http://localhost:5173)

### 🎨 自定义主题

项目支持自定义主题，你可以在 `src/style.css` 中修改 CSS 变量：

```css
:root {
  --primary-color: #18a058;
  --secondary-color: #2080f0;
  --background-color: #ffffff;
  --text-color: #333333;
}
```

### 📱 响应式断点

```css
/* 移动端 */
@media (max-width: 768px) { }

/* 平板端 */
@media (min-width: 769px) and (max-width: 1024px) { }

/* 桌面端 */
@media (min-width: 1025px) { }
```

## 🤝 贡献指南

我们欢迎所有形式的贡献！请遵循以下步骤：

### 🔄 提交流程

1. **Fork 本仓库**
2. **创建特性分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **创建 Pull Request**

### 📝 代码规范

- 使用 **驼峰命名法** 命名变量和函数
- 为所有函数添加 **JSDoc 注释**
- 遵循 **Vue 3 Composition API** 最佳实践
- 确保代码通过 **ESLint** 检查

### 🐛 问题反馈

如果你发现了 bug 或有功能建议，请：

1. 检查 [Issues](https://github.com/your-username/vue3-document-preview/issues) 中是否已存在相关问题
2. 如果没有，请创建新的 Issue，详细描述问题或建议
3. 使用合适的标签标记 Issue

## 📈 路线图

- [ ] 🔍 添加文档搜索功能
- [ ] 🖨️ 支持文档打印功能
- [ ] 💾 添加文档下载功能
- [ ] 🔐 支持密码保护的文档
- [ ] 🌐 国际化支持
- [ ] 📊 添加文档统计功能
- [ ] 🎨 更多主题选择
- [ ] 📱 PWA 支持

## 🙏 致谢

感谢以下开源项目的支持：

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Naive UI](https://www.naiveui.com/) - 现代化 Vue 3 组件库
- [vue-office](https://github.com/501351981/vue-office) - 文档预览组件库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源协议。

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐ Star 支持一下！**

Made with ❤️ by [Your Name](https://github.com/your-username)

</div>
# 触发部署
<!-- Trigger deployment -->
