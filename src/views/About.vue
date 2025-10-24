<template>
  <div class="about">
    <div class="about-header">
      <h1>关于我们</h1>
      <p class="subtitle">了解更多关于这个项目的信息</p>
    </div>
    
    <div class="about-content">
      <div class="info-section">
        <h2>项目介绍</h2>
        <p>
          这是一个基于 Vue3 和 Vue Router 构建的现代化单页应用示例。
          项目采用了最新的前端技术栈，为开发者提供了一个清晰的项目结构和最佳实践。
        </p>
      </div>
      
      <div class="tech-stack">
        <h2>技术栈</h2>
        <div class="tech-list">
          <div class="tech-item">
            <span class="tech-name">Vue 3</span>
            <span class="tech-desc">渐进式 JavaScript 框架</span>
          </div>
          <div class="tech-item">
            <span class="tech-name">Vue Router 4</span>
            <span class="tech-desc">Vue.js 官方路由管理器</span>
          </div>
          <div class="tech-item">
            <span class="tech-name">Vite</span>
            <span class="tech-desc">下一代前端构建工具</span>
          </div>
          <div class="tech-item">
            <span class="tech-name">JavaScript ES6+</span>
            <span class="tech-desc">现代 JavaScript 语法</span>
          </div>
        </div>
      </div>
      
      <div class="actions">
        <router-link to="/" class="btn btn-secondary">
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

/**
 * @description 关于页面组件
 * 展示项目信息和技术栈
 */

// 页面加载时间
const loadTime = ref('')

/**
 * @description 获取当前时间
 * @returns {string} 格式化的时间字符串
 */
const getCurrentTime = () => {
  return new Date().toLocaleString('zh-CN')
}

// 组件挂载时记录加载时间
onMounted(() => {
  loadTime.value = getCurrentTime()
  console.log('About 组件已加载，时间：', loadTime.value)
})
</script>

<style scoped>
.about {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
}

.about-header h1 {
  font-size: 3rem;
  color: #333;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
}

.about-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.info-section {
  margin-bottom: 2rem;
}

.info-section h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.info-section p {
  line-height: 1.8;
  color: #555;
  font-size: 1.1rem;
}

.tech-stack h2 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.tech-list {
  display: grid;
  gap: 1rem;
}

.tech-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.tech-name {
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
}

.tech-desc {
  color: #666;
  font-size: 0.9rem;
}

.actions {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
}
</style>