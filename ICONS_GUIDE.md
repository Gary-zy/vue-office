# 图标使用指南

本项目已集成 `unplugin-icons` 插件，可以直接使用来自 [Icônes](https://icones.js.org/) 的所有图标。

## 🎯 为什么不使用 Emoji？

1. **跨平台一致性**：不同操作系统和浏览器显示的 emoji 样式不同
2. **专业性**：图标更符合专业软件的视觉规范
3. **可定制性**：图标可以自定义大小、颜色等属性
4. **性能更好**：SVG 图标渲染性能优于 emoji

## 📦 安装

已安装以下依赖：

```bash
npm install -D unplugin-icons @iconify/json
```

## 🔧 配置

在 `vite.config.js` 中已配置：

```javascript
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [
    Icons({
      autoInstall: true,
      compiler: 'vue3'
    })
  ]
})
```

## 🎨 使用方法

### 方式 1：直接导入使用

```vue
<script setup>
// 从 Icônes 网站选择图标，格式：~icons/[图标集]/[图标名]
import IconDocument from '~icons/mdi/file-document-outline'
import IconEdit from '~icons/mdi/pencil-outline'
</script>

<template>
  <IconDocument />
  <IconEdit />
</template>
```

### 方式 2：使用统一图标管理

项目中已创建 `src/components/icons/index.js` 统一管理常用图标：

```vue
<script setup>
import { IconDocument, IconEdit } from '@/components/icons'
</script>

<template>
  <IconDocument />
  <IconEdit />
</template>
```

### 方式 3：动态导入

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

const IconDocument = defineAsyncComponent(() => 
  import('~icons/mdi/file-document-outline')
)
</script>

<template>
  <IconDocument />
</template>
```

## 🔍 查找图标

访问 [Icônes](https://icones.js.org/) 网站：

1. 搜索你需要的图标
2. 点击图标查看详情
3. 复制导入路径（已经包含 `~icons/` 前缀）
4. 在项目中直接使用

### 推荐图标集

- **Material Design Icons (mdi)**：最全面的图标集
- **Ionicons (ion)**：现代简洁的图标
- **Heroicons (heroicons)**：Tailwind 官方图标
- **Carbon (carbon)**：IBM 设计系统图标
- **Tabler Icons (tabler)**：简洁的线性图标

## 🎯 常用图标示例

```vue
<script setup>
// 文档类
import IconDocument from '~icons/mdi/file-document-outline'
import IconPdf from '~icons/mdi/file-pdf-box'
import IconExcel from '~icons/mdi/file-excel-outline'

// 编辑类
import IconEdit from '~icons/mdi/pencil-outline'
import IconCode from '~icons/mdi/code-braces'

// 工具类
import IconTools from '~icons/mdi/tools'
import IconSettings from '~icons/mdi/cog-outline'

// 媒体类
import IconVideo from '~icons/mdi/video-outline'
import IconImage from '~icons/mdi/image-outline'

// 数据类
import IconChart from '~icons/mdi/chart-line'
import IconTable from '~icons/mdi/table'

// 导航类
import IconHome from '~icons/mdi/home-outline'
import IconMenu from '~icons/mdi/menu'
import IconSearch from '~icons/mdi/magnify'
</script>
```

## 🎨 自定义样式

### 修改大小

```vue
<template>
  <!-- 使用 CSS -->
  <IconDocument style="font-size: 24px;" />
  
  <!-- 使用 class -->
  <IconDocument class="text-2xl" />
</template>

<style scoped>
.text-2xl {
  font-size: 24px;
}
</style>
```

### 修改颜色

```vue
<template>
  <!-- 使用 CSS -->
  <IconDocument style="color: #18a058;" />
  
  <!-- 使用 Tailwind -->
  <IconDocument class="text-green-500" />
</template>
```

### 修改其他属性

```vue
<template>
  <IconDocument 
    style="
      font-size: 32px;
      color: #18a058;
      cursor: pointer;
    "
    @click="handleClick"
  />
</template>
```

## 📝 项目中已替换的 Emoji

| 原 Emoji | 替换方案 | 位置 |
|----------|---------|------|
| 📄 文档 | 纯文本或 Naive UI 图标 | 导航菜单 |
| ✍️ 编辑 | 纯文本或 Naive UI 图标 | 导航菜单 |
| 📊 图表 | 纯文本或 Naive UI 图标 | 导航菜单 |
| 🎬 媒体 | 纯文本或 Naive UI 图标 | 导航菜单 |
| 🔧 工具 | 纯文本或 Naive UI 图标 | 导航菜单 |
| 🤖 AI | 纯文本或 Naive UI 图标 | 导航菜单 |
| ⚡ 高性能 | 纯文本 | 首页标签 |
| 🎨 现代UI | 纯文本 | 首页标签 |
| 📱 响应式 | 纯文本 | 首页标签 |
| 🚀 Vue 3 | 纯文本 | 首页标签 |
| 🖖/🍍/⚡等 | 文字缩写 (V/P/V...) | 技术栈展示 |

## 💡 最佳实践

### 1. 统一管理常用图标

在 `src/components/icons/index.js` 中统一导出：

```javascript
// 统一导入
export { default as IconDocument } from '~icons/mdi/file-document-outline'
export { default as IconEdit } from '~icons/mdi/pencil-outline'

// 在组件中使用
import { IconDocument, IconEdit } from '@/components/icons'
```

### 2. 按需导入

只导入需要的图标，避免打包体积过大：

```javascript
// ✅ 好的做法
import IconDocument from '~icons/mdi/file-document-outline'

// ❌ 避免这样做
import * as Icons from '~icons/mdi/*'
```

### 3. 语义化命名

使用有意义的变量名：

```javascript
// ✅ 好的做法
import IconUserProfile from '~icons/mdi/account-circle'

// ❌ 避免这样做
import Icon1 from '~icons/mdi/account-circle'
```

### 4. 组件封装

对于经常使用的图标，可以封装成组件：

```vue
<!-- components/AppIcon.vue -->
<script setup>
import { defineAsyncComponent, computed } from 'vue'

const props = defineProps({
  name: String,
  size: {
    type: String,
    default: '24px'
  },
  color: String
})

const IconComponent = computed(() => {
  return defineAsyncComponent(() => 
    import(`~icons/mdi/${props.name}`)
  )
})
</script>

<template>
  <component 
    :is="IconComponent" 
    :style="{ fontSize: size, color }"
  />
</template>
```

使用：

```vue
<AppIcon name="home-outline" size="32px" color="#18a058" />
```

## 🔗 资源链接

- [Icônes 图标搜索](https://icones.js.org/)
- [unplugin-icons 文档](https://github.com/antfu/unplugin-icons)
- [Material Design Icons](https://materialdesignicons.com/)
- [Iconify 图标集](https://icon-sets.iconify.design/)

## 🎉 总结

使用图标替代 emoji 的优势：

- ✅ 跨平台一致性
- ✅ 更专业的视觉效果
- ✅ 可自定义样式
- ✅ 更好的性能
- ✅ 更丰富的选择

现在您可以在项目中自由使用成千上万的高质量图标！

