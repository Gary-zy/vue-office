<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="category-page">
      <n-layout>
        <n-layout-content class="category-content">
          <div class="content-container">
            <!-- 页面标题 -->
            <div v-if="category" class="page-header">
              <div 
                class="category-icon"
                :style="{ background: category.color }"
              >
                {{ category.icon }}
              </div>
              <div class="header-info">
                <h1 class="page-title">{{ category.name }}</h1>
                <p class="page-subtitle">{{ category.description }}</p>
                <div class="page-stats">
                  共 {{ filteredArticles.length }} 篇文章
                </div>
              </div>
            </div>

            <!-- 文章列表 -->
            <div v-if="filteredArticles.length > 0" class="articles-section">
              <ArticleList :initial-articles="filteredArticles" />
            </div>

            <!-- 空状态 -->
            <n-empty
              v-else
              description="该分类下暂无文章"
              size="large"
            >
              <template #extra>
                <n-button @click="$router.push('/blog')">
                  浏览所有文章
                </n-button>
              </template>
            </n-empty>

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
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { darkTheme } from 'naive-ui'
import { useBlogStore } from '@/stores/blog'
import { useThemeStore } from '@/stores/theme'
import ArticleList from '@/components/blog/ArticleList.vue'
import { ArrowBackOutline } from '@vicons/ionicons5'

/**
 * @description 分类页面
 * 展示指定分类下的所有文章
 */

const route = useRoute()
const blogStore = useBlogStore()
const themeStore = useThemeStore()

// 主题
const isDark = computed(() => themeStore.isDark)

// 分类ID
const categoryId = computed(() => route.params.id)

// 分类信息
const category = computed(() => {
  return blogStore.categories.find(c => c.id === categoryId.value)
})

// 筛选后的文章
const filteredArticles = computed(() => {
  return blogStore.articles.filter(a => a.category === categoryId.value)
})

// 初始化
onMounted(() => {
  if (category.value) {
    document.title = `${category.value.name} - 技术博客`
  }
})
</script>

<style scoped>
.category-page {
  min-height: 100vh;
  background: var(--n-color);
}

.category-content {
  padding: 40px 0;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-header {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 48px;
  padding: 32px;
  background: var(--n-color);
  border-radius: 16px;
  border: 1px solid var(--n-border-color);
}

.category-icon {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}

.header-info {
  flex: 1;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: var(--n-title-text-color);
}

.page-subtitle {
  font-size: 16px;
  line-height: 1.6;
  color: var(--n-text-color);
  opacity: 0.8;
  margin: 0 0 16px 0;
}

.page-stats {
  font-size: 14px;
  color: var(--n-text-color);
  opacity: 0.7;
}

.articles-section {
  margin-bottom: 48px;
}

.back-button {
  display: flex;
  justify-content: center;
}

/* 响应式 */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .page-title {
    font-size: 24px;
  }
}
</style>
