<template>
  <div class="about">
    <n-space vertical size="large" align="center">
      <!-- 页面标题 -->
      <n-space vertical size="medium" align="center">
        <n-h1 class="gradient-text">关于我们</n-h1>
        <n-p class="subtitle">了解更多关于这个项目的信息</n-p>
      </n-space>
      
      <!-- 主要内容卡片 -->
      <n-card 
        class="about-card" 
        :bordered="false" 
        size="large"
        hoverable
      >
        <n-space vertical size="large">
          <!-- 项目介绍 -->
          <div>
            <n-h2 prefix="bar" type="primary">项目介绍</n-h2>
            <n-p depth="2" style="line-height: 1.8; font-size: 16px;">
              这是一个基于 Vue3 和 Vue Router 构建的现代化单页应用示例。
              项目采用了最新的前端技术栈，为开发者提供了一个清晰的项目结构和最佳实践。
            </n-p>
          </div>
          
          <n-divider />
          
          <!-- 技术栈 -->
          <div>
            <n-h2 prefix="bar" type="primary">技术栈</n-h2>
            <n-list bordered>
              <n-list-item>
                <n-thing title="Vue 3" description="渐进式 JavaScript 框架">
                  <template #avatar>
                    <n-avatar color="#4FC08D" size="medium">V3</n-avatar>
                  </template>
                </n-thing>
              </n-list-item>
              
              <n-list-item>
                <n-thing title="Vue Router 4" description="Vue.js 官方路由管理器">
                  <template #avatar>
                    <n-avatar color="#42B883" size="medium">VR</n-avatar>
                  </template>
                </n-thing>
              </n-list-item>
              
              <n-list-item>
                <n-thing title="Vite" description="下一代前端构建工具">
                  <template #avatar>
                    <n-avatar color="#646CFF" size="medium">Vi</n-avatar>
                  </template>
                </n-thing>
              </n-list-item>
              
              <n-list-item>
                <n-thing title="Naive UI" description="Vue 3 组件库">
                  <template #avatar>
                    <n-avatar color="#18A058" size="medium">NU</n-avatar>
                  </template>
                </n-thing>
              </n-list-item>
              
              <n-list-item>
                <n-thing title="JavaScript ES6+" description="现代 JavaScript 语法">
                  <template #avatar>
                    <n-avatar color="#F7DF1E" size="medium">JS</n-avatar>
                  </template>
                </n-thing>
              </n-list-item>
            </n-list>
          </div>
          
          <n-divider />
          
          <!-- 操作按钮 -->
          <n-space justify="center">
            <n-button 
              type="primary" 
              size="large" 
              round
              @click="goHome"
              :render-icon="renderHomeIcon"
            >
              返回首页
            </n-button>
          </n-space>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import { useRouter } from 'vue-router'
import { HomeOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

/**
 * @description 关于页面组件
 * 展示项目信息和技术栈
 */

const router = useRouter()

// 页面加载时间
const loadTime = ref('')

/**
 * @description 获取当前时间
 * @returns {string} 格式化的时间字符串
 */
const getCurrentTime = () => {
  return new Date().toLocaleString('zh-CN')
}

/**
 * @description 返回首页
 */
const goHome = () => {
  router.push('/')
}

/**
 * @description 渲染首页图标
 */
const renderHomeIcon = () => {
  return h(NIcon, null, {
    default: () => h(HomeOutline)
  })
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
  max-width: 900px;
  margin: 0 auto;
  min-height: calc(100vh - 4rem);
}

.about-card {
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.subtitle {
  font-size: 18px;
  opacity: 0.8;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about {
    padding: 1rem;
  }
  
  .gradient-text {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 16px;
  }
}

/* 深色主题适配 */
.dark .about-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>