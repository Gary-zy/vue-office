<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="home-page">
      <!-- Hero 区域 -->
      <section class="hero-section">
        <div class="hero-container">
          <n-space vertical :size="32" align="center">
            <h1 class="hero-title">
              <n-gradient-text type="primary">
                技术博客 & 文档预览
              </n-gradient-text>
              <span class="hero-subtitle-block">一站式前端展示平台</span>
            </h1>
            
            <p class="hero-description">
              记录技术成长，分享开发经验，支持多种文档格式在线预览
            </p>

            <!-- 特性标签 -->
            <n-space justify="center" wrap :size="12">
              <n-tag type="success" size="large">⚡ 高性能</n-tag>
              <n-tag type="info" size="large">🎨 现代UI</n-tag>
              <n-tag type="warning" size="large">📱 响应式</n-tag>
              <n-tag type="error" size="large">🚀 Vue 3</n-tag>
            </n-space>

            <!-- 行动按钮 -->
            <n-space :size="20">
              <n-button 
                type="primary" 
                size="large"
                @click="$router.push('/blog')"
              >
                <template #icon>
                  <n-icon :component="BookOutline" />
                </template>
                浏览博客
              </n-button>
              <n-button 
                size="large"
                @click="$router.push('/docx-preview')"
              >
                <template #icon>
                  <n-icon :component="DocumentTextOutline" />
                </template>
                文档预览
              </n-button>
            </n-space>

            <!-- 统计数据 -->
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-value">{{ articles.length }}</div>
                <div class="stat-label">技术文章</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-value">{{ categories.length }}</div>
                <div class="stat-label">文章分类</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-value">4</div>
                <div class="stat-label">文档格式</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-value">{{ totalViews }}</div>
                <div class="stat-label">总浏览量</div>
              </div>
            </div>
          </n-space>
        </div>
      </section>

      <!-- 主要功能区域 -->
      <section class="features-section">
        <div class="container">
          <n-grid :cols="2" :x-gap="32" :y-gap="32" responsive="screen">
            <!-- 技术博客模块 -->
            <n-grid-item :span="2" :md-span="1">
              <n-card 
                class="feature-card blog-card"
                hoverable
                @click="$router.push('/blog')"
              >
                <n-space vertical :size="20">
                  <div class="feature-icon blog-icon">
                    <n-icon :component="BookOutline" size="48" />
                  </div>
                  <h2 class="feature-title">技术博客</h2>
                  <p class="feature-description">
                    记录前端开发经验，分享 Vue、React、JavaScript、TypeScript 等技术文章
                  </p>
                  
                  <!-- 最新文章 -->
                  <div v-if="latestArticles.length > 0" class="latest-articles">
                    <n-divider style="margin: 12px 0" />
                    <div class="articles-preview">
                      <div 
                        v-for="article in latestArticles.slice(0, 3)"
                        :key="article.id"
                        class="article-preview-item"
                        @click.stop="goToArticle(article.id)"
                      >
                        <div class="article-preview-title">{{ article.title }}</div>
                        <div class="article-preview-meta">
                          <n-icon :component="TimeOutline" size="14" />
                          {{ formatTime(article.publishTime) }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <n-button type="primary" block size="large">
                    查看所有文章
                  </n-button>
                </n-space>
              </n-card>
            </n-grid-item>

            <!-- 文档预览模块 -->
            <n-grid-item :span="2" :md-span="1">
              <n-card 
                class="feature-card preview-card"
                hoverable
                @click="$router.push('/docx-preview')"
              >
                <n-space vertical :size="20">
                  <div class="feature-icon preview-icon">
                    <n-icon :component="DocumentTextOutline" size="48" />
                  </div>
                  <h2 class="feature-title">文档预览</h2>
                  <p class="feature-description">
                    支持 DOCX、Excel、PDF、PPTX 等多种格式的在线预览，无需下载即可查看
                  </p>

                  <!-- 支持的格式 -->
                  <div class="formats-preview">
                    <n-divider style="margin: 12px 0" />
                    <n-space :size="12" justify="center">
                      <n-tag 
                        v-for="format in previewFormats"
                        :key="format.name"
                        size="medium"
                        :bordered="false"
                        @click.stop="$router.push(format.route)"
                      >
                        {{ format.icon }} {{ format.name }}
                      </n-tag>
                    </n-space>
                  </div>

                  <n-button type="info" block size="large">
                    立即体验预览
                  </n-button>
                </n-space>
              </n-card>
            </n-grid-item>
          </n-grid>
        </div>
      </section>

      <!-- 技术栈展示 -->
      <section class="tech-stack-section">
        <div class="container">
          <h2 class="section-title">技术栈</h2>
          <p class="section-subtitle">基于现代化前端技术构建</p>

          <n-grid :cols="6" :x-gap="24" :y-gap="24" responsive="screen">
            <n-grid-item 
              v-for="tech in techStack"
              :key="tech.name"
              :span="2"
              :xs-span="3"
              :s-span="3"
            >
              <n-card 
                class="tech-card"
                :style="{ borderColor: tech.color }"
              >
                <n-space vertical align="center" :size="12">
                  <div 
                    class="tech-icon"
                    :style="{ background: tech.color }"
                  >
                    {{ tech.icon }}
                  </div>
                  <div class="tech-name">{{ tech.name }}</div>
                  <div class="tech-version">{{ tech.version }}</div>
                </n-space>
              </n-card>
            </n-grid-item>
          </n-grid>
        </div>
      </section>

      <!-- CTA 区域 -->
      <section class="cta-section">
        <div class="container">
          <n-card class="cta-card">
            <n-space vertical :size="24" align="center">
              <h2 class="cta-title">开始探索</h2>
              <p class="cta-description">
                立即访问技术博客或体验文档预览功能
              </p>
              <n-space :size="20">
                <n-button 
                  type="primary" 
                  size="large"
                  @click="$router.push('/blog')"
                >
                  访问博客
                </n-button>
                <n-button 
                  size="large"
                  @click="$router.push('/about')"
                >
                  了解更多
                </n-button>
              </n-space>
            </n-space>
          </n-card>
        </div>
      </section>
    </div>
  </n-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { darkTheme } from 'naive-ui'
import { useBlogStore } from '@/stores/blog'
import { useThemeStore } from '@/stores/theme'
import { formatFriendlyTime } from '@/utils/date'
import { 
  BookOutline, 
  DocumentTextOutline, 
  TimeOutline
} from '@vicons/ionicons5'

/**
 * @description 平台首页
 * 展示博客和文档预览两大功能模块
 */

const router = useRouter()
const blogStore = useBlogStore()
const themeStore = useThemeStore()

// 主题
const isDark = computed(() => themeStore.isDark)

// 博客数据
const articles = computed(() => blogStore.articles)
const categories = computed(() => blogStore.categories)
const latestArticles = computed(() => blogStore.latestArticles)
const totalViews = computed(() => {
  return articles.value.reduce((sum, a) => sum + a.views, 0)
})

// 文档预览格式
const previewFormats = [
  { name: 'DOCX', icon: '📄', route: '/docx-preview' },
  { name: 'Excel', icon: '📊', route: '/excel-preview' },
  { name: 'PDF', icon: '📕', route: '/pdf-preview' },
  { name: 'PPTX', icon: '📽️', route: '/pptx-preview' }
]

// 技术栈
const techStack = [
  { name: 'Vue 3', version: 'v3.5', icon: '🖖', color: '#42b883' },
  { name: 'Pinia', version: 'v2.x', icon: '🍍', color: '#ffd859' },
  { name: 'Vite', version: 'v7.x', icon: '⚡', color: '#646cff' },
  { name: 'Naive UI', version: 'v2.x', icon: '🎨', color: '#18a058' },
  { name: 'TypeScript', version: 'Ready', icon: '🔷', color: '#3178c6' },
  { name: 'Tailwind', version: 'v4.x', icon: '🎯', color: '#38bdf8' }
]

/**
 * @description 格式化时间
 */
const formatTime = (time) => {
  return formatFriendlyTime(time)
}

/**
 * @description 跳转到文章详情
 */
const goToArticle = (articleId) => {
  router.push(`/blog/article/${articleId}`)
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: var(--n-color);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 100px 24px;
  color: white;
  text-align: center;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-title {
  font-size: 56px;
  font-weight: 900;
  line-height: 1.2;
  margin: 0;
}

.hero-subtitle-block {
  display: block;
  font-size: 32px;
  margin-top: 12px;
  opacity: 0.9;
}

.hero-description {
  font-size: 20px;
  line-height: 1.6;
  margin: 0;
  opacity: 0.95;
  max-width: 700px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  margin-top: 32px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.8;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
}

/* Features Section */
.features-section {
  padding: 80px 24px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.blog-card:hover {
  border-color: #18a058;
}

.preview-card:hover {
  border-color: #2080f0;
}

.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.blog-icon {
  background: linear-gradient(135deg, #18a058 0%, #36ad6a 100%);
  color: white;
}

.preview-icon {
  background: linear-gradient(135deg, #2080f0 0%, #40a9ff 100%);
  color: white;
}

.feature-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: var(--n-title-text-color);
}

.feature-description {
  font-size: 15px;
  line-height: 1.6;
  color: var(--n-text-color);
  opacity: 0.8;
  margin: 0;
}

.latest-articles {
  width: 100%;
}

.articles-preview {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-preview-item {
  padding: 10px;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.article-preview-item:hover {
  background: var(--n-color-hover);
}

.article-preview-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--n-text-color);
  margin-bottom: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-preview-meta {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--n-text-color);
  opacity: 0.6;
}

.formats-preview {
  width: 100%;
}

/* Tech Stack Section */
.tech-stack-section {
  padding: 80px 24px;
  background: var(--n-color-hover);
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 12px 0;
  color: var(--n-title-text-color);
}

.section-subtitle {
  font-size: 16px;
  text-align: center;
  color: var(--n-text-color);
  opacity: 0.7;
  margin: 0 0 48px 0;
}

.tech-card {
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.tech-card:hover {
  transform: translateY(-4px);
}

.tech-icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 0 auto;
}

.tech-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--n-title-text-color);
}

.tech-version {
  font-size: 12px;
  color: var(--n-text-color);
  opacity: 0.6;
}

/* CTA Section */
.cta-section {
  padding: 80px 24px;
}

.cta-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  text-align: center;
}

.cta-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  color: white;
}

.cta-description {
  font-size: 16px;
  color: white;
  opacity: 0.9;
  margin: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle-block {
    font-size: 24px;
  }

  .hero-description {
    font-size: 16px;
  }

  .stat-value {
    font-size: 28px;
  }

  .hero-stats {
    gap: 20px;
  }

  .stat-divider {
    display: none;
  }

  .features-section,
  .tech-stack-section,
  .cta-section {
    padding: 48px 24px;
  }

  .section-title {
    font-size: 28px;
  }
}
</style>
