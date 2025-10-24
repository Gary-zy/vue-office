<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import ThemeToggle from '@/components/ThemeToggle.vue'

/**
 * @description 首页组件 - 文档预览系统介绍
 * 展示 @vue-office 插件系列的功能和特性介绍
 */

// 插件信息配置
const plugins = ref([
  {
    name: '@vue-office/docx',
    version: 'v1.6.2',
    description: 'Word 文档预览组件，支持 .docx 格式文件的在线预览',
    formats: ['docx'],
    icon: '📝',
    gradient: 'from-blue-500 to-blue-600',
    bgPattern: 'bg-gradient-to-br from-blue-50/30 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/50'
  },
  {
    name: '@vue-office/excel',
    version: 'v1.7.11',
    description: 'Excel 表格预览组件，支持 .xlsx、.xls 等格式',
    formats: ['xlsx', 'xls', 'csv'],
    icon: '📊',
    gradient: 'from-green-500 to-emerald-600',
    bgPattern: 'bg-gradient-to-br from-green-50/30 to-emerald-100/50 dark:from-green-900/30 dark:to-emerald-800/50'
  },
  {
    name: '@vue-office/pdf',
    version: 'v2.0.2',
    description: 'PDF 文档预览组件，支持 .pdf 格式文件预览',
    formats: ['pdf'],
    icon: '📋',
    gradient: 'from-red-500 to-rose-600',
    bgPattern: 'bg-gradient-to-br from-red-50/30 to-rose-100/50 dark:from-red-900/30 dark:to-rose-800/50'
  },
  {
    name: '@vue-office/image',
    version: 'v1.0.0',
    description: '图片预览组件，支持多种图片格式的预览和缩放',
    formats: ['jpg', 'png', 'gif', 'webp', 'svg'],
    icon: '🖼️',
    gradient: 'from-purple-500 to-violet-600',
    bgPattern: 'bg-gradient-to-br from-purple-50/30 to-violet-100/50 dark:from-purple-900/30 dark:to-violet-800/50'
  }
])

// 系统特性配置
const features = ref([
  {
    title: '在线预览',
    description: '支持多种文档格式的在线预览，无需下载即可查看文档内容',
    icon: '📄',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    title: '本地上传',
    description: '支持本地文件上传预览，保护用户隐私，数据不会上传到服务器',
    icon: '📁',
    gradient: 'from-green-500 to-teal-600'
  },
  {
    title: '响应式设计',
    description: '完美适配各种设备屏幕，提供一致的用户体验',
    icon: '📱',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    title: '高性能',
    description: '基于 Vue 3 Composition API，提供更好的性能和开发体验',
    icon: '⚡',
    gradient: 'from-orange-500 to-red-600'
  }
])

