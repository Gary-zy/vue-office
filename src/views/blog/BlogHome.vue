<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="blog-home">
      <n-layout>
        <!-- 头部 Banner -->
        <n-layout-header class="blog-header">
          <div class="banner-container">
            <div class="banner-content">
              <h1 class="banner-title">
                <n-gradient-text type="primary">
                  技术博客
                </n-gradient-text>
              </h1>
              <p class="banner-subtitle">
                记录技术成长，分享开发经验
              </p>
              <div class="banner-stats">
                <div class="stat-item">
                  <div class="stat-value">{{ articles.length }}</div>
                  <div class="stat-label">文章</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ categories.length }}</div>
                  <div class="stat-label">分类</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ tags.length }}</div>
                  <div class="stat-label">标签</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ totalViews }}</div>
                  <div class="stat-label">浏览量</div>
                </div>
              </div>
            </div>
          </div>
        </n-layout-header>

        <!-- 主内容区 -->
        <n-layout-content class="blog-content">
          <div class="content-container">
            <n-grid :cols="24" :x-gap="24" :y-gap="24" responsive="screen">
              <!-- 左侧：文章列表 -->
              <n-grid-item :span="24" :lg-span="17">
                <!-- 搜索栏 -->
                <div class="search-section">
                  <SearchBar />
                </div>

                <!-- 推荐文章轮播 -->
                <div v-if="featuredArticles.length > 0" class="featured-section">
                  <n-carousel autoplay show-arrow>
                    <div 
                      v-for="article in featuredArticles"
                      :key="article.id"
                      class="carousel-item"
                      @click="goToArticle(article.id)"
                    >
                      <img :src="article.cover" :alt="article.title" />
                      <div class="carousel-overlay">
                        <div class="carousel-content">
                          <n-tag type="warning" size="small">精选</n-tag>
                          <h2 class="carousel-title">{{ article.title }}</h2>
                          <p class="carousel-summary">{{ article.summary }}</p>
                        </div>
                      </div>
                    </div>
                  </n-carousel>
                </div>

                <!-- 文章列表 -->
                <div class="articles-section">
                  <ArticleList :loading="loading" />
                </div>
              </n-grid-item>

              <!-- 右侧：侧边栏 -->
              <n-grid-item :span="24" :lg-span="7">
                <n-space vertical :size="24">
                  <!-- 作者信息卡片 -->
                  <n-card class="author-card">
                    <n-space vertical align="center">
                      <n-avatar 
                        :src="userInfo.avatar"
                        :size="80"
                        round
                      />
                      <div class="author-info">
                        <h3 class="author-name">{{ userInfo.nickname }}</h3>
                        <p class="author-bio">{{ userInfo.bio }}</p>
                      </div>
                      <n-space>
                        <n-button text @click="openLink(userInfo.github)">
                          <template #icon>
                            <n-icon :component="LogoGithub" />
                          </template>
                          GitHub
                        </n-button>
                        <n-button text @click="openLink(userInfo.website)">
                          <template #icon>
                            <n-icon :component="GlobeOutline" />
                          </template>
                          网站
                        </n-button>
                      </n-space>
                    </n-space>
                  </n-card>

                  <!-- 分类导航 -->
                  <n-card title="文章分类">
                    <CategoryNav />
                  </n-card>

                  <!-- 热门文章 -->
                  <n-card title="热门文章">
                    <n-space vertical :size="12">
                      <div 
                        v-for="(article, index) in popularArticles.slice(0, 5)"
                        :key="article.id"
                        class="popular-item"
                        @click="goToArticle(article.id)"
                      >
                        <div class="popular-index" :class="`rank-${index + 1}`">
                          {{ index + 1 }}
                        </div>
                        <div class="popular-info">
                          <div class="popular-title">{{ article.title }}</div>
                          <div class="popular-stats">
                            <n-icon :component="EyeOutline" size="14" />
                            {{ article.views }}
                          </div>
                        </div>
                      </div>
                    </n-space>
                  </n-card>

                  <!-- 标签云 -->
                  <n-card title="标签云">
                    <TagCloud :limit="20" />
                  </n-card>
                </n-space>
              </n-grid-item>
            </n-grid>
          </div>
        </n-layout-content>
      </n-layout>
    </div>
  </n-config-provider>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { darkTheme } from 'naive-ui'
