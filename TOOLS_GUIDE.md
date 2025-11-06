# 🛠️ 前端工具集使用指南

本项目集成了 **10+ 种**实用的前端开发工具，涵盖文档预览、编辑器、可视化、媒体等多个领域。

## 📦 工具清单

### 📄 文档预览工具 (4种)

#### 1. DOCX 预览
- **路由**: `/tools/preview/docx`
- **依赖**: `@vue-office/docx`
- **功能**: Word 文档在线预览

#### 2. Excel 预览
- **路由**: `/tools/preview/excel`
- **依赖**: `@vue-office/excel`
- **功能**: Excel 表格在线预览

#### 3. PDF 预览
- **路由**: `/tools/preview/pdf`
- **依赖**: `@vue-office/pdf`
- **功能**: PDF 文档在线预览

#### 4. PPTX 预览
- **路由**: `/tools/preview/pptx`
- **依赖**: `@vue-office/pptx`
- **功能**: PowerPoint 演示文稿在线预览

---

### ✍️ 编辑器工具 (3种)

#### 1. Markdown 编辑器
- **路由**: `/tools/editor/rich`
- **依赖**: 已内置（基于 markdown-it）
- **功能**: 
  - ✅ 实时 Markdown 编辑和预览
  - ✅ 代码语法高亮
  - ✅ 导出 Markdown 和 HTML
  - ✅ 字数统计

#### 2. WangEditor 富文本编辑器
- **路由**: `/tools/editor/wang`
- **依赖**: `@wangeditor/editor` `@wangeditor/editor-for-vue`
- **安装**: 
```bash
npm install @wangeditor/editor @wangeditor/editor-for-vue
```
- **功能**:
  - 所见即所得编辑
  - 丰富的工具栏
  - 图片上传
  - 表格支持
  - 代码块
- **官方文档**: https://www.wangeditor.com/

#### 3. Vditor Markdown 编辑器
- **路由**: `/tools/editor/vditor`
- **依赖**: `vditor`
- **安装**:
```bash
npm install vditor
```
- **功能**:
  - 三种编辑模式：所见即所得、即时渲染、分屏预览
  - 完整的 Markdown 语法支持
  - 数学公式 (LaTeX)
  - 流程图、时序图、甘特图
  - 代码高亮
  - 主题切换
- **官方文档**: https://b3log.org/vditor/

---

### 📊 可视化工具 (2种)

#### 1. 甘特图项目管理
- **路由**: `/tools/gantt`
- **推荐依赖**: `frappe-gantt` 或 `dhtmlx-gantt`
- **安装**:
```bash
# 轻量级方案
npm install frappe-gantt

# 或功能更强大的方案
npm install dhtmlx-gantt
```
- **功能**:
  - 可视化项目进度
  - 任务依赖关系
  - 拖拽调整时间
  - 多种视图（日/周/月）
- **Frappe Gantt 文档**: https://frappe.io/gantt
- **DHTMLX Gantt 文档**: https://dhtmlx.com/docs/products/dhtmlxGantt/

#### 2. 地图工具
- **路由**: `/tools/map`
- **推荐依赖**: `@amap/amap-jsapi-loader` 或 `leaflet`
- **方案A - 高德地图**:
```bash
npm install @amap/amap-jsapi-loader
```
  - 适用于国内项目
  - 功能完善，文档齐全
  - 需要申请 API Key
  - 文档: https://lbs.amap.com/api/jsapi-v2/summary

- **方案B - Leaflet**:
```bash
npm install leaflet vue3-leaflet
```
  - 开源免费
  - 轻量级
  - 全球通用
  - 文档: https://leafletjs.com/

- **功能**:
  - 实时定位
  - 标记管理
  - 路径规划
  - 多种地图类型

---

### 🎬 媒体工具 (1种)

#### 视频播放器
- **路由**: `/tools/video`
- **推荐依赖**: `xgplayer` 或 `video.js`
- **方案A - 西瓜播放器 (推荐)**:
```bash
npm install xgplayer xgplayer-vue
```
  - 字节跳动开源
  - 功能强大
  - 扩展性好
  - 文档: https://h5player.bytedance.com/

- **方案B - Video.js**:
```bash
npm install video.js vue-video-player
```
  - 最流行的开源播放器
  - 插件生态丰富
  - 文档: https://videojs.com/

