<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="vditor-editor-page">
      <n-layout>
        <n-layout-content class="editor-content">
          <div class="content-container">
            <!-- 页面标题 -->
            <div class="page-header">
              <h1 class="page-title">
                <n-icon :component="CodeSlashOutline" />
                Vditor Markdown 编辑器
              </h1>
              <p class="page-subtitle">
                所见即所得的 Markdown 编辑器，支持实时渲染和多种模式
              </p>
            </div>

            <!-- 编辑器卡片 -->
            <n-card>
              <n-space vertical :size="16">
                <!-- 工具栏 -->
                <n-space justify="space-between">
                  <n-space>
                    <n-button @click="switchMode('wysiwyg')">
                      <template #icon>
                        <n-icon :component="EyeOutline" />
                      </template>
                      所见即所得
                    </n-button>
                    <n-button @click="switchMode('ir')">
                      <template #icon>
                        <n-icon :component="CodeOutline" />
                      </template>
                      即时渲染
                    </n-button>
                    <n-button @click="switchMode('sv')">
                      <template #icon>
                        <n-icon :component="DocumentTextOutline" />
                      </template>
                      分屏预览
                    </n-button>
                  </n-space>
                  <n-space>
                    <n-button @click="exportMarkdown">
                      <template #icon>
                        <n-icon :component="DownloadOutline" />
                      </template>
                      导出 MD
                    </n-button>
                    <n-button @click="exportHTML">
                      <template #icon>
                        <n-icon :component="CodeOutline" />
                      </template>
                      导出 HTML
                    </n-button>
                  </n-space>
                </n-space>

                <!-- 编辑器容器 -->
                <div class="vditor-wrapper">
                  <div ref="vditorContainer" class="vditor-container"></div>
                </div>
              </n-space>
            </n-card>

            <!-- 功能说明 -->
            <n-card title="Vditor 特性" style="margin-top: 24px">
              <n-grid :cols="2" :x-gap="24" :y-gap="16" responsive="screen">
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>三种编辑模式</template>
                    <template #description>
                      所见即所得、即时渲染、分屏预览，满足不同需求
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>Markdown 全支持</template>
                    <template #description>
                      支持 CommonMark、GFM 等多种 Markdown 语法
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>数学公式</template>
                    <template #description>
                      支持 LaTeX 数学公式、图表、流程图等
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>代码高亮</template>
                    <template #description>
                      支持 200+ 编程语言的语法高亮
                    </template>
                  </n-thing>
                </n-grid-item>
              </n-grid>
            </n-card>
          </div>
        </n-layout-content>
      </n-layout>
    </div>
  </n-config-provider>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { darkTheme, useMessage } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { 
  CodeSlashOutline,
  EyeOutline,
  CodeOutline,
  DocumentTextOutline,
  DownloadOutline,
  CheckmarkCircleOutline
} from '@vicons/ionicons5'

/**
 * @description Vditor Markdown 编辑器页面
 */

const message = useMessage()
const themeStore = useThemeStore()

// 主题
const isDark = computed(() => themeStore.isDark)

// 编辑器实例
const vditorContainer = ref(null)
let vditor = null

/**
 * @description 初始化编辑器
 */
const initEditor = () => {
  if (!vditorContainer.value) return

  vditor = new Vditor(vditorContainer.value, {
    height: 600,
    mode: 'wysiwyg',
    placeholder: '请输入 Markdown 内容...',
    theme: isDark.value ? 'dark' : 'classic',
    cache: {
      enable: false
    },
    counter: {
      enable: true
    },
    toolbarConfig: {
      pin: true
    },
    upload: {
      // 自定义图片上传（使用 base64）
      handler: (files) => {
        return Promise.all(
          Array.from(files).map((file) => {
            return new Promise((resolve) => {
              const reader = new FileReader()
              reader.onload = (e) => {
                resolve({
                  msg: '',
                  code: 0,
                  data: {
                    errFiles: [],
                    succMap: {
                      [file.name]: e.target.result
                    }
                  }
                })
              }
              reader.readAsDataURL(file)
            })
          })
        ).then((results) => results[0])
      }
    },
    after: () => {
      vditor.setValue(`# 欢迎使用 Vditor！

这是一个功能强大的 Markdown 编辑器，支持：

## 基础语法

- **粗体** 和 *斜体*
- ~~删除线~~
- \`行内代码\`

## 列表

1. 有序列表
2. 第二项
   - 嵌套列表
   - 无序列表

## 代码块

\`\`\`javascript
function hello() {
  console.log('Hello Vditor!')
}
\`\`\`

## 表格

| 功能 | 支持 |
|------|------|
| Markdown | ✅ |
| 数学公式 | ✅ |
| 图表 | ✅ |

## 数学公式

行内公式：$E = mc^2$

块级公式：

$$
\\frac{d}{dx}(x^2) = 2x
$$

## 引用

> 这是一个引用块
> 
> 可以多行

开始编辑吧！🎉`)
    }
  })
}

/**
 * @description 切换编辑模式
 */
const switchMode = (mode) => {
  if (vditor) {
    vditor.setMode(mode)
    const modeNames = {
      wysiwyg: '所见即所得',
      ir: '即时渲染',
      sv: '分屏预览'
    }
    message.success(`已切换到${modeNames[mode]}模式`)
  }
}

/**
 * @description 导出 Markdown
 */
const exportMarkdown = () => {
  if (vditor) {
    const markdown = vditor.getValue()
    if (!markdown) {
      message.warning('内容为空，无法导出')
      return
    }
    
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `document-${Date.now()}.md`
    link.click()
    URL.revokeObjectURL(url)
    message.success('Markdown 文件已导出')
  }
}

/**
 * @description 导出 HTML
 */
const exportHTML = () => {
  if (vditor) {
    const html = vditor.getHTML()
    if (!html) {
      message.warning('内容为空，无法导出')
      return
    }
    
    const fullHTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vditor/dist/index.css">
  <style>
    body { max-width: 800px; margin: 40px auto; padding: 0 20px; }
  </style>
</head>
<body>
  <div class="vditor-reset">
${html}
  </div>
</body>
</html>`

    const blob = new Blob([fullHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `document-${Date.now()}.html`
    link.click()
    URL.revokeObjectURL(url)
    message.success('HTML 文件已导出')
  }
}

onMounted(() => {
  initEditor()
})

onBeforeUnmount(() => {
  if (vditor) {
    vditor.destroy()
  }
})
</script>

<style scoped>
.vditor-editor-page {
  min-height: 100vh;
  background: var(--n-color);
}

.editor-content {
  padding: 40px 0;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: var(--n-title-text-color);
}

.page-title .n-icon {
  font-size: 36px;
}

.page-subtitle {
  font-size: 16px;
  color: var(--n-text-color);
  opacity: 0.7;
  margin: 0;
}

.vditor-wrapper {
  width: 100%;
}

.vditor-container {
  min-height: 600px;
}

/* 响应式 */
@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }

  .page-subtitle {
    font-size: 14px;
  }
}
</style>
