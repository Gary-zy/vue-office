<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="archive-page">
      <n-layout>
        <n-layout-content class="archive-content">
          <div class="content-container">
            <!-- 页面标题 -->
            <div class="page-header">
              <h1 class="page-title">
                <n-icon :component="ArchiveOutline" />
                文章归档
              </h1>
              <p class="page-subtitle">
                共 {{ articles.length }} 篇文章
              </p>
            </div>

            <!-- 归档列表 -->
            <div class="archive-list">
              <n-timeline>
                <n-timeline-item
                  v-for="(group, year) in groupedArticles"
                  :key="year"
                  type="success"
                  :title="`${year} 年`"
                >
                  <template #icon>
                    <n-icon :component="TimeOutline" />
                  </template>

                  <div class="year-group">
                    <div class="year-header">
                      <span class="year-count">{{ group.length }} 篇文章</span>
                    </div>

                    <n-list>
                      <n-list-item
                        v-for="article in group"
                        :key="article.id"
                        class="archive-item"
                        @click="goToArticle(article.id)"
                      >
                        <div class="article-info">
                          <div class="article-date">
                            {{ formatDate(article.publishTime, 'MM-DD') }}
                          </div>
                          <div class="article-content">
                            <h3 class="article-title">{{ article.title }}</h3>
                            <p class="article-summary">{{ article.summary }}</p>
                            <div class="article-meta">
                              <n-space :size="12">
                                <n-tag 
                                  :color="{ color: getCategoryColor(article.category), textColor: '#fff' }"
                                  size="small"
                                >
                                  {{ getCategoryName(article.category) }}
                                </n-tag>
                                <span class="meta-item">
                                  <n-icon :component="EyeOutline" size="14" />
                                  {{ article.views }}
                                </span>
                                <span class="meta-item">
                                  <n-icon :component="HeartOutline" size="14" />
                                  {{ article.likes }}
                                </span>
                              </n-space>
                            </div>
                          </div>
                        </div>
                      </n-list-item>
                    </n-list>
                  </div>
                </n-timeline-item>
              </n-timeline>
            </div>

            <!-- 返回按钮 -->
            <div class="back-button">
              <n-button @click="$router.push('/blog')">
                <template #icon>
                  <n-icon :component="ArrowBackOutline" />
                </template>
                返回博客首页
              </n-button>
            </div>
          </div>
        </n-layout-content>
      </n-layout>
    </div>
  </n-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { darkTheme } from 'naive-ui'
import { useBlogStore } from '@/stores/blog'
import { useThemeStore } from '@/stores/theme'
import { groupByYear, formatDate } from '@/utils/date'
import { ArchiveOutline, TimeOutline, EyeOutline, HeartOutline, ArrowBackOutline } from '@vicons/ionicons5'

/**
 * @description 文章归档页面
 * 按年份分组展示所有文章
 */

const router = useRouter()
const blogStore = useBlogStore()
const themeStore = useThemeStore()

// 主题
const isDark = computed(() => themeStore.isDark)

// 文章列表
const articles = computed(() => {
  return [...blogStore.articles].sort(
    (a, b) => new Date(b.publishTime) - new Date(a.publishTime)
  )
})

// 按年份分组
const groupedArticles = computed(() => {
  return groupByYear(articles.value, 'publishTime')
})

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
 * @description 跳转到文章详情
 */
const goToArticle = (articleId) => {
  router.push(`/blog/article/${articleId}`)
}
</script>

<style scoped>
.archive-page {
  min-height: 100vh;
  background: var(--n-color);
}

.archive-content {
  padding: 40px 0;
}

.content-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-header {
  text-align: center;
  margin-bottom: 48px;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: var(--n-title-text-color);
}

.page-title .n-icon {
  font-size: 40px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--n-text-color);
  opacity: 0.7;
  margin: 0;
}

.archive-list {
  margin-bottom: 48px;
}

.year-group {
  margin-top: 8px;
}

.year-header {
  margin-bottom: 16px;
}

.year-count {
  font-size: 14px;
  color: var(--n-text-color);
  opacity: 0.7;
}

.archive-item {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin-bottom: 12px;
}

.archive-item:hover {
  background: var(--n-color-hover);
  transform: translateX(4px);
}

.article-info {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  width: 100%;
}

.article-date {
  flex-shrink: 0;
  width: 60px;
  font-size: 18px;
  font-weight: 600;
  color: #18a058;
}

.article-content {
  flex: 1;
  min-width: 0;
}

.article-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--n-title-text-color);
}

.article-summary {
  font-size: 14px;
  line-height: 1.6;
  color: var(--n-text-color);
  opacity: 0.8;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  align-items: center;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--n-text-color);
  opacity: 0.7;
}

.back-button {
  display: flex;
  justify-content: center;
}

/* 响应式 */
@media (max-width: 768px) {
  .page-title {
    font-size: 28px;
  }

  .article-info {
    flex-direction: column;
    gap: 12px;
  }

  .article-date {
    width: auto;
  }
}
</style>
