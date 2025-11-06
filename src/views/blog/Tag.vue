<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="tag-page">
      <n-layout>
        <n-layout-content class="tag-content">
          <div class="content-container">
            <!-- 页面标题 -->
            <div class="page-header">
              <div class="tag-icon">
                <n-icon :component="PricetagOutline" size="48" />
              </div>
              <div class="header-info">
                <h1 class="page-title"># {{ tagName }}</h1>
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
              description="该标签下暂无文章"
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
import { PricetagOutline, ArrowBackOutline } from '@vicons/ionicons5'

/**
 * @description 标签页面
 * 展示指定标签下的所有文章
 */

const route = useRoute()
const blogStore = useBlogStore()
const themeStore = useThemeStore()

// 主题
const isDark = computed(() => themeStore.isDark)

// 标签名称
const tagName = computed(() => decodeURIComponent(route.params.id))

// 筛选后的文章
const filteredArticles = computed(() => {
  return blogStore.articles.filter(a => a.tags.includes(tagName.value))
})

// 初始化
onMounted(() => {
  document.title = `${tagName.value} - 技术博客`
})
</script>

<style scoped>
.tag-page {
  min-height: 100vh;
  background: var(--n-color);
}

.tag-content {
  padding: 40px 0;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 48px;
  padding: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
}

.tag-icon {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-info {
  flex: 1;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: white;
}

.page-stats {
  font-size: 14px;
  color: white;
  opacity: 0.9;
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
    font-size: 28px;
  }
}
</style>
