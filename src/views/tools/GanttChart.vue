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
                    <n-button @click="changeView('Day')">
                      <template #icon>
                        <n-icon :component="CalendarOutline" />
                      </template>
                      日视图
                    </n-button>
                    <n-button @click="changeView('Week')">
                      <template #icon>
                        <n-icon :component="CalendarOutline" />
                      </template>
                      周视图
                    </n-button>
                    <n-button @click="changeView('Month')">
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
import { ref, computed, h, onMounted } from 'vue'
import { darkTheme, useMessage, NProgress } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import Gantt from 'frappe-gantt'
import { 
  CalendarOutline,
  AddOutline,
  CheckmarkCircleOutline
} from '@vicons/ionicons5'

/**
 * @description 甘特图页面
 */

const message = useMessage()
const themeStore = useThemeStore()

// 主题
const isDark = computed(() => themeStore.isDark)

// 甘特图容器
const ganttContainer = ref(null)
let gantt = null

// 对话框
const showDialog = ref(false)
const newTask = ref({
  name: '',
  start: null,
  end: null
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

  gantt = new Gantt(ganttContainer.value, tasks.value, {
    view_mode: 'Day',
    language: 'zh',
    bar_height: 30,
    bar_corner_radius: 3,
    arrow_curve: 5,
    padding: 18,
    date_format: 'YYYY-MM-DD',
    on_click: (task) => {
      console.log('Task clicked:', task)
      message.info(`点击了任务：${task.name}`)
    },
    on_date_change: (task, start, end) => {
      console.log('Date changed:', task, start, end)
      // 更新任务数据
      const taskIndex = tasks.value.findIndex(t => t.id === task.id)
      if (taskIndex !== -1) {
        tasks.value[taskIndex].start = start.toISOString().split('T')[0]
        tasks.value[taskIndex].end = end.toISOString().split('T')[0]
      }
    },
    on_progress_change: (task, progress) => {
      console.log('Progress changed:', task, progress)
      // 更新进度
      const taskIndex = tasks.value.findIndex(t => t.id === task.id)
      if (taskIndex !== -1) {
        tasks.value[taskIndex].progress = progress
      }
    }
  })
}

/**
 * @description 切换视图
 */
const changeView = (view) => {
  if (gantt) {
    gantt.change_view_mode(view)
    message.success(`已切换到${view === 'Day' ? '日' : view === 'Week' ? '周' : '月'}视图`)
  }
}

/**
 * @description 显示添加任务对话框
 */
const showAddTaskDialog = () => {
  newTask.value = {
    name: '',
    start: Date.now(),
    end: Date.now() + 7 * 24 * 60 * 60 * 1000
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
    start: new Date(newTask.value.start).toISOString().split('T')[0],
    end: new Date(newTask.value.end).toISOString().split('T')[0],
    progress: 0,
    dependencies: ''
  }

  tasks.value.push(task)
  
  // 重新初始化甘特图
  gantt.refresh(tasks.value)
  
  message.success('任务已添加')
  showDialog.value = false
}

onMounted(() => {
  initGantt()
})
</script>

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
}

.gantt-container {
  min-height: 400px;
}

/* Frappe Gantt 样式优化 */
.gantt-container :deep(.gantt) {
  overflow: visible;
}

.gantt-container :deep(.bar) {
  fill: #18a058;
}

.gantt-container :deep(.bar-progress) {
  fill: #36ad6a;
}

/* 响应式 */
@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }
}
</style>
