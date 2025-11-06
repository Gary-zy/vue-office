<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="gantt-chart-page">
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
import { ref, computed, h, onMounted, watch, nextTick } from 'vue'
import { darkTheme, useMessage, NProgress } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import Gantt from 'frappe-gantt'
import { 
  CalendarOutline,
  AddOutline,
  CheckmarkCircleOutline,
  RefreshOutline
} from '@vicons/ionicons5'

/**
 * @description 甘特图页面 - 使用 frappe-gantt（优化版）
 */

const message = useMessage()
const themeStore = useThemeStore()

// 主题
const isDark = computed(() => themeStore.isDark)

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
  if (!ganttContainer.value) return

  // 清除旧实例
  if (gantt) {
    ganttContainer.value.innerHTML = ''
  }

  try {
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
  if (gantt) {
    gantt.change_view_mode(view)
    const viewNames = {
      Day: '日',
      Week: '周',
      Month: '月'
    }
    message.success(`已切换到${viewNames[view]}视图`)
  }
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
    nextTick(() => {
      if (gantt) {
        initGantt()
      }
    })
  }
)

onMounted(() => {
  nextTick(() => {
    initGantt()
  })
})
</script>

<style>
/* Frappe Gantt 基础样式 */
.gantt-container {
  line-height: 14.5px;
  position: relative;
  overflow: auto;
  font-size: 12px;
  height: 100%;
  width: 100%;
  border-radius: 8px;
}

.gantt {
  user-select: none;
  -webkit-user-select: none;
  position: absolute;
}

.gantt .grid-background {
  fill: none;
}

.gantt .grid-row {
  fill: var(--n-color, #fdfdfd);
}

.gantt .row-line {
  stroke: var(--n-border-color, #ebeff2);
}

.gantt .tick {
  stroke: var(--n-border-color, #f3f3f3);
  stroke-width: 0.4;
}

.gantt .tick.thick {
  stroke: var(--n-border-color, #ededed);
  stroke-width: 0.7;
}

.gantt .arrow {
  fill: none;
  stroke: #18a058;
  stroke-width: 1.5;
}

.gantt .bar-wrapper .bar {
  fill: #18a058;
  stroke: #18a058;
  stroke-width: 0;
  transition: stroke-width 0.3s ease;
  rx: 4;
}

.gantt .bar-wrapper:hover .bar {
  fill: #36ad6a;
  filter: brightness(1.1);
}

.gantt .bar-progress {
  fill: #52c41a;
  rx: 4;
}

.gantt .bar-label {
  fill: #fff;
  dominant-baseline: central;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 13px;
  font-weight: 500;
}

.gantt .grid-header {
  height: 50px;
  background-color: var(--n-color, #fff);
  position: sticky;
  top: 0;
  left: 0;
  border-bottom: 1px solid var(--n-border-color, #c7c7c7);
  z-index: 1000;
}

.gantt .upper-text,
.gantt .lower-text {
  fill: var(--n-text-color, #171717);
  font-size: 12px;
  font-weight: 500;
}

.gantt .current-highlight {
  position: absolute;
  background: #18a058;
  width: 1px;
  z-index: 999;
}
</style>

<style scoped>
.gantt-chart-page {
  min-height: 100vh;
  background: var(--n-color);
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
  color: var(--n-title-text-color);
}

.page-title .n-icon {
  font-size: 36px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--n-text-color);
  opacity: 0.7;
  margin: 0;
}

.gantt-wrapper {
  width: 100%;
  overflow: auto;
  border: 1px solid var(--n-border-color);
  border-radius: 8px;
  background: var(--n-color);
}

.gantt-container {
  min-height: 500px;
  position: relative;
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
