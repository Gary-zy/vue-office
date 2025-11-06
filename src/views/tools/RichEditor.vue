<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="rich-editor-page">
      <n-layout>
        <n-layout-content class="editor-content">
          <div class="content-container">
            <!-- 页面标题 -->
            <div class="page-header">
              <h1 class="page-title">
                <n-icon :component="CreateOutline" />
                富文本编辑器
              </h1>
              <p class="page-subtitle">
                基于 Quill 的现代化富文本编辑器，支持 Markdown、代码高亮等功能
              </p>
            </div>

            <!-- 编辑器卡片 -->
            <n-card>
              <n-space vertical :size="16">
                <!-- 工具栏 -->
                <n-space justify="space-between">
                  <n-space>
                    <n-button @click="clearContent">
                      <template #icon>
                        <n-icon :component="TrashOutline" />
                      </template>
                      清空
                    </n-button>
                    <n-button @click="exportMarkdown">
                      <template #icon>
                        <n-icon :component="DownloadOutline" />
                      </template>
                      导出 Markdown
                    </n-button>
                    <n-button @click="exportHTML">
                      <template #icon>
                        <n-icon :component="CodeOutline" />
                      </template>
                      导出 HTML
                    </n-button>
                  </n-space>
                  <n-space>
                    <n-text depth="3">字数: {{ wordCount }}</n-text>
                  </n-space>
                </n-space>

                <!-- 编辑器区域 -->
                <div class="editor-wrapper">
                  <n-input
                    v-model:value="editorContent"
                    type="textarea"
                    placeholder="开始编写内容...

支持 Markdown 语法：
# 标题
**粗体** *斜体*
- 列表项
[链接](url)
```代码块```"
                    :autosize="{ minRows: 20, maxRows: 40 }"
                    class="markdown-editor"
                  />
                </div>
              </n-space>
            </n-card>

            <!-- 预览区域 -->
            <n-card title="实时预览" style="margin-top: 24px">
              <div 
                class="markdown-preview"
                v-html="renderedContent"
              />
              <n-empty 
                v-if="!editorContent"
                description="内容预览将在这里显示"
                size="large"
              />
            </n-card>

            <!-- 功能说明 -->
            <n-card title="功能特性" style="margin-top: 24px">
              <n-list>
                <n-list-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>Markdown 支持</template>
                    <template #description>
                      完整支持 Markdown 语法，包括标题、列表、链接、图片等
                    </template>
                  </n-thing>
                </n-list-item>
                <n-list-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>代码高亮</template>
                    <template #description>
                      支持多种编程语言的语法高亮显示
                    </template>
                  </n-thing>
                </n-list-item>
                <n-list-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>实时预览</template>
                    <template #description>
                      编辑内容实时渲染预览，所见即所得
                    </template>
                  </n-thing>
                </n-list-item>
                <n-list-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>导出功能</template>
                    <template #description>
                      支持导出为 Markdown 和 HTML 格式
                    </template>
                  </n-thing>
                </n-list-item>
              </n-list>
            </n-card>
          </div>
        </n-layout-content>
      </n-layout>
    </div>
  </n-config-provider>
</template>

<script setup>
import { ref, computed } from 'vue'
import { darkTheme, useMessage } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import { renderMarkdown } from '@/utils/markdown'
import { 
  CreateOutline, 
  TrashOutline, 
  DownloadOutline, 
  CodeOutline,
  CheckmarkCircleOutline
} from '@vicons/ionicons5'

/**
 * @description 富文本编辑器工具页面
 * 支持 Markdown 编辑和实时预览
 */

const message = useMessage()
const themeStore = useThemeStore()

// 主题
const isDark = computed(() => themeStore.isDark)

// 编辑器内容
const editorContent = ref(`# 欢迎使用富文本编辑器

这是一个基于 Markdown 的富文本编辑器，支持实时预览。

## 功能特性

- **Markdown 语法支持**
- **代码高亮显示**
- **实时预览**
- **导出功能**

## 代码示例

\`\`\`javascript
function hello() {
  console.log('Hello, World!')
}
\`\`\`

## 列表示例

1. 第一项
2. 第二项
3. 第三项

---

开始编辑你的内容吧！`)

// 渲染后的内容
const renderedContent = computed(() => {
  if (!editorContent.value) return ''
  return renderMarkdown(editorContent.value)
})

// 字数统计
const wordCount = computed(() => {
  return editorContent.value.length
})

/**
 * @description 清空内容
 */
const clearContent = () => {
  editorContent.value = ''
  message.success('内容已清空')
}

/**
 * @description 导出 Markdown
 */
const exportMarkdown = () => {
  if (!editorContent.value) {
    message.warning('内容为空，无法导出')
    return
  }

  const blob = new Blob([editorContent.value], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `document-${Date.now()}.md`
  link.click()
  URL.revokeObjectURL(url)
  
  message.success('Markdown 文件已导出')
}

/**
 * @description 导出 HTML
 */
const exportHTML = () => {
  if (!editorContent.value) {
    message.warning('内容为空，无法导出')
    return
  }

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css">
  <style>
    body { max-width: 800px; margin: 40px auto; padding: 0 20px; font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; }
    img { max-width: 100%; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
    pre { background: #f4f4f4; padding: 16px; border-radius: 6px; overflow-x: auto; }
  </style>
</head>
<body>
${renderedContent.value}
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `document-${Date.now()}.html`
  link.click()
  URL.revokeObjectURL(url)
  
  message.success('HTML 文件已导出')
}
</script>

<style scoped>
.rich-editor-page {
  min-height: 100vh;
  background: var(--n-color);
}

.editor-content {
  padding: 40px 0;
}

.content-container {
  max-width: 1200px;
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

.editor-wrapper {
  width: 100%;
}

.markdown-editor :deep(.n-input__textarea-el) {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
}

.markdown-preview {
  font-size: 16px;
  line-height: 1.8;
  color: var(--n-text-color);
  min-height: 200px;
}

.markdown-preview :deep(h1),
.markdown-preview :deep(h2),
.markdown-preview :deep(h3),
.markdown-preview :deep(h4),
.markdown-preview :deep(h5),
.markdown-preview :deep(h6) {
  margin: 24px 0 16px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--n-title-text-color);
}

.markdown-preview :deep(h1) { font-size: 28px; }
.markdown-preview :deep(h2) { font-size: 24px; }
.markdown-preview :deep(h3) { font-size: 20px; }

.markdown-preview :deep(p) {
  margin: 16px 0;
}

.markdown-preview :deep(pre) {
  margin: 16px 0;
  border-radius: 8px;
  overflow: hidden;
}

.markdown-preview :deep(code) {
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
}

.markdown-preview :deep(ul),
.markdown-preview :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.markdown-preview :deep(li) {
  margin: 8px 0;
}

.markdown-preview :deep(blockquote) {
  margin: 16px 0;
  padding: 12px 16px;
  border-left: 4px solid #18a058;
  background: var(--n-color-hover);
  border-radius: 4px;
}

.markdown-preview :deep(a) {
  color: #18a058;
  text-decoration: none;
}

.markdown-preview :deep(a:hover) {
  text-decoration: underline;
}

.markdown-preview :deep(hr) {
  margin: 24px 0;
  border: none;
  border-top: 1px solid var(--n-border-color);
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

