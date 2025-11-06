<template>
  <n-config-provider :theme="darkTheme">
    <div class="gantt-chart-page dark-mode">
      <n-layout>
        <n-layout-content class="chart-content">
          <div class="content-container">
            <!-- 页面标题 -->
            <div class="page-header">
              <h1 class="page-title">
                <n-icon :component="CalendarOutline" />
                甘特图项目管理
              </h1>
              <p class="page-subtitle">
                可视化项目进度管理，支持任务拖拽、依赖关系等功能
              </p>
            </div>

            <!-- 甘特图卡片 -->
            <n-card>
              <n-space vertical :size="16">
                <!-- 工具栏 -->
                <n-space justify="space-between">
                  <n-space>
                    <n-button @click="changeView('Day')" :type="currentView === 'Day' ? 'primary' : 'default'">
                      <template #icon>
                        <n-icon :component="CalendarOutline" />
                      </template>
                      日视图
                    </n-button>
                    <n-button @click="changeView('Week')" :type="currentView === 'Week' ? 'primary' : 'default'">
                      <template #icon>
                        <n-icon :component="CalendarOutline" />
                      </template>
                      周视图
                    </n-button>
                    <n-button @click="changeView('Month')" :type="currentView === 'Month' ? 'primary' : 'default'">
                      <template #icon>
                        <n-icon :component="CalendarOutline" />
                      </template>
                      月视图
                    </n-button>
                  </n-space>
                  <n-space>
                    <n-button type="primary" @click="showAddTaskDialog">
                      <template #icon>
                        <n-icon :component="AddOutline" />
                      </template>
                      添加任务
                    </n-button>
                    <n-button @click="refreshGantt">
                      <template #icon>
                        <n-icon :component="RefreshOutline" />
                      </template>
                      刷新
                    </n-button>
                  </n-space>
                </n-space>

                <!-- 甘特图容器 -->
                <div class="gantt-wrapper">
                  <div ref="ganttContainer" class="gantt-container"></div>
                </div>
              </n-space>
            </n-card>

            <!-- 示例任务列表 -->
            <n-card title="任务列表" style="margin-top: 24px">
              <n-data-table
                :columns="columns"
                :data="tasks"
                :pagination="false"
              />
            </n-card>

            <!-- 功能说明 -->
            <n-card title="功能特性" style="margin-top: 24px">
              <n-grid :cols="2" :x-gap="24" :y-gap="16" responsive="screen">
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>可视化进度</template>
                    <template #description>
                      直观展示项目任务和进度，一目了然
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>任务依赖</template>
                    <template #description>
                      支持设置任务之间的依赖关系
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>拖拽调整</template>
                    <template #description>
                      支持拖拽调整任务时间和进度
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>多种视图</template>
                    <template #description>
                      支持日、周、月等多种时间视图
                    </template>
                  </n-thing>
                </n-grid-item>
              </n-grid>
            </n-card>
          </div>
        </n-layout-content>
      </n-layout>

      <!-- 添加任务对话框 -->
      <n-modal v-model:show="showDialog" preset="dialog" title="添加任务">
        <n-form>
          <n-form-item label="任务名称">
            <n-input v-model:value="newTask.name" placeholder="请输入任务名称" />
          </n-form-item>
          <n-form-item label="开始日期">
            <n-date-picker v-model:value="newTask.start" type="date" />
          </n-form-item>
          <n-form-item label="结束日期">
            <n-date-picker v-model:value="newTask.end" type="date" />
          </n-form-item>
          <n-form-item label="进度 (%)">
            <n-input-number v-model:value="newTask.progress" :min="0" :max="100" :step="5" style="width: 100%" />
          </n-form-item>
        </n-form>
        <template #action>
          <n-space>
            <n-button @click="showDialog = false">取消</n-button>
            <n-button type="primary" @click="addTask">确定</n-button>
          </n-space>
        </template>
      </n-modal>
    </div>
  </n-config-provider>
</template>

<script setup>
import { ref, h, onMounted, watch, nextTick } from 'vue'
import { darkTheme, useMessage, NProgress } from 'naive-ui'
import Gantt from 'frappe-gantt'
import { 
  CalendarOutline,
  AddOutline,
  CheckmarkCircleOutline,
  RefreshOutline
} from '@vicons/ionicons5'

/**
 * @description 甘特图页面 - 使用 frappe-gantt（深色主题）
 */

const message = useMessage()

// 甘特图容器和实例
const ganttContainer = ref(null)
let gantt = null

// 视图模式
const currentView = ref('Week')

// 对话框
const showDialog = ref(false)
const newTask = ref({
  name: '',
  start: null,
  end: null,
  progress: 0
})

// 获取当前日期并计算示例任务日期
const today = new Date()
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getDateAfter = (days) => {
  const date = new Date(today)
  date.setDate(date.getDate() + days)
  return formatDate(date)
}