console.log('首页组件已加载 - 文档预览系统')
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
    <!-- 装饰性背景元素 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
    </div>

    <!-- 导航栏 -->
    <header class="relative z-10 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-b border-white/20 dark:border-slate-800/50">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            V
          </div>
          <div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vue Office
            </h1>
            <Badge variant="secondary" class="text-xs">文档预览系统</Badge>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="relative z-10 container mx-auto px-4 py-8">
      <!-- Hero 区域 -->
      <section class="text-center py-16 lg:py-24">
        <div class="max-w-4xl mx-auto">
          <!-- 主标题 -->
          <div class="mb-8">
            <h2 class="text-5xl lg:text-7xl font-bold tracking-tight mb-6">
              <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                强大的文档
              </span>
              <br>
              <span class="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                预览解决方案
              </span>
            </h2>
            <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6"></div>
          </div>

          <!-- 副标题 -->
          <p class="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            基于 <span class="font-semibold text-green-600 dark:text-green-400">Vue 3</span> 构建的现代化文档预览系统，
            支持多种文件格式的在线预览和本地上传功能
          </p>

          <!-- 行动按钮 -->
          <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button size="lg" class="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <span class="mr-2">🚀</span>
              开始使用
            </Button>
            <Button variant="outline" size="lg" class="px-8 py-4 text-lg border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300">
              <span class="mr-2">📖</span>
              查看文档
            </Button>
          </div>

          <!-- 特性标签 -->
          <div class="flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" class="px-4 py-2 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              ⚡ 高性能
            </Badge>
            <Badge variant="secondary" class="px-4 py-2 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              🎨 现代化设计
            </Badge>
            <Badge variant="secondary" class="px-4 py-2 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              📱 响应式
            </Badge>
            <Badge variant="secondary" class="px-4 py-2 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              🔧 易于集成
            </Badge>
          </div>
        </div>
      </section>

      <!-- 分隔线 -->
      <div class="relative my-16">
        <Separator class="bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
        <div class="absolute inset-0 flex justify-center">
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 w-12 h-0.5 rounded-full"></div>
        </div>
      </div>

      <!-- 插件介绍 -->
      <section class="py-16">
        <div class="text-center mb-16">
          <h3 class="text-4xl lg:text-5xl font-bold mb-6">
            <span class="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              @vue-office 插件系列
            </span>
          </h3>
          <p class="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            专业的 Vue 3 文档预览组件库，为您的应用提供完整的文档处理能力
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card 
            v-for="plugin in plugins" 
            :key="plugin.name" 
            class="group relative overflow-hidden backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
          >
            <!-- 卡片背景渐变 -->
            <div :class="plugin.bgPattern" class="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            
            <!-- 装饰性元素 -->
            <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full"></div>
            
            <CardHeader class="relative z-10">
              <div class="flex items-center justify-between mb-3">
                <div class="text-3xl">{{ plugin.icon }}</div>
                <Badge variant="outline" class="bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm">
                  {{ plugin.version }}
                </Badge>
              </div>
              <CardTitle class="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                {{ plugin.name }}
              </CardTitle>
              <CardDescription class="text-slate-600 dark:text-slate-300">
                {{ plugin.description }}
              </CardDescription>
            </CardHeader>
            
            <CardContent class="relative z-10">
              <div class="space-y-3">
                <div>
                  <p class="text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">支持格式:</p>
                  <div class="flex flex-wrap gap-2">
                    <Badge 
                      v-for="format in plugin.formats" 
                      :key="format"
                      :class="`bg-gradient-to-r ${plugin.gradient} text-white`"
                      class="text-xs font-medium px-2 py-1 shadow-sm"
                    >
                      {{ format.toUpperCase() }}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <!-- 分隔线 -->
      <div class="relative my-16">
        <Separator class="bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
      </div>

      <!-- 系统特性 -->
      <section class="py-16">
        <div class="text-center mb-16">
          <h3 class="text-4xl lg:text-5xl font-bold mb-6">
            <span class="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              系统特性
            </span>
          </h3>
          <p class="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            为用户提供便捷、高效的文档预览体验
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card 
            v-for="feature in features" 
            :key="feature.title" 
            class="group p-8 backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
          >
            <div class="flex items-start space-x-6">
              <!-- 图标容器 -->
              <div :class="`bg-gradient-to-br ${feature.gradient}`" class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                {{ feature.icon }}
              </div>
              
              <!-- 内容 -->
              <div class="flex-1">
                <h4 class="text-xl font-bold mb-3 text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {{ feature.title }}
                </h4>
                <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <!-- 分隔线 -->
      <div class="relative my-16">
        <Separator class="bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
      </div>

      <!-- 快速开始 -->
      <section class="py-16">
        <Card class="max-w-5xl mx-auto backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 border-0 shadow-2xl overflow-hidden">
          <!-- 背景装饰 -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/50 dark:via-purple-950/30 dark:to-pink-950/50"></div>
          
          <CardHeader class="relative z-10 text-center py-12">
            <CardTitle class="text-3xl lg:text-4xl font-bold mb-4">
              <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                快速开始
              </span>
            </CardTitle>
            <CardDescription class="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              选择您需要预览的文档类型，立即体验强大的预览功能
            </CardDescription>
          </CardHeader>
          
          <CardContent class="relative z-10 pb-12">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Button 
                v-for="plugin in plugins" 
                :key="plugin.name"
                variant="outline" 
                class="group h-24 flex-col space-y-3 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border-2 hover:border-transparent hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                :class="`hover:bg-gradient-to-br ${plugin.gradient} hover:text-white`"
                @click="$router.push(`/${plugin.name.split('/')[1]}-preview`)"
              >
                <div class="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {{ plugin.icon }}
                </div>
                <div class="text-center">
                  <div class="font-bold text-sm">{{ plugin.name.split('/')[1].toUpperCase() }}</div>
                  <div class="text-xs opacity-70">预览</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="relative z-10 border-t border-white/20 dark:border-slate-800/50 mt-20 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80">
      <div class="container mx-auto px-4 py-12 text-center">
        <div class="mb-6">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            V
          </div>
          <h3 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Vue Office
          </h3>
        </div>
        <p class="text-slate-600 dark:text-slate-400 mb-4">
          &copy; 2024 Vue Office 文档预览系统
        </p>
        <p class="text-sm text-slate-500 dark:text-slate-500">
          基于 Vue 3 + shadcn-vue 构建 | 现代化 • 高效 • 美观
        </p>
      </div>
    </footer>
  </div>
</template>