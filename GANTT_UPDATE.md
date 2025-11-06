# 甘特图库升级说明

## 📅 更新日期
2025-11-06

## 🎯 更新概述

将甘特图从 `frappe-gantt` 升级到 `vue-ganttastic`，这是一个更专业、更现代、专为 Vue 3 设计的甘特图库。

---

## 📦 新旧库对比

### Frappe Gantt（旧）
- ✅ 轻量级
- ✅ 简单易用
- ❌ 样式较基础
- ❌ Vue 集成不够原生
- ❌ 功能相对简单

### Vue Ganttastic（新）
- ✅ 专为 Vue 3 设计
- ✅ 更现代的 UI 设计
- ✅ 更好的 Vue 响应式支持
- ✅ 更丰富的功能
- ✅ 更好的可定制性
- ✅ 更专业的视觉效果

---

## 🚀 新功能特性

### 1. 更专业的视图
- ✅ 日视图 - 精确到天的时间轴
- ✅ 周视图 - 按周显示（默认）
- ✅ 月视图 - 按月显示

### 2. 增强的交互
- ✅ 任务拖拽调整
- ✅ 任务大小调整
- ✅ 任务点击事件
- ✅ 任务更新回调

### 3. 更好的视觉效果
- ✅ 现代化的进度条样式
- ✅ 平滑的动画过渡
- ✅ 悬停效果
- ✅ 可自定义颜色和样式

### 4. Vue 3 原生支持
- ✅ 完整的响应式支持
- ✅ Composition API 友好
- ✅ 更好的 TypeScript 支持

---

## 📝 API 变更

### 任务数据格式

**旧格式（frappe-gantt）：**
```javascript
{
  id: 'Task 1',
  name: '任务名称',
  start: '2024-01-01',
  end: '2024-01-10',
  progress: 80,
  dependencies: 'Task 2'
}
```

**新格式（vue-ganttastic）：**
```javascript
{
  id: 'Task 1',
  label: '任务名称',
  start: 1704067200000, // 时间戳（毫秒）
  duration: 7776000000, // 持续时间（毫秒）
  progress: 0.8, // 0-1 之间的进度值
  dependencies: ['Task 2'] // 依赖任务数组
}
```

### 组件使用

**旧用法：**
```vue
<div ref="ganttContainer"></div>

<script>
import Gantt from 'frappe-gantt'

const gantt = new Gantt(ganttContainer.value, tasks.value, {
  view_mode: 'Day',
  language: 'zh'
})
</script>
```

**新用法：**
```vue
<GanttChart
  :tasks="ganttTasks"
  :view-mode="currentView"
  :bar-start="barStart"
  :bar-end="barEnd"
  :row-height="40"
  :column-width="50"
/>

<script>
import GanttChart from 'vue-ganttastic'

const ganttTasks = computed(() => {
  return tasks.value.map(task => ({
    id: task.id,
    label: task.name,
    start: dateToTimestamp(task.start),
    duration: calculateDuration(task.start, task.end),
    progress: task.progress / 100,
    dependencies: task.dependencies ? task.dependencies.split(',') : []
  }))
})
</script>
```

---

## 🔧 主要改进

### 1. 数据结构转换

添加了自动转换函数，将表格数据格式转换为甘特图需要的格式：

```javascript
const ganttTasks = computed(() => {
  return tasks.value.map(task => ({
    id: task.id,
    label: task.name,
    start: dateToTimestamp(task.start), // 日期字符串转时间戳
    duration: calculateDuration(task.start, task.end), // 计算持续时间
    progress: task.progress / 100, // 百分比转小数
    dependencies: task.dependencies 
      ? task.dependencies.split(',').map(d => d.trim()) 
      : []
  }))
})
```

### 2. 时间范围计算

自动计算甘特图的时间范围：

```javascript
const barStart = computed(() => {
  const startDates = tasks.value.map(t => new Date(t.start).getTime())
  return Math.min(...startDates) - 7 * 24 * 60 * 60 * 1000 // 提前7天
})

const barEnd = computed(() => {
  const endDates = tasks.value.map(t => new Date(t.end).getTime())
  return Math.max(...endDates) + 7 * 24 * 60 * 60 * 1000 // 延后7天
})
```

### 3. 视图切换

```javascript
const changeView = (view) => {
  currentView.value = view // 'day' | 'week' | 'month'
  message.success(`已切换到${viewNames[view]}视图`)
}
```

### 4. 任务更新处理

```javascript
const handleTaskUpdate = (task) => {
  // 自动同步更新任务数据
  const taskIndex = tasks.value.findIndex(t => t.id === task.id)
  if (taskIndex !== -1) {
    tasks.value[taskIndex].start = formatDate(new Date(task.start))
    tasks.value[taskIndex].end = formatDate(new Date(task.start + task.duration))
    tasks.value[taskIndex].progress = Math.round(task.progress * 100)
  }
}
```

---

## 🎨 样式优化

### 自定义样式

```css
/* vue-ganttastic 样式优化 */
:deep(.gantt-chart) {
  font-family: inherit;
}

:deep(.gantt-chart .bar) {
  border-radius: 4px;
  transition: all 0.2s;
}

:deep(.gantt-chart .bar:hover) {
  opacity: 0.8;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

:deep(.gantt-chart .bar-progress) {
  border-radius: 4px 0 0 4px;
}
```

---

## 📊 功能对比

| 功能 | Frappe Gantt | Vue Ganttastic |
|------|--------------|----------------|
| Vue 3 支持 | ⚠️ 需要手动集成 | ✅ 原生支持 |
| 响应式 | ⚠️ 需要手动处理 | ✅ 完整的响应式 |
| 样式定制 | ⚠️ 有限 | ✅ 高度可定制 |
| 拖拽调整 | ✅ | ✅ |
| 依赖关系 | ✅ | ✅ |
| 多视图 | ✅ | ✅ |
| TypeScript | ❌ | ✅ |
| 文档 | ⚠️ 一般 | ✅ 较好 |
| 维护状态 | ⚠️ 较少更新 | ✅ 活跃维护 |

---

## 🎯 使用建议

### 1. 任务数据准备

确保任务数据包含：
- `id` - 唯一标识
- `name` - 任务名称
- `start` - 开始日期（YYYY-MM-DD 格式）
- `end` - 结束日期（YYYY-MM-DD 格式）
- `progress` - 进度（0-100）
- `dependencies` - 依赖任务（逗号分隔的字符串）

### 2. 时间戳转换

vue-ganttastic 使用时间戳（毫秒），需要转换：

```javascript
const dateToTimestamp = (dateStr) => {
  return new Date(dateStr).getTime()
}

const calculateDuration = (start, end) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  return endDate.getTime() - startDate.getTime()
}
```

### 3. 进度值转换

vue-ganttastic 使用 0-1 之间的小数表示进度：

```javascript
progress: task.progress / 100 // 将 0-100 转换为 0-1
```

---

## 📚 相关资源

- **vue-ganttastic GitHub**: https://github.com/InfectoOne/vue-ganttastic
- **文档**: 查看 npm 包内的 README 或 GitHub 仓库

---

## 🎉 总结

升级到 `vue-ganttastic` 后：

1. ✅ **更专业的视觉效果** - 现代化的 UI 设计
2. ✅ **更好的 Vue 集成** - 原生 Vue 3 支持
3. ✅ **更丰富的功能** - 更多可定制选项
4. ✅ **更好的维护性** - 活跃的社区和维护

这个升级让甘特图工具更加专业和易用，非常适合项目管理和进度跟踪！

---

**更新完成！** 🎊

现在您拥有一个更专业、更现代的甘特图工具！

