<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <n-message-provider>
      <div id="app">
        <!-- 导航栏 -->
        <n-layout-header bordered style="height: 64px; padding: 0 24px; position: sticky; top: 0; z-index: 1000;">
          <div class="nav-container">
            <div class="nav-brand">
              <router-link to="/" class="brand-link">
                <n-text style="font-size: 20px; font-weight: bold;">
                  🚀 技术博客平台
                </n-text>
              </router-link>
            </div>
            
            <n-space class="nav-menu" :size="24">
              <router-link to="/" custom v-slot="{ navigate, isActive }">
                <n-button text @click="navigate" :type="isActive ? 'primary' : 'default'">
                  首页
                </n-button>
              </router-link>
              
              <!-- 博客下拉菜单 -->
              <n-dropdown trigger="hover" :options="blogOptions" @select="handleBlogSelect">
                <n-button text>
                  博客
                  <template #icon>
                    <n-icon :component="ChevronDown" />
                  </template>
                </n-button>
              </n-dropdown>
              
              <!-- 工具下拉菜单 -->
              <n-dropdown trigger="hover" :options="toolsOptions" @select="handleToolsSelect">
                <n-button text>
                  工具
                  <template #icon>
                    <n-icon :component="ChevronDown" />
                  </template>
                </n-button>
              </n-dropdown>
              
              <router-link to="/about" custom v-slot="{ navigate, isActive }">
                <n-button text @click="navigate" :type="isActive ? 'primary' : 'default'">
                  关于我
                </n-button>
              </router-link>
              
              <!-- 主题切换按钮 -->
              <n-button circle @click="themeStore.toggleTheme()">
                <template #icon>
                  <n-icon :component="isDark ? SunnyOutline : MoonOutline" />
                </template>
              </n-button>
            </n-space>
          </div>
        </n-layout-header>

        <!-- 路由出口 -->
        <n-layout-content>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </n-layout-content>

        <!-- 页脚 -->
        <n-layout-footer style="padding: 32px 24px; text-align: center; border-top: 1px solid #eee;">
          <n-space vertical size="small">
            <n-text depth="3">
              &copy; 2024 技术博客平台. 使用 Vue 3 + Pinia + Naive UI 构建
            </n-text>
            <n-space justify="center" size="large">
              <n-text depth="3" style="font-size: 12px;">
                <n-icon :component="CodeSlashOutline" style="vertical-align: middle;" />
                Made with ❤️
              </n-text>
            </n-space>
          </n-space>
        </n-layout-footer>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { computed, h, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { darkTheme, NIcon } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import { useBlogStore } from '@/stores/blog'
import { useUserStore } from '@/stores/user'
import { 
  MoonOutline, 
  SunnyOutline, 
  ChevronDown,
  CodeSlashOutline,
  BookOutline,
  DocumentTextOutline,
  GridOutline,
  FileTrayFullOutline,
  CalendarOutline,
  CreateOutline,
  BulbOutline,
  MapOutline,
  VideocamOutline,
  QrCodeOutline
} from '@vicons/ionicons5'

/**
 * @description 应用根组件
 * 包含导航栏、路由出口和页脚
 */

const router = useRouter()
const themeStore = useThemeStore()
const blogStore = useBlogStore()
const userStore = useUserStore()

const isDark = computed(() => themeStore.isDark)

// 初始化
onMounted(() => {
  // 初始化主题
  themeStore.initTheme()
  // 初始化用户数据
  userStore.initUserData()
  // 初始化博客数据
  blogStore.initBlogData()
})

// 渲染图标
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// 博客下拉菜单选项
const blogOptions = [
  {
    label: '博客首页',
    key: 'blog-home',
    icon: renderIcon(BookOutline)
  },
  {
    label: '文章归档',
    key: 'blog-archive',
    icon: renderIcon(CalendarOutline)
  }
]

// 工具下拉菜单选项
const toolsOptions = [
  {
    label: '文档预览',
    key: 'tools-preview-group',
    type: 'group',
    icon: renderIcon(DocumentTextOutline),
    children: [
      {
        label: 'DOCX 预览',
        key: 'docx-preview',
        icon: renderIcon(DocumentTextOutline)
      },
      {
        label: 'Excel 预览',
        key: 'excel-preview',
        icon: renderIcon(GridOutline)
      },
      {
        label: 'PDF 预览',
        key: 'pdf-preview',
        icon: renderIcon(FileTrayFullOutline)
      },
      {
        label: 'PPTX 预览',
        key: 'pptx-preview',
        icon: renderIcon(DocumentTextOutline)
      }
    ]
  },
  {
    type: 'divider'
  },
  {
    label: '编辑器',
    key: 'tools-editor-group',
    type: 'group',
    icon: renderIcon(CreateOutline),
    children: [
      {
        label: 'Markdown 编辑器',
        key: 'rich-editor',
        icon: renderIcon(CreateOutline)
      },
      {
        label: 'WangEditor 富文本',
        key: 'wang-editor',
        icon: renderIcon(CreateOutline)
      },
      {
        label: 'Vditor 编辑器',
        key: 'vditor-editor',
        icon: renderIcon(CodeSlashOutline)
      }
    ]
  },
  {
    type: 'divider'
  },
  {
    label: '可视化工具',
    key: 'tools-visual-group',
    type: 'group',
    icon: renderIcon(CalendarOutline),
    children: [
      {
        label: '甘特图',
        key: 'gantt-chart',
        icon: renderIcon(CalendarOutline)
      },
      {
        label: '地图工具',
        key: 'map-viewer',
        icon: renderIcon(MapOutline)
      },
      {
        label: '室内导览',
        key: 'indoor-guide',
        icon: renderIcon(MapOutline)
      }
    ]
  },
  {
    type: 'divider'
  },
  {
    label: '媒体工具',
    key: 'tools-media-group',
    type: 'group',
    icon: renderIcon(VideocamOutline),
    children: [
      {
        label: '视频播放器',
        key: 'video-player',
        icon: renderIcon(VideocamOutline)
      }
    ]
  },
  {
    type: 'divider'
  },
  {
    label: '开发工具',
    key: 'tools-dev-group',
    type: 'group',
    icon: renderIcon(CodeSlashOutline),
    children: [
      {
        label: 'JSON 格式化',
        key: 'json-formatter',
        icon: renderIcon(CodeSlashOutline)
      },
      {
        label: '条形码/二维码',
        key: 'barcode-generator',
        icon: renderIcon(QrCodeOutline)
      }
    ]
  },
  {
    type: 'divider'
  },
  {
    label: 'AI 工具',
    key: 'ai-tools',
    icon: renderIcon(BulbOutline),
    disabled: true
  }
]

function handleBlogSelect(key) {
  const routes = {
    'blog-home': '/blog',
    'blog-archive': '/blog/archive'
  }
  
  if (routes[key]) {
    router.push(routes[key])
  }
}

function handleToolsSelect(key) {
  const routes = {
    // 文档预览
    'docx-preview': '/tools/preview/docx',
    'excel-preview': '/tools/preview/excel',
    'pdf-preview': '/tools/preview/pdf',
    'pptx-preview': '/tools/preview/pptx',
    // 编辑器
    'rich-editor': '/tools/editor/rich',
    'wang-editor': '/tools/editor/wang',
    'vditor-editor': '/tools/editor/vditor',
    // 可视化工具
    'gantt-chart': '/tools/gantt',
    'map-viewer': '/tools/map',
    'indoor-guide': '/tools/indoor-guide',
    // 媒体工具
    'video-player': '/tools/video',
    // 开发工具
    'json-formatter': '/tools/json',
    'barcode-generator': '/tools/barcode'
  }
  
  if (routes[key]) {
    router.push(routes[key])
  }
}
</script>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 导航栏样式 */
.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.brand-link {
  text-decoration: none;
  display: inline-block;
}

.nav-menu {
  display: flex;
  align-items: center;
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    height: auto;
    padding: 12px 0;
  }
  
  .nav-menu {
    margin-top: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>