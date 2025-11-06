<template>
  <div class="tag-cloud">
    <div class="tag-cloud-header">
      <h3 class="tag-cloud-title">
        <n-icon :component="PricetagsOutline" />
        标签云
      </h3>
      <n-button 
        v-if="showViewAll"
        text
        size="small"
        @click="handleViewAll"
      >
        查看全部
      </n-button>
    </div>

    <div class="tag-cloud-content">
      <n-tag
        v-for="tag in displayTags"
        :key="tag.name"
        :size="getTagSize(tag.count)"
        :type="getTagType(tag.count)"
        :bordered="false"
        class="cloud-tag"
        :style="{ fontSize: getTagFontSize(tag.count) }"
        @click="handleTagClick(tag.name)"
      >
        # {{ tag.name }}
        <span class="tag-count">({{ tag.count }})</span>
      </n-tag>
    </div>

    <!-- 空状态 -->
    <n-empty 
      v-if="displayTags.length === 0"
      description="暂无标签"
      size="small"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import { PricetagsOutline } from '@vicons/ionicons5'

/**
 * @description 标签云组件
 * 以云状形式展示所有标签，标签大小根据使用频率动态调整
 */

const props = defineProps({
  // 最多显示的标签数量
  limit: {
    type: Number,
    default: 30
  },
  // 是否显示"查看全部"按钮
  showViewAll: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['tag-click', 'view-all'])

const router = useRouter()
const blogStore = useBlogStore()

/**
 * @description 标签统计数据
 */
const tagStats = computed(() => {
  const stats = blogStore.tagStats
  return Object.entries(stats)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

/**
 * @description 显示的标签列表
 */
const displayTags = computed(() => {
  return tagStats.value.slice(0, props.limit)
})

/**
 * @description 获取最大和最小的标签数量（用于计算大小）
 */
const tagCountRange = computed(() => {
  if (displayTags.value.length === 0) {
    return { min: 0, max: 0 }
  }
  const counts = displayTags.value.map(t => t.count)
  return {
    min: Math.min(...counts),
    max: Math.max(...counts)
  }
})

/**
 * @description 根据标签数量获取标签大小
 */
const getTagSize = (count) => {
  const { min, max } = tagCountRange.value
  if (max === min) return 'medium'
  
  const ratio = (count - min) / (max - min)
  
  if (ratio > 0.7) return 'large'
  if (ratio > 0.4) return 'medium'
  return 'small'
}

/**
 * @description 根据标签数量获取字体大小
 */
const getTagFontSize = (count) => {
  const { min, max } = tagCountRange.value
  if (max === min) return '14px'
  
  const ratio = (count - min) / (max - min)
  const size = 12 + ratio * 8 // 12px - 20px
  
  return `${size}px`
}

/**
 * @description 根据标签数量获取标签类型（颜色）
 */
const getTagType = (count) => {
  const { min, max } = tagCountRange.value
  if (max === min) return 'default'
  
  const ratio = (count - min) / (max - min)
  
  if (ratio > 0.8) return 'error'
  if (ratio > 0.6) return 'warning'
  if (ratio > 0.4) return 'info'
  if (ratio > 0.2) return 'success'
  return 'default'
}

/**
 * @description 点击标签
 */
const handleTagClick = (tagName) => {
  // 添加标签到筛选条件
  blogStore.addTag(tagName)
  
  // 触发事件
  emit('tag-click', tagName)
  
  // 跳转到博客首页（如果不在）
  if (router.currentRoute.value.path !== '/blog') {
    router.push('/blog')
  }
}

/**
 * @description 查看全部标签
 */
const handleViewAll = () => {
  emit('view-all')
  router.push('/blog/tags')
}
</script>

<style scoped>
.tag-cloud {
  width: 100%;
}

.tag-cloud-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.tag-cloud-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--n-title-text-color);
}

.tag-cloud-title .n-icon {
  font-size: 20px;
}

.tag-cloud-content {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: flex-start;
}

.cloud-tag {
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.cloud-tag:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.tag-count {
  margin-left: 4px;
  font-size: 0.85em;
  opacity: 0.7;
}

/* 动画效果 */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.cloud-tag {
  animation: float 3s ease-in-out infinite;
}

.cloud-tag:nth-child(2n) {
  animation-delay: 0.5s;
}

.cloud-tag:nth-child(3n) {
  animation-delay: 1s;
}

.cloud-tag:nth-child(4n) {
  animation-delay: 1.5s;
}
</style>
