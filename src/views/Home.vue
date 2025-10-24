<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="min-h-screen">
      <!-- 导航栏 -->
      <n-layout>
        <n-layout-header bordered style="height: 64px; padding: 0 24px;">
          <div class="flex justify-between items-center h-full max-w-7xl mx-auto">
            <div class="flex items-center space-x-8">
              <n-text tag="h1" :depth="1" style="font-size: 20px; font-weight: bold;">
                文档预览系统
              </n-text>
              <n-space class="hidden md:flex">
                <!-- <n-button text @click="$router.push('/')">首页</n-button> -->
                <!-- <n-button text @click="$router.push('/docx-preview')">DOCX</n-button>
                <n-button text @click="$router.push('/excel-preview')">Excel</n-button>
                <n-button text @click="$router.push('/pdf-preview')">PDF</n-button>
                <n-button text @click="$router.push('/pptx-preview')">PPTX</n-button> -->
              </n-space>
            </div>
            
            <!-- 主题切换按钮 -->
            <div class="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </n-layout-header>

        <n-layout-content style="padding: 48px 24px;">
          <div class="max-w-7xl mx-auto">
            <!-- Hero 区域 -->
            <div class="text-center mb-20">
              <n-space vertical size="large" align="center">
                <n-text tag="h1" style="font-size: 48px; font-weight: bold; line-height: 1.2;">
                  现代化文档预览
                  <n-gradient-text type="primary" style="display: block; font-size: 48px;">
                    解决方案
                  </n-gradient-text>
                </n-text>
                
                <n-text style="font-size: 18px; max-width: 600px; line-height: 1.6;">
                  基于 Vue 3 和 @vue-office 构建的高性能文档预览系统，支持 DOCX、Excel、PDF、PPTX 等多种格式的在线预览
                </n-text>

                <!-- 特性标签 -->
                <n-space justify="center" wrap>
                  <n-tag type="success" size="large">⚡ 高性能</n-tag>
                  <n-tag type="info" size="large">🎨 现代设计</n-tag>
                  <n-tag type="warning" size="large">📱 响应式</n-tag>
                  <n-tag type="error" size="large">🔧 易集成</n-tag>
                </n-space>

                <!-- 行动按钮 -->
                <n-space size="large">
                  <n-button type="primary" size="large" style="padding: 0 32px; height: 48px;">
                    立即体验
                  </n-button>
                  <n-button size="large" style="padding: 0 32px; height: 48px;" @click="$router.push('/about')">
                    查看文档
                  </n-button>
                </n-space>
              </n-space>
            </div>

            <!-- 支持的文档格式 -->
            <div class="mb-20">
              <n-text tag="h2" style="font-size: 32px; font-weight: bold; text-align: center; margin-bottom: 48px;">
                支持的文档格式
              </n-text>
              
              <n-grid :cols="4" :x-gap="24" :y-gap="24" responsive="screen" item-responsive>
                <n-grid-item v-for="plugin in plugins" :key="plugin.name" span="1 s:2 m:1">
                  <n-card 
                    hoverable 
                    style="text-align: center; height: 100%;"
                    @click="$router.push(plugin.route)"
                  >
                    <n-space vertical align="center" size="medium">
                      <n-text style="font-size: 48px;">{{ plugin.icon }}</n-text>
                      <n-text tag="h3" style="font-size: 20px; font-weight: 600;">
                        {{ plugin.displayName }}
                      </n-text>
                      <n-text depth="3" style="font-size: 14px;">
                        {{ plugin.description }}
                      </n-text>
                      <n-button type="primary" ghost style="width: 100%;">
                        立即预览
                      </n-button>
                    </n-space>
                  </n-card>
                </n-grid-item>
              </n-grid>
            </div>

            <!-- 系统特性 -->
            <div class="mb-20">
              <n-text tag="h2" style="font-size: 32px; font-weight: bold; text-align: center; margin-bottom: 48px;">
                系统特性
              </n-text>
              
              <n-grid :cols="4" :x-gap="24" :y-gap="24" responsive="screen" item-responsive>
                <n-grid-item v-for="feature in features" :key="feature.title" span="1 s:2 m:1">
                  <n-card style="text-align: center; height: 100%;">
                    <n-space vertical align="center" size="medium">
                      <n-text style="font-size: 36px;">{{ feature.icon }}</n-text>
                      <n-text tag="h3" style="font-size: 18px; font-weight: 600;">
                        {{ feature.title }}
                      </n-text>
                      <n-text depth="3" style="font-size: 14px;">
                        {{ feature.description }}
                      </n-text>
                    </n-space>
                  </n-card>
                </n-grid-item>
              </n-grid>
            </div>

            <!-- 快速开始 -->
            <div class="mb-20">
              <n-card style="background: linear-gradient(135deg, #18a058, #36ad6a); color: white; border-radius: 16px;">
                <n-space vertical align="center" size="large">
                  <n-space vertical align="center" size="medium">
                    <n-text tag="h2" style="font-size: 32px; font-weight: bold; color: white;">
                      快速开始
                    </n-text>
                    <n-text style="font-size: 18px; color: rgba(255, 255, 255, 0.9);">
                      选择文档类型，立即开始预览体验
                    </n-text>
                  </n-space>
                  
                  <n-grid :cols="4" :x-gap="16" :y-gap="16" responsive="screen" item-responsive>
                    <n-grid-item v-for="plugin in plugins" :key="plugin.name" span="1 s:2 m:1">
                      <n-button 
                        style="height: 80px; width: 100%; border-radius: 12px;"
                        @click="$router.push(plugin.route)"
                        strong
                        secondary
                      >
                        <n-space vertical align="center" size="small">
                          <n-text style="font-size: 24px;">{{ plugin.icon }}</n-text>
                          <n-text style="font-size: 14px; font-weight: 500;">
                            {{ plugin.displayName }}
                          </n-text>
                        </n-space>
                      </n-button>
                    </n-grid-item>
                  </n-grid>
                </n-space>
              </n-card>
            </div>

            <!-- 分隔线 -->
            <n-divider />

            <!-- 页脚 -->
            <div style="text-align: center; padding: 24px 0;">
              <n-text depth="3">
                &copy; 2024 文档预览系统. 基于 Vue 3 和 @vue-office 构建.
              </n-text>
            </div>
          </div>
        </n-layout-content>
      </n-layout>
    </div>
  </n-config-provider>