import { useBlogStore } from '@/stores/blog'
import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@/stores/user'
import ArticleList from '@/components/blog/ArticleList.vue'
import SearchBar from '@/components/blog/SearchBar.vue'
import CategoryNav from '@/components/blog/CategoryNav.vue'
import TagCloud from '@/components/blog/TagCloud.vue'
import { LogoGithub, GlobeOutline, EyeOutline } from '@vicons/ionicons5'

/**
 * @description 博客首页
 * 展示文章列表、推荐文章、热门文章、分类、标签等
 */

const router = useRouter()
const blogStore = useBlogStore()
const themeStore = useThemeStore()
const userStore = useUserStore()

// 加载状态
const loading = ref(true)

// 主题
const isDark = computed(() => themeStore.isDark)

// 用户信息
const userInfo = computed(() => userStore.userInfo)

// 文章数据
const articles = computed(() => blogStore.articles)
const categories = computed(() => blogStore.categories)
const tags = computed(() => blogStore.tags)

// 推荐文章（精选）
const featuredArticles = computed(() => {
  return articles.value.filter(a => a.isFeatured).slice(0, 5)
})

// 热门文章
const popularArticles = computed(() => blogStore.popularArticles)

// 总浏览量
const totalViews = computed(() => {
  return articles.value.reduce((sum, article) => sum + article.views, 0)
})

/**
 * @description 跳转到文章详情
 */
const goToArticle = (articleId) => {
  router.push(`/blog/article/${articleId}`)
}

/**
 * @description 打开外部链接
 */
const openLink = (url) => {
  window.open(url, '_blank')
}

// 初始化
onMounted(async () => {
  // 初始化博客数据
  await blogStore.initBlogData()
  loading.value = false
})
</script>

<style scoped>
.blog-home {
  min-height: 100vh;
  background: var(--n-color);
}

.blog-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0;
}

.banner-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 24px;
}

.banner-content {
  text-align: center;
}

.banner-title {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: white;
}

.banner-subtitle {
  font-size: 20px;
  margin: 0 0 40px 0;
  opacity: 0.9;
}

.banner-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.8;
}

.blog-content {
  padding: 40px 0;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.search-section {
  margin-bottom: 32px;
}

.featured-section {
  margin-bottom: 32px;
  border-radius: 12px;
  overflow: hidden;
}

.carousel-item {
  position: relative;
  height: 400px;
  cursor: pointer;
  overflow: hidden;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.carousel-item:hover img {
  transform: scale(1.05);
}

.carousel-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 40px;
}

.carousel-content {
  max-width: 800px;
}

.carousel-title {
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.carousel-summary {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.articles-section {
  margin-bottom: 32px;
}

.author-card {
  text-align: center;
}

.author-info {
  text-align: center;
}

.author-name {
  font-size: 20px;
  font-weight: 600;
  margin: 8px 0;
  color: var(--n-text-color);
}

.author-bio {
  font-size: 14px;
  color: var(--n-text-color);
  opacity: 0.7;
  margin: 0;
}

.popular-item {
  display: flex;
  gap: 12px;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.popular-item:hover {
  background: var(--n-color-hover);
  transform: translateX(4px);
}

.popular-index {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: white;
  background: var(--n-color-target);
}

.popular-index.rank-1 {
  background: #ff6b6b;
}

.popular-index.rank-2 {
  background: #ffa000;
}

.popular-index.rank-3 {
  background: #ffd43b;
  color: #333;
}

.popular-info {
  flex: 1;
  min-width: 0;
}

.popular-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--n-text-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  margin-bottom: 4px;
}

.popular-stats {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--n-text-color);
  opacity: 0.6;
}

/* 响应式 */
@media (max-width: 768px) {
  .banner-title {
    font-size: 32px;
  }

  .banner-subtitle {
    font-size: 16px;
  }

  .banner-stats {
    gap: 24px;
  }

  .stat-value {
    font-size: 24px;
  }

  .carousel-item {
    height: 280px;
  }

  .carousel-title {
    font-size: 20px;
  }

  .carousel-summary {
    font-size: 14px;
  }
}
</style>
