<template>
  <n-card 
    :class="['article-card', { 'featured': article.isFeatured }]"
    hoverable
    @click="handleClick"
  >
    <!-- 封面图 -->
    <template #cover>
      <div class="article-cover">
        <img 
          :src="article.cover" 
          :alt="article.title"
          loading="lazy"
        />
        <!-- 置顶标记 -->
        <n-tag 
          v-if="article.isTop" 
          type="error" 
          size="small"
          class="top-badge"
        >
          置顶
        </n-tag>
        <!-- 分类标签 -->
        <n-tag 
          :color="{ color: getCategoryColor(article.category), textColor: '#fff' }"
          size="small"
          class="category-badge"
        >
          {{ getCategoryName(article.category) }}
        </n-tag>
      </div>
    </template>

    <!-- 文章内容 -->
    <div class="article-content">
      <!-- 标题 -->
      <h3 class="article-title">{{ article.title }}</h3>

      <!-- 摘要 -->
      <p class="article-summary">{{ article.summary }}</p>

      <!-- 标签 -->
      <div class="article-tags">
        <n-tag 
          v-for="tag in article.tags.slice(0, 3)" 
          :key="tag"
          size="small"
          :bordered="false"
          class="tag-item"
        >
          # {{ tag }}
        </n-tag>
        <n-tag 
          v-if="article.tags.length > 3" 
          size="small"
          :bordered="false"
          class="tag-item"
        >
          +{{ article.tags.length - 3 }}
        </n-tag>
      </div>

      <!-- 底部信息 -->
      <div class="article-footer">
        <!-- 作者信息 -->
        <div class="author-info">
          <n-avatar 
            :src="article.author.avatar" 
            :size="24"
            round
          />
          <span class="author-name">{{ article.author.name }}</span>
        </div>

        <!-- 统计信息 -->
        <div class="article-stats">
          <span class="stat-item">
            <n-icon :component="EyeOutline" />
            {{ formatNumber(article.views) }}
          </span>
          <span class="stat-item">
            <n-icon :component="HeartOutline" />
            {{ formatNumber(article.likes) }}
          </span>
          <span class="stat-item">
            <n-icon :component="ChatbubbleOutline" />
            {{ formatNumber(article.comments) }}
          </span>
        </div>
      </div>

      <!-- 发布时间 -->
      <div class="article-time">
        <n-icon :component="TimeOutline" size="14" />
        <span>{{ formatTime(article.publishTime) }}</span>
        <span class="reading-time">· {{ article.readingTime }} 分钟阅读</span>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import { EyeOutline, HeartOutline, ChatbubbleOutline, TimeOutline } from '@vicons/ionicons5'
import { formatFriendlyTime } from '@/utils/date'

/**
 * @description 文章卡片组件
 * 展示文章的封面、标题、摘要、标签、作者和统计信息
 */

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const blogStore = useBlogStore()

/**
 * @description 获取分类名称
 */
const getCategoryName = (categoryId) => {
  const category = blogStore.categories.find(c => c.id === categoryId)
  return category?.name || categoryId
}

/**
 * @description 获取分类颜色
 */
const getCategoryColor = (categoryId) => {
  const category = blogStore.categories.find(c => c.id === categoryId)
  return category?.color || '#1890ff'
}

/**
 * @description 格式化数字（大于1000显示为1k）
 */
const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num
}

/**
 * @description 格式化时间
 */
const formatTime = (time) => {
  return formatFriendlyTime(time)
}

/**
 * @description 点击卡片跳转到文章详情
 */
const handleClick = () => {
  router.push(`/blog/article/${props.article.id}`)
}
</script>

<style scoped>
.article-card {
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.article-card.featured {
  border: 2px solid #ffd43b;
}

.article-cover {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .article-cover img {
  transform: scale(1.05);
}

.top-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;
}

.category-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
}

.article-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
}

.article-title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 12px 0;
  color: var(--n-title-text-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-summary {
  font-size: 14px;
  line-height: 1.6;
  color: var(--n-text-color);
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag-item {
  font-size: 12px;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--n-border-color);
  margin-bottom: 12px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-name {
  font-size: 14px;
  color: var(--n-text-color);
  font-weight: 500;
}

.article-stats {
  display: flex;
  gap: 16px;
  align-items: center;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--n-text-color);
}

.stat-item .n-icon {
  font-size: 16px;
}

.article-time {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--n-text-color);
  opacity: 0.8;
}

.reading-time {
  color: var(--n-text-color);
  opacity: 0.6;
}

/* 响应式 */
@media (max-width: 768px) {
  .article-cover {
    height: 180px;
  }

  .article-title {
    font-size: 16px;
  }

  .article-stats {
    gap: 12px;
  }
}
</style>