// 示例任务数据
const tasks = ref([
  {
    id: 'Task 1',
    name: '需求分析',
    start: getDateAfter(0),
    end: getDateAfter(10),
    progress: 100,
    dependencies: ''
  },
  {
    id: 'Task 2',
    name: '系统设计',
    start: getDateAfter(8),
    end: getDateAfter(20),
    progress: 80,
    dependencies: 'Task 1'
  },
  {
    id: 'Task 3',
    name: '前端开发',
    start: getDateAfter(18),
    end: getDateAfter(46),
    progress: 60,
    dependencies: 'Task 2'
  },
  {
    id: 'Task 4',
    name: '后端开发',
    start: getDateAfter(18),
    end: getDateAfter(41),
    progress: 50,
    dependencies: 'Task 2'
  },
  {
    id: 'Task 5',
    name: '测试',
    start: getDateAfter(39),
    end: getDateAfter(56),
    progress: 20,
    dependencies: 'Task 3, Task 4'
  }
])

// 表格列定义
const columns = [
  {
    title: '任务名称',
    key: 'name',
    width: 200
  },
  {
    title: '开始日期',
    key: 'start',
    width: 120
  },
  {
    title: '结束日期',
    key: 'end',
    width: 120
  },
  {
    title: '进度',
    key: 'progress',
    width: 200,
    render: (row) => {
      return h(NProgress, {
        type: 'line',
        percentage: row.progress,
        indicatorPlacement: 'inside',
        processing: row.progress < 100
      })
    }
  },
  {
    title: '依赖',
    key: 'dependencies',
    width: 150
  }
]

/**
 * @description 初始化甘特图
 */
const initGantt = () => {
  if (!ganttContainer.value) {
    console.warn('甘特图容器未找到')
    return
  }

  try {
    // 完全清除旧实例和 DOM
    if (gantt) {
      // 销毁旧实例
      gantt = null
    }
    
    // 清空容器内容
    ganttContainer.value.innerHTML = ''
    
    // 等待 DOM 更新
    setTimeout(() => {
      if (!ganttContainer.value) return
      
      // 创建新实例
      gantt = new Gantt(ganttContainer.value, tasks.value, {
        view_mode: currentView.value,
        language: 'zh',
        bar_height: 35,
        bar_corner_radius: 4,
        arrow_curve: 5,
        padding: 20,
        date_format: 'YYYY-MM-DD',
        header_height: 50,
        column_width: 30,
        step: 24,
        custom_popup_html: null, // 禁用默认弹窗，避免 DOM 问题
        on_click: (task) => {
          message.info(`点击了任务：${task.name}`)
        },
        on_date_change: (task, start, end) => {
          const taskIndex = tasks.value.findIndex(t => t.id === task.id)
          if (taskIndex !== -1) {
            tasks.value[taskIndex].start = start.toISOString().split('T')[0]
            tasks.value[taskIndex].end = end.toISOString().split('T')[0]
            message.success(`任务 "${task.name}" 日期已更新`)
          }
        },
        on_progress_change: (task, progress) => {
          const taskIndex = tasks.value.findIndex(t => t.id === task.id)
          if (taskIndex !== -1) {
            tasks.value[taskIndex].progress = progress
            message.success(`任务 "${task.name}" 进度已更新为 ${progress}%`)
          }
        }
      })
    }, 100) // 延迟 100ms 确保 DOM 准备就绪
  } catch (error) {
    console.error('甘特图初始化失败:', error)
    message.error('甘特图初始化失败，请刷新页面重试')
  }
}

/**
 * @description 切换视图
 */
const changeView = (view) => {
  currentView.value = view
  
  // 重新初始化而不是切换视图，避免 DOM 问题
  nextTick(() => {
    initGantt()
    const viewNames = {
      Day: '日',
      Week: '周',
      Month: '月'
    }
    message.success(`已切换到${viewNames[view]}视图`)
  })
}

/**
 * @description 刷新甘特图
 */
const refreshGantt = () => {
  initGantt()
  message.success('甘特图已刷新')
}

/**
 * @description 显示添加任务对话框
 */
const showAddTaskDialog = () => {
  const defaultStart = new Date()
  const defaultEnd = new Date()
  defaultEnd.setDate(defaultEnd.getDate() + 7)
  
  newTask.value = {
    name: '',
    start: defaultStart.getTime(),
    end: defaultEnd.getTime(),
    progress: 0
  }
  showDialog.value = true
}

/**
 * @description 添加任务
 */
const addTask = () => {
  if (!newTask.value.name) {
    message.warning('请输入任务名称')
    return
  }

  const task = {
    id: `Task ${tasks.value.length + 1}`,
    name: newTask.value.name,
    start: formatDate(new Date(newTask.value.start)),
    end: formatDate(new Date(newTask.value.end)),
    progress: newTask.value.progress || 0,
    dependencies: ''
  }

  tasks.value.push(task)
  
  // 重新初始化甘特图
  nextTick(() => {
    initGantt()
  })
  
  message.success('任务已添加')
  showDialog.value = false
}

// 监听任务变化
watch(
  () => tasks.value.length,
  () => {
    // 任务数量变化时重新初始化
    setTimeout(() => {
      initGantt()
    }, 150)
  }
)

