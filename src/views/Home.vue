<template>
  <div class="home-page">
    <!-- Hero Section - 超大标题区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text" data-aos="fade-up">
          <h1 class="hero-title">
            技术博客 & 前端工具
          </h1>
          <p class="hero-subtitle">
            一站式前端技术展示平台
          </p>
          <p class="hero-description">
            记录技术成长 · 分享开发经验 · 提供实用工具
          </p>
          
          <div class="hero-actions">
            <n-button 
              type="primary" 
              size="large" 
              round
              @click="$router.push('/blog')"
              class="hero-button hero-button-primary"
            >
              <template #icon>
                <n-icon :component="BookOutline" />
              </template>
              探索博客
            </n-button>
            <n-button 
              size="large" 
              round
              quaternary
              @click="$router.push('/tools/preview/docx')"
              class="hero-button hero-button-secondary"
            >
              <template #icon>
                <n-icon :component="HammerOutline" />
              </template>
              体验工具
            </n-button>
          </div>
        </div>
        
        <!-- 滚动提示 -->
        <div class="scroll-indicator" data-aos="fade-up" data-aos-delay="800">
          <div class="scroll-icon">
            <div class="scroll-wheel"></div>
          </div>
          <span class="scroll-text">向下滚动探索更多</span>
        </div>
      </div>
      
      <!-- 背景装饰 -->
      <div class="hero-bg">
        <div class="hero-gradient"></div>
        <div class="hero-pattern"></div>
      </div>
    </section>

    <!-- Features Section - 特性展示 -->
    <section class="features-section" data-aos="fade-up">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">核心功能</h2>
          <p class="section-subtitle">强大的功能，优雅的体验</p>
        </div>

        <div class="features-grid">
          <!-- 博客功能卡片 -->
          <div class="feature-card" data-aos="fade-up" data-aos-delay="100">
            <div class="feature-card-inner" @click="$router.push('/blog')">
              <div class="feature-icon-wrapper">
                <div class="feature-icon blog-icon">
                  <n-icon :component="BookOutline" size="48" />
                </div>
              </div>
              <h3 class="feature-title">技术博客</h3>
              <p class="feature-description">
                分享前端技术、开发经验和学习心得
              </p>
              <div class="feature-stats">
                <div class="stat-item">
                  <span class="stat-value">{{ postsCount }}+</span>
                  <span class="stat-label">文章</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ totalViews }}+</span>
                  <span class="stat-label">阅读</span>
                </div>
              </div>
              <div class="feature-arrow">
                <n-icon :component="ArrowForwardOutline" />
              </div>
            </div>
          </div>

          <!-- 工具功能卡片 -->
          <div class="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div class="feature-card-inner" @click="$router.push('/tools/preview/docx')">
              <div class="feature-icon-wrapper">
                <div class="feature-icon tools-icon">
                  <n-icon :component="HammerOutline" size="48" />
                </div>
              </div>
              <h3 class="feature-title">前端工具</h3>
              <p class="feature-description">
                实用的前端开发工具集，提升开发效率
              </p>
              <div class="feature-stats">
                <div class="stat-item">
                  <span class="stat-value">{{ toolsCount }}+</span>
                  <span class="stat-label">工具</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">7</span>
                  <span class="stat-label">分类</span>
                </div>
              </div>
              <div class="feature-arrow">
                <n-icon :component="ArrowForwardOutline" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tools Showcase - 工具展示 -->
    <section class="tools-section" data-aos="fade-up">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">工具集合</h2>
          <p class="section-subtitle">覆盖多个场景的实用工具</p>
        </div>

        <div class="tools-categories">
          <div 
            v-for="(category, index) in toolCategories" 
            :key="category.name"
            class="tool-category"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="category-header">
              <div class="category-icon">
                <n-icon :component="category.icon" size="32" />
              </div>
              <h3 class="category-title">{{ category.name }}</h3>
            </div>
            <div class="category-tools">
              <div 
                v-for="tool in category.tools" 
                :key="tool.name"
                class="tool-item"
                @click="$router.push(tool.path)"
              >
                <span class="tool-name">{{ tool.name }}</span>
                <n-icon :component="ArrowForwardOutline" class="tool-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack - 技术栈 -->
    <section class="tech-section" data-aos="fade-up">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">技术栈</h2>
          <p class="section-subtitle">基于现代化前端技术构建</p>
        </div>

        <div class="tech-grid">
          <div 
            v-for="(tech, index) in techStack" 
            :key="tech.name"
            class="tech-card"
            data-aos="zoom-in"
            :data-aos-delay="index * 50"
            :style="{ '--tech-color': tech.color }"
          >
            <div class="tech-logo">{{ tech.icon }}</div>
            <div class="tech-info">
              <div class="tech-name">{{ tech.name }}</div>
              <div class="tech-version">{{ tech.version }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section - 行动召唤 -->
    <section class="cta-section" data-aos="fade-up">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">开始你的探索之旅</h2>
          <p class="cta-subtitle">立即体验强大的功能和工具</p>
          <div class="cta-actions">
            <n-button 
              type="primary" 
              size="large" 
              round
              @click="$router.push('/blog')"
              class="cta-button"
            >
              立即开始
            </n-button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <p class="footer-text">
            Built with ❤️ using Vue 3 · Vite · Naive UI
          </p>
          <p class="footer-copyright">
            © 2025 技术博客 & 前端工具. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBlogStore } from '@/stores/blog'