- **功能**:
  - 多格式支持 (MP4, WebM, HLS, FLV)
  - 清晰度切换
  - 倍速播放
  - 全屏模式
  - 画中画
  - 快捷键支持

---

## 🚀 快速集成指南

### 1. 文档预览工具（已集成）

文档预览工具已经完全集成，无需额外安装依赖，开箱即用！

### 2. Markdown 编辑器（已集成）

Markdown 编辑器已经完全集成，无需额外安装依赖，开箱即用！

### 3. WangEditor 富文本编辑器

**步骤 1：安装依赖**
```bash
npm install @wangeditor/editor @wangeditor/editor-for-vue
```

**步骤 2：修改页面文件**

打开 `src/views/tools/WangEditor.vue`，取消注释实际实现代码。

**步骤 3：使用示例**
```vue
<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { createEditor, createToolbar } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css'

const editorContainer = ref(null)
const toolbarContainer = ref(null)
let editor = null

onMounted(() => {
  editor = createEditor({
    selector: editorContainer.value,
    html: '<p>Hello World</p>',
    config: {
      placeholder: '请输入内容...'
    }
  })

  createToolbar({
    editor,
    selector: toolbarContainer.value
  })
})

onBeforeUnmount(() => {
  if (editor) {
    editor.destroy()
  }
})
</script>
```

### 4. Vditor 编辑器

**步骤 1：安装依赖**
```bash
npm install vditor
```

**步骤 2：修改页面文件**

打开 `src/views/tools/VditorEditor.vue`，取消注释实际实现代码。

**步骤 3：使用示例**
```vue
<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

const vditorContainer = ref(null)
let vditor = null

onMounted(() => {
  vditor = new Vditor(vditorContainer.value, {
    height: 600,
    mode: 'wysiwyg',
    placeholder: '请输入内容...',
    after: () => {
      vditor.setValue('# Hello Vditor')
    }
  })
})

onBeforeUnmount(() => {
  if (vditor) {
    vditor.destroy()
  }
})
</script>
```

### 5. 甘特图（Frappe Gantt）

**已安装依赖：**
```bash
npm install frappe-gantt
```

**功能特性：**
- ✅ 日/周/月视图切换
- ✅ 任务拖拽调整
- ✅ 任务依赖关系
- ✅ 进度显示
- ✅ 添加新任务
- ✅ 自动日期更新（基于当前日期）

**日期问题已修复：**

之前使用的是固定的 2024 年日期，现已更新为动态计算：
- 任务日期自动基于当前日期生成
- 使用 `getDateAfter(days)` 函数计算相对日期
- 确保甘特图始终显示相关的时间范围

**使用示例**
```javascript
import Gantt from 'frappe-gantt'

// 动态日期计算
const today = new Date()
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const tasks = [
  {
    id: 'Task 1',
    name: '需求分析',
    start: formatDate(today),
    end: formatDate(new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000)),
    progress: 100,
    dependencies: ''
  }
]

const gantt = new Gantt('#gantt-container', tasks, {
  view_mode: 'Day',
  language: 'zh',
  bar_height: 30,
  bar_corner_radius: 3,
  arrow_curve: 5,
  padding: 18,
  date_format: 'YYYY-MM-DD',
  on_click: (task) => {
    console.log('Task clicked:', task)
  },
  on_date_change: (task, start, end) => {
    console.log('Date changed:', task, start, end)
  },
  on_progress_change: (task, progress) => {
    console.log('Progress changed:', task, progress)
  }
})
```

### 6. 地图导览工具（Leaflet + 博物馆导览）

本项目使用 Leaflet 实现地图导览系统，支持博物馆楼层导览、建筑标点、路线规划等功能。

**功能特性：**
- ✅ 多博物馆支持
- ✅ 楼层切换
- ✅ 建筑物标点
- ✅ 设施标记（洗手间、餐厅、商店等）
- ✅ 建筑详情展示
- ✅ 推荐游览路线
- ✅ 路线可视化

**已安装依赖：**
```bash
npm install leaflet
```

**Mock 数据结构：**

数据文件位于 `src/assets/mock/museum-data.json`