onMounted(() => {
  // 确保 DOM 完全渲染后再初始化
  setTimeout(() => {
    initGantt()
  }, 200)
})
</script>

<style>
/* Frappe Gantt 基础样式 - 深色主题优化 */
.gantt-container {
  line-height: 14.5px;
  position: relative;
  overflow: auto;
  font-size: 13px;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.4);
}

.gantt {
  user-select: none;
  -webkit-user-select: none;
  position: absolute;
}

/* 网格背景 - 更清晰的对比 */
.gantt .grid-background {
  fill: rgba(20, 20, 20, 0.8);
}

.gantt .grid-row {
  fill: rgba(255, 255, 255, 0.03);
}

.gantt .grid-row:nth-child(even) {
  fill: rgba(255, 255, 255, 0.01);
}

.gantt .row-line {
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 0.5;
}

/* 时间刻度线 - 增强可见性 */
.gantt .tick {
  stroke: rgba(255, 255, 255, 0.08);
  stroke-width: 0.5;
}

.gantt .tick.thick {
  stroke: rgba(255, 255, 255, 0.15);
  stroke-width: 1;
}

/* 今日高亮线 */
.gantt .today-highlight {
  fill: rgba(0, 113, 227, 0.15);
  opacity: 0.3;
}

/* 依赖箭头 - 苹果蓝 */
.gantt .arrow {
  fill: none;
  stroke: #0071e3;
  stroke-width: 2;
  opacity: 0.8;
}

/* 任务条 - 苹果蓝渐变 */
.gantt .bar-wrapper .bar {
  fill: #0071e3;
  stroke: #0071e3;
  stroke-width: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  rx: 8;
  ry: 8;
  opacity: 0.9;
}

.gantt .bar-wrapper:hover .bar {
  fill: #0077ed;
  stroke: rgba(0, 119, 237, 0.6);
  stroke-width: 2;
  opacity: 1;
  filter: drop-shadow(0 4px 12px rgba(0, 113, 227, 0.4));
}

/* 任务进度条 - 亮蓝色 */
.gantt .bar-progress {
  fill: #00a8e3;
  rx: 8;
  ry: 8;
  opacity: 0.85;
}

/* 任务标签文字 */
.gantt .bar-label {
  fill: #fff;
  dominant-baseline: central;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 13px;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.gantt .bar-label.big {
  font-size: 14px;
  font-weight: 600;
}

/* 表头区域 - 毛玻璃效果 */
.gantt .grid-header {
  height: 50px;
  background: rgba(29, 29, 31, 0.95);
  backdrop-filter: blur(30px) saturate(180%);
  position: sticky;
  top: 0;
  left: 0;
  border-bottom: 2px solid rgba(0, 113, 227, 0.3);
  z-index: 1000;
}

/* 表头文字 - 增强对比度 */
.gantt .upper-text {
  fill: #f5f5f7;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.gantt .lower-text {
  fill: #86868b;
  font-size: 11px;
  font-weight: 600;
}

/* 当前时间线 */
.gantt .current-highlight {
  position: absolute;
  background: linear-gradient(90deg, transparent, #0071e3, transparent);
  width: 3px;
  z-index: 999;
  opacity: 0.8;
  box-shadow: 0 0 10px rgba(0, 113, 227, 0.6);
}

/* 任务详情弹出框 */
.gantt .popup-wrapper {
  background: rgba(29, 29, 31, 0.98);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
}

.gantt .popup-wrapper .title {
  color: #f5f5f7;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 8px;
}

.gantt .popup-wrapper .subtitle {
  color: #86868b;
  font-size: 12px;
}

/* 任务手柄（拖拽点） */
.gantt .handle {
  fill: rgba(255, 255, 255, 0.9);
  cursor: ew-resize;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.gantt .bar-wrapper:hover .handle {
  opacity: 1;
}

.gantt .handle.left {
  rx: 3;
}

.gantt .handle.right {
  rx: 3;
}

/* 任务详情文字 */
.gantt .details-container {
  color: #f5f5f7;
  font-size: 13px;
}
</style>

<style scoped>
/* 深色主题样式 */
.gantt-chart-page {
  min-height: 100vh;
  background: #000;
}

.gantt-chart-page.dark-mode {
  background: #000;
  color: #f5f5f7;
}

.chart-content {
  padding: 40px 0;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #f5f5f7;
}

.page-title .n-icon {
  font-size: 36px;
  color: #0071e3;
}

.page-subtitle {
  font-size: 16px;
  color: #86868b;
  margin: 0;
}

.gantt-wrapper {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  background: rgba(10, 10, 10, 0.6);
  backdrop-filter: blur(30px) saturate(180%);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.gantt-container {
  min-height: 550px;
  position: relative;
  padding: 8px;
}

/* 滚动条样式 - 苹果风格 */
.gantt-wrapper::-webkit-scrollbar {
  height: 12px;
}

.gantt-wrapper::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
}

.gantt-wrapper::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  transition: background 0.2s ease;
}

.gantt-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* 响应式 */
@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .gantt-container {
    min-height: 400px;
  }
}
</style>