import { 
  BookOutline, 
  HammerOutline,
  DocumentTextOutline,
  CreateOutline,
  CalendarOutline,
  MapOutline,
  VideocamOutline,
  CodeSlashOutline,
  BulbOutline,
  ArrowForwardOutline
} from '@vicons/ionicons5'

// AOS 动画库
import AOS from 'aos'
import 'aos/dist/aos.css'

const blogStore = useBlogStore()

// 统计数据
const articles = computed(() => blogStore.articles)
const latestArticles = computed(() => blogStore.latestArticles)
const postsCount = computed(() => 12)
const totalViews = computed(() => {
  return articles.value.reduce((sum, a) => sum + a.views, 0)
})
const toolsCount = computed(() => 14)

// 工具分类
const toolCategories = [
  {
    name: '文档预览',
    icon: DocumentTextOutline,
    tools: [
      { name: 'DOCX 预览', path: '/tools/preview/docx' },
      { name: 'Excel 预览', path: '/tools/preview/excel' },
      { name: 'PDF 预览', path: '/tools/preview/pdf' },
      { name: 'PPTX 预览', path: '/tools/preview/pptx' }
    ]
  },
  {
    name: '编辑器工具',
    icon: CreateOutline,
    tools: [
      { name: 'Markdown 编辑器', path: '/tools/editor/rich' },
      { name: 'WangEditor', path: '/tools/editor/wang' },
      { name: 'Vditor 编辑器', path: '/tools/editor/vditor' }
    ]
  },
  {
    name: '可视化工具',
    icon: CalendarOutline,
    tools: [
      { name: '甘特图', path: '/tools/gantt' },
      { name: '地图工具', path: '/tools/map' },
      { name: '室内导览', path: '/tools/indoor-guide' }
    ]
  },
  {
    name: '媒体工具',
    icon: VideocamOutline,
    tools: [
      { name: '视频播放器', path: '/tools/video' }
    ]
  },
  {
    name: '开发工具',
    icon: CodeSlashOutline,
    tools: [
      { name: 'JSON 格式化', path: '/tools/json' },
      { name: '条形码生成', path: '/tools/barcode' }
    ]
  },
  {
    name: 'AI 工具',
    icon: BulbOutline,
    tools: [
      { name: 'AI 对话助手', path: '/tools/ai-chat' }
    ]
  }
]

// 技术栈
const techStack = [
  { name: 'Vue 3', version: 'v3.5', icon: 'V', color: '#42b883' },
  { name: 'Pinia', version: 'v2.x', icon: 'P', color: '#ffd859' },
  { name: 'Vite', version: 'v7.x', icon: 'V', color: '#646cff' },
  { name: 'Naive UI', version: 'v2.x', icon: 'N', color: '#18a058' },
  { name: 'TypeScript', version: 'Ready', icon: 'TS', color: '#3178c6' },
  { name: 'Tailwind', version: 'v4.x', icon: 'TW', color: '#38bdf8' }
]

onMounted(() => {
  // 初始化 AOS 动画
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
  })
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #000;
  color: #f5f5f7;
}

/* Hero Section - 苹果风格 */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #000;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at center, rgba(29, 78, 216, 0.15), transparent 70%),
              radial-gradient(ellipse at 80% 50%, rgba(139, 92, 246, 0.15), transparent 70%);
}

.hero-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: patternMove 20s linear infinite;
}

@keyframes patternMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 24px;
  max-width: 980px;
  margin: 0 auto;
}

.hero-text {
  margin-bottom: 80px;
}