</template>

<script setup>
import { ref, computed } from 'vue'
import { darkTheme } from 'naive-ui'
import ThemeToggle from '@/components/ThemeToggle.vue'

/**
 * @description 首页组件 - 展示文档预览系统的主要功能和特性
 * 使用 Naive UI 组件库构建现代化的用户界面
 */

// 主题状态管理
const isDark = ref(false)

// 插件信息配置
const plugins = [
  {
    name: 'docx',
    displayName: 'DOCX 预览',
    description: '支持 Word 文档在线预览',
    icon: '📄',
    route: '/docx-preview',
    color: 'blue'
  },
  {
    name: 'excel',
    displayName: 'Excel 预览', 
    description: '支持 Excel 表格在线预览',
    icon: '📊',
    route: '/excel-preview',
    color: 'green'
  },
  {
    name: 'pdf',
    displayName: 'PDF 预览',
    description: '支持 PDF 文档在线预览', 
    icon: '📕',
    route: '/pdf-preview',
    color: 'red'
  },
  {
    name: 'pptx',
    displayName: 'PPTX 预览',
    description: '支持 PowerPoint 演示文稿预览',
    icon: '📽️',
    route: '/pptx-preview', 
    color: 'orange'
  }
]

// 系统特性配置
const features = [
  {
    title: '在线预览',
    description: '无需下载，直接在浏览器中预览各种文档格式',
    icon: '👁️'
  },
  {
    title: '本地上传',
    description: '支持本地文件上传，快速预览您的文档内容',
    icon: '📤'
  },
  {
    title: '响应式设计',
    description: '完美适配桌面端、平板和移动设备',
    icon: '📱'
  },
  {
    title: '高性能',
    description: '基于现代前端技术，提供流畅的用户体验',
    icon: '⚡'
  }
]
</script>

<style scoped>
/* 自定义样式 */
.n-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
}

.n-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* 响应式设计优化 */
@media (max-width: 768px) {
  .hidden.md\\:flex {
    display: none !important;
  }
}

/* 渐变文字效果 */
.gradient-text {
  background: linear-gradient(135deg, #18a058, #36ad6a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>