```json
{
  "museums": [
    {
      "id": "museum-1",
      "name": "故宫博物院",
      "center": [39.9163, 116.3972],
      "zoom": 17,
      "floors": [
        {
          "id": "floor-1",
          "name": "一层",
          "level": 1,
          "buildings": [
            {
              "id": "building-1",
              "name": "午门",
              "type": "entrance",
              "position": [39.9163, 116.3905],
              "description": "故宫的正门",
              "image": "图片URL",
              "openTime": "8:30-17:00",
              "exhibits": ["展品1", "展品2"]
            }
          ]
        }
      ],
      "facilities": [
        {
          "id": "facility-1",
          "name": "游客中心",
          "type": "info",
          "position": [39.9150, 116.3905],
          "icon": "info"
        }
      ]
    }
  ],
  "routes": [
    {
      "id": "route-1",
      "name": "故宫经典路线",
      "museum": "museum-1",
      "description": "游览故宫主要景点的推荐路线",
      "duration": "3-4小时",
      "points": ["building-1", "building-2"]
    }
  ]
}
```

**建筑类型：**
- `entrance`: 入口
- `exhibition`: 展厅
- `shop`: 商店
- `restaurant`: 餐厅

**设施类型：**
- `info`: 游客中心
- `restroom`: 洗手间
- `restaurant`: 餐厅
- `shop`: 商店
- `cafe`: 咖啡厅
- `entrance`: 入口

**使用说明：**

1. 在左侧边栏选择博物馆
2. 选择要查看的楼层
3. 点击建筑物标记查看详情
4. 查看推荐路线并开始导览

**自定义数据：**

编辑 `src/assets/mock/museum-data.json`，添加自己的博物馆数据：

```json
{
  "id": "my-museum",
  "name": "我的博物馆",
  "description": "博物馆描述",
  "center": [纬度, 经度],
  "zoom": 17,
  "floors": [...],
  "facilities": [...]
}
```

### 7. 视频播放器（xgplayer 示例）

**步骤 1：安装依赖**
```bash
npm install xgplayer xgplayer-vue
```

**步骤 2：使用示例**
```vue
<template>
  <div id="player-container"></div>
</template>

<script setup>
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'

onMounted(() => {
  const player = new Player({
    id: 'player-container',
    url: 'https://example.com/video.mp4',
    width: '100%',
    height: '500px'
  })
})
</script>
```

---

## 📝 开发建议

### 选择工具的建议

1. **编辑器选择**:
   - 需要简单的 Markdown 编辑 → 使用内置的 Markdown 编辑器
   - 需要富文本编辑 → 使用 WangEditor
   - 需要专业的 Markdown 编辑体验 → 使用 Vditor

2. **地图选择**:
   - 国内项目 → 高德地图
   - 国际项目 → Leaflet + OpenStreetMap

3. **视频播放器选择**:
   - 需要完整功能和良好体验 → xgplayer
   - 需要插件生态 → Video.js

### 按需加载

为了优化项目体积，建议只安装你实际需要的工具库。

例如，如果只需要文档预览和 Markdown 编辑器，就无需安装其他编辑器和可视化库。

---

## 🔧 故障排除

### 常见问题

**Q: 安装依赖后工具不显示？**
A: 需要在对应的 Vue 文件中取消注释实现代码。

**Q: 地图不显示？**
A: 检查是否正确配置了 API Key。

**Q: 编辑器样式错乱？**
A: 确保正确导入了 CSS 文件。

---

## 📚 更多资源

- [WangEditor 官方文档](https://www.wangeditor.com/)
- [Vditor 官方文档](https://b3log.org/vditor/)
- [Frappe Gantt GitHub](https://github.com/frappe/gantt)
- [高德地图 API 文档](https://lbs.amap.com/)
- [Leaflet 文档](https://leafletjs.com/)
- [xgplayer 文档](https://h5player.bytedance.com/)
- [Video.js 文档](https://videojs.com/)

---

## 💡 贡献指南

欢迎提交 PR 添加更多实用工具！

建议添加的工具：
- 代码格式化工具 (Prettier)
- JSON 格式化工具
- 图片压缩工具
- 颜色选择器
- Base64 编解码
- 正则表达式测试器

---

<div align="center">

**Happy Coding! 🎉**

</div>