.hero-title {
  font-size: clamp(48px, 7vw, 96px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0 0 24px 0;
  background: linear-gradient(135deg, #fff 0%, #d1d5db 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleFadeIn 1.2s ease-out;
}

@keyframes titleFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-subtitle {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin: 0 0 16px 0;
  color: #86868b;
  animation: subtitleFadeIn 1.2s ease-out 0.2s both;
}

@keyframes subtitleFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-description {
  font-size: 21px;
  font-weight: 400;
  line-height: 1.4;
  color: #86868b;
  margin: 0 0 48px 0;
  animation: descFadeIn 1.2s ease-out 0.4s both;
}

@keyframes descFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  animation: actionsFadeIn 1.2s ease-out 0.6s both;
}

@keyframes actionsFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-button {
  height: 56px;
  padding: 0 32px;
  font-size: 17px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-button-primary {
  background: #0071e3;
  box-shadow: 0 4px 20px rgba(0, 113, 227, 0.4);
}

.hero-button-primary:hover {
  background: #0077ed;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 113, 227, 0.5);
}

.hero-button-secondary {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  color: #f5f5f7;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-button-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

/* 滚动指示器 */
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #86868b;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}

.scroll-icon {
  width: 24px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  position: relative;
}

.scroll-wheel {
  width: 4px;
  height: 8px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 2px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scrollWheel 1.5s infinite;
}

@keyframes scrollWheel {
  0% { top: 8px; opacity: 1; }
  100% { top: 24px; opacity: 0; }
}

.scroll-text {
  font-size: 13px;
  letter-spacing: 0.5px;
}

/* Section 通用样式 */
section {
  padding: 120px 0;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 16px 0;
  color: #f5f5f7;
}

.section-subtitle {
  font-size: 21px;
  color: #86868b;
  margin: 0;
}

/* Features Section */
.features-section {
  background: #000;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 32px;
}

.feature-card {
  border-radius: 24px;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover {
  transform: translateY(-8px);
}

.feature-card-inner {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 48px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.feature-card-inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #0071e3, #00a8e3);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card-inner:hover::before {
  transform: scaleX(1);
}

.feature-card-inner:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
}

.feature-icon-wrapper {
  margin-bottom: 32px;
}

.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover .feature-icon {
  transform: scale(1.05);
}

.blog-icon {
  background: linear-gradient(135deg, #0071e3, #00a8e3);
}

.tools-icon {
  background: linear-gradient(135deg, #ff6b6b, #ff8e53);
}

.feature-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 16px 0;
  color: #f5f5f7;
}

.feature-description {
  font-size: 17px;
  line-height: 1.5;
  color: #86868b;
  margin: 0 0 32px 0;
}

.feature-stats {
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #f5f5f7;
}

.stat-label {
  font-size: 13px;
  color: #86868b;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.feature-arrow {
  color: #0071e3;
  font-size: 24px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover .feature-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Tools Section */
.tools-section {
  background: #000;
}

.tools-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.tool-category {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tool-category:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-4px);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.category-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0071e3;
}

.category-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #f5f5f7;
}

.category-tools {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tool-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.tool-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(4px);
}

.tool-name {
  font-size: 15px;
  color: #f5f5f7;
}

.tool-icon {
  color: #86868b;
  font-size: 16px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.tool-item:hover .tool-icon {
  color: #0071e3;
  transform: translateX(4px);
}

/* Tech Section */
.tech-section {
  background: #000;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
}

.tech-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.tech-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--tech-color);
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.tech-logo {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: var(--tech-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tech-card:hover .tech-logo {
  background: var(--tech-color);
  color: #000;
  transform: rotate(360deg);
}

.tech-name {
  font-size: 17px;
  font-weight: 600;
  color: #f5f5f7;
  margin-bottom: 4px;
}

.tech-version {
  font-size: 13px;
  color: #86868b;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, rgba(0, 113, 227, 0.1) 0%, rgba(0, 168, 227, 0.1) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.cta-content {
  text-align: center;
}

.cta-title {
  font-size: 56px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 16px 0;
  color: #f5f5f7;
}

.cta-subtitle {
  font-size: 24px;
  color: #86868b;
  margin: 0 0 48px 0;
}

.cta-actions {
  display: flex;
  justify-content: center;
}

.cta-button {
  height: 64px;
  padding: 0 48px;
  font-size: 19px;
  font-weight: 600;
  background: #0071e3;
  box-shadow: 0 8px 30px rgba(0, 113, 227, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cta-button:hover {
  background: #0077ed;
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 113, 227, 0.5);
}

/* Footer */
.footer {
  padding: 48px 0;
  background: #000;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-content {
  text-align: center;
}

.footer-text {
  font-size: 15px;
  color: #86868b;
  margin: 0 0 8px 0;
}

.footer-copyright {
  font-size: 13px;
  color: #515154;
  margin: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  section {
    padding: 80px 0;
  }

  .hero-title {
    font-size: 48px;
  }

  .hero-subtitle {
    font-size: 28px;
  }

  .hero-description {
    font-size: 17px;
  }

  .hero-button {
    height: 48px;
    padding: 0 24px;
    font-size: 15px;
  }

  .section-title {
    font-size: 36px;
  }

  .section-subtitle {
    font-size: 17px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .feature-card-inner {
    padding: 32px;
  }

  .feature-title {
    font-size: 24px;
  }

  .tools-categories {
    grid-template-columns: 1fr;
  }

  .tech-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
  }

  .cta-title {
    font-size: 36px;
  }

  .cta-subtitle {
    font-size: 19px;
  }

  .cta-button {
    height: 56px;
    padding: 0 32px;
    font-size: 17px;
  }
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 选中文本样式 */
::selection {
  background: rgba(0, 113, 227, 0.3);
  color: #f5f5f7;
}
</style>
