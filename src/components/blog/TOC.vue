<template>
  <div :class="['toc-container', { 'fixed': isFixed }]">
    <div class="toc-header">
      <h4 class="toc-title">
        <n-icon :component="ListOutline" />
        目录
      </h4>
      <n-button 
        v-if="tocItems.length > 0"
        text
        size="tiny"
        @click="toggleCollapse"
      >
        <n-icon :component="isCollapsed ? ChevronDownOutline : ChevronUpOutline" />
      </n-button>
    </div>

    <div v-show="!isCollapsed" class="toc-content">
      <div 
        v-for="(item, index) in tocItems" 
        :key="index"
        :class="['toc-item', `level-${item.level}`, { 'active': activeId === item.id }]"
        :style="{ paddingLeft: `${(item.level - 1) * 16}px` }"
        @click="scrollToHeading(item.id)"
      >
        <span class="toc-text">{{ item.text }}</span>
      </div>

      <!-- 空状态 -->
      <n-empty 
        v-if="tocItems.length === 0"
        description="暂无目录"
        size="small"
      />
    </div>

    <!-- 阅读进度条 -->
    <div v-if="showProgress" class="reading-progress">
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: `${readingProgress}%` }"
        />
      </div>
      <div class="progress-text">
        阅读进度: {{ readingProgress }}%
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { ListOutline, ChevronDownOutline, ChevronUpOutline } from '@vicons/ionicons5'
import { extractTOC } from '@/utils/markdown'

/**
 * @description 文章目录（TOC）组件
 * 自动生成文章目录，支持点击跳转，显示当前阅读位置
 */

const props = defineProps({
  // Markdown 内容
  content: {
    type: String,
    required: true
  },
  // 是否固定在侧边
  isFixed: {
    type: Boolean,
    default: false
  },
  // 是否显示阅读进度
  showProgress: {
    type: Boolean,
    default: true
  }
})

// 是否折叠
const isCollapsed = ref(false)

// 当前激活的标题ID
const activeId = ref('')

// 阅读进度（百分比）
const readingProgress = ref(0)

/**
 * @description 从 Markdown 提取目录
 */
const tocItems = computed(() => {
  if (!props.content) return []
  return extractTOC(props.content)
})

/**
 * @description 切换折叠状态
 */
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

/**
 * @description 滚动到指定标题
 */
const scrollToHeading = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    
    // 更新激活状态
    activeId.value = id
  }
}

/**
 * @description 更新激活的标题和阅读进度
 */
const updateActiveHeading = () => {
  // 计算阅读进度
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  readingProgress.value = Math.round((scrollTop / scrollHeight) * 100)

  // 查找当前可见的标题
  const headings = tocItems.value.map(item => {
    const element = document.getElementById(item.id)
    if (element) {
      const rect = element.getBoundingClientRect()
      return {
        id: item.id,
        top: rect.top
      }
    }
    return null
  }).filter(Boolean)

  // 找到第一个在视口顶部以下的标题
  const current = headings.find(h => h.top >= 0 && h.top <= 200)
  
  if (current) {
    activeId.value = current.id
  } else if (headings.length > 0) {
    // 如果没有找到，使用最后一个在视口上方的标题
    const aboveViewport = headings.filter(h => h.top < 0)
    if (aboveViewport.length > 0) {
      activeId.value = aboveViewport[aboveViewport.length - 1].id
    }
  }
}

// 节流函数
let throttleTimer = null
const throttledUpdateActiveHeading = () => {
  if (throttleTimer) return
  
  throttleTimer = setTimeout(() => {
    updateActiveHeading()
    throttleTimer = null
  }, 100)
}

// 生命周期
onMounted(() => {
  window.addEventListener('scroll', throttledUpdateActiveHeading)
  // 初始化
  setTimeout(updateActiveHeading, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledUpdateActiveHeading)
})

// 监听内容变化
watch(() => props.content, () => {
  setTimeout(updateActiveHeading, 100)
})
</script>

<style scoped>
.toc-container {
  width: 100%;
  background: var(--n-color);
  border: 1px solid var(--n-border-color);
  border-radius: 8px;
  padding: 16px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.toc-container.fixed {
  position: sticky;
  top: 80px;
}

.toc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--n-border-color);
}

.toc-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--n-title-text-color);
}

.toc-title .n-icon {
  font-size: 18px;
}

.toc-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.toc-item {
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 2px solid transparent;
  position: relative;
}

.toc-item:hover {
  background: var(--n-color-hover);
  border-left-color: #18a058;
}

.toc-item.active {
  background: var(--n-color-hover);
  border-left-color: #18a058;
  font-weight: 600;
}

.toc-item.active .toc-text {
  color: #18a058;
}

.toc-text {
  font-size: 14px;
  color: var(--n-text-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
}

/* 不同级别的标题缩进 */
.toc-item.level-1 {
  font-size: 14px;
}

.toc-item.level-2 {
  font-size: 13px;
  opacity: 0.9;
}

.toc-item.level-3 {
  font-size: 12px;
  opacity: 0.8;
}

.toc-item.level-4,
.toc-item.level-5,
.toc-item.level-6 {
  font-size: 12px;
  opacity: 0.7;
}

.reading-progress {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--n-border-color);
}

.progress-bar {
  height: 4px;
  background: var(--n-border-color);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #18a058 0%, #36ad6a 100%);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  color: var(--n-text-color);
  opacity: 0.6;
  text-align: center;
}

/* 自定义滚动条 */
.toc-container::-webkit-scrollbar {
  width: 6px;
}

.toc-container::-webkit-scrollbar-track {
  background: transparent;
}

.toc-container::-webkit-scrollbar-thumb {
  background: var(--n-border-color);
  border-radius: 3px;
}

.toc-container::-webkit-scrollbar-thumb:hover {
  background: var(--n-scrollbar-color);
}

/* 响应式 */
@media (max-width: 1200px) {
  .toc-container.fixed {
    position: static;
    max-height: none;
  }
}
</style>
