<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="markdown-editor-page">
      <n-layout>
        <n-layout-content class="editor-content">
          <div class="content-container">
            <!-- 页面标题 -->
            <div class="page-header">
              <h1 class="page-title">
                <n-icon :component="DocumentTextOutline" />
                Markdown 编辑器
              </h1>
              <p class="page-subtitle">
                支持实时预览、多种主题、语法高亮的专业 Markdown 编辑器
              </p>
              <n-alert type="info" :bordered="false" closable class="shortcuts-info">
                <template #icon>
                  <n-icon :component="CodeOutline" />
                </template>
                💡 快捷键：Ctrl/Cmd + B (粗体) | I (斜体) | +/- (调整字体) | 0 (重置)
              </n-alert>
            </div>

            <!-- 工具栏 -->
            <n-card class="toolbar-card">
              <n-space :size="16" justify="space-between" wrap>
                <!-- 左侧工具组 -->
                <n-space :size="12">
                  <!-- 预览模式切换 -->
                  <n-button-group>
                    <n-button
                      :type="previewMode === 'edit' ? 'primary' : 'default'"
                      @click="setPreviewMode('edit')"
                    >
                      <template #icon>
                        <n-icon :component="CreateOutline" />
                      </template>
                      编辑
                    </n-button>
                    <n-button
                      :type="previewMode === 'preview' ? 'primary' : 'default'"
                      @click="setPreviewMode('preview')"
                    >
                      <template #icon>
                        <n-icon :component="EyeOutline" />
                      </template>
                      预览
                    </n-button>
                    <n-button
                      :type="previewMode === 'split' ? 'primary' : 'default'"
                      @click="setPreviewMode('split')"
                    >
                      <template #icon>
                        <n-icon :component="ResizeOutline" />
                      </template>
                      分屏
                    </n-button>
                  </n-button-group>

                  <!-- 分屏比例调节 -->
                  <div v-if="previewMode === 'split'" class="ratio-control">
                    <n-slider
                      v-model:value="splitRatio"
                      :min="20"
                      :max="80"
                      :step="5"
                      style="width: 120px"
                      :tooltip="false"
                    />
                    <n-text depth="3" style="font-size: 12px; min-width: 40px">
                      {{ splitRatio }}%
                    </n-text>
                  </div>

                  <!-- 主题切换 -->
                  <n-select
                    v-model:value="selectedTheme"
                    :options="themeOptions"
                    style="width: 140px"
                    @update:value="handleThemeChange"
                  >
                    <template #render-label="{ option }">
                      <n-space align="center" :size="8">
                        <div
                          class="theme-preview"
                          :style="{ backgroundColor: option.color }"
                        />
                        <span>{{ option.label }}</span>
                      </n-space>
                    </template>
                  </n-select>

                  <!-- 字体大小调节 -->
                  <n-space :size="4" align="center">
                    <n-button-group size="small">
                      <n-button @click="editorFontSize = Math.max(10, editorFontSize - 1)">
                        <template #icon>
                          <n-icon :component="RemoveOutline" />
                        </template>
                      </n-button>
                      <n-button disabled style="min-width: 50px">
                        {{ editorFontSize }}px
                      </n-button>
                      <n-button @click="editorFontSize = Math.min(28, editorFontSize + 1)">
                        <template #icon>
                          <n-icon :component="AddOutline" />
                        </template>
                      </n-button>
                    </n-button-group>
                  </n-space>
                </n-space>

                <!-- 右侧工具组 -->
                <n-space :size="12">
                  <!-- 全屏按钮 -->
                  <n-button @click="toggleFullscreen">
                    <template #icon>
                      <n-icon :component="expandIcon" />
                    </template>
                    {{ isFullscreen ? '退出全屏' : '全屏' }}
                  </n-button>

                  <!-- 导出菜单 -->
                  <n-dropdown :options="exportOptions" @select="handleExport">
                    <n-button>
                      <template #icon>
                        <n-icon :component="DownloadOutline" />
                      </template>
                      导出
                      <template #suffix>
                        <n-icon :component="ChevronDownOutline" />
                      </template>
                    </n-button>
                  </n-dropdown>

                  <!-- 字数统计 -->
                  <n-text depth="3">
                    <n-icon :component="DocumentTextOutline" />
                    {{ wordCount }} 字
                  </n-text>
                </n-space>
              </n-space>
            </n-card>

            <!-- 编辑器主体 -->
            <n-card class="editor-card" :class="{ 'fullscreen': isFullscreen }">
              <!-- 编辑模式 -->
              <div v-show="previewMode === 'edit'" class="editor-container">
                <div class="editor-wrapper">
                  <textarea
                    ref="editorRef"
                    v-model="content"
                    class="markdown-textarea"
                    :placeholder="placeholder"
                    @scroll="syncScroll"
                    @input="handleInput"
                    @keydown="handleKeydown"
                  />
                  <div class="line-numbers">
                    <div
                      v-for="n in lineCount"
                      :key="n"
                      class="line-number"
                    >
                      {{ n }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- 预览模式 -->
              <div v-show="previewMode === 'preview'" class="preview-container">
                <div
                  ref="previewRef"
                  class="markdown-preview"
                  :class="previewThemeClass"
                  v-html="renderedContent"
                  @scroll="syncPreviewScroll"
                />
              </div>

              <!-- 分屏模式 -->
              <div v-show="previewMode === 'split'" class="split-container" :style="{ '--editor-width': `${splitRatio}%` }">
                <div class="editor-pane">
                  <div class="editor-wrapper">
                    <textarea
                      ref="splitEditorRef"
                      v-model="content"
                      class="markdown-textarea"
                      :placeholder="placeholder"
                      @scroll="syncScroll"
                      @input="handleInput"
                      @keydown="handleKeydown"
                    />
                    <div class="line-numbers">
                      <div
                        v-for="n in lineCount"
                        :key="n"
                        class="line-number"
                      >
                        {{ n }}
                      </div>
                    </div>
                  </div>
                </div>

                <n-splitter
                  :disabled="previewMode !== 'split'"
                  style="height: 100%"
                />

                <div class="preview-pane">
                  <div
                    ref="splitPreviewRef"
                    class="markdown-preview"
                    :class="previewThemeClass"
                    v-html="renderedContent"
                    @scroll="syncPreviewScroll"
                  />
                </div>
              </div>

              <!-- 快捷工具栏 -->
              <div v-show="showToolbar" class="quick-toolbar">
                <n-space :size="4">
                  <n-button size="small" quaternary @click="insertMarkdown('**', '**')">
                    <template #icon>
                      <n-icon :component="BoldOutline" />
                    </template>
                  </n-button>
                  <n-button size="small" quaternary @click="insertMarkdown('*', '*')">
                    <template #icon>
                      <n-icon :component="ItalicOutline" />
                    </template>
                  </n-button>
                  <n-button size="small" quaternary @click="insertMarkdown('~~', '~~')">
                    <template #icon>
                      <n-icon :component="StrikethroughOutline" />
                    </template>
                  </n-button>
                  <n-divider vertical />
                  <n-button size="small" quaternary @click="insertMarkdown('## ', '')">
                    H2
                  </n-button>
                  <n-button size="small" quaternary @click="insertMarkdown('### ', '')">
                    H3
                  </n-button>
                  <n-divider vertical />
                  <n-button size="small" quaternary @click="insertMarkdown('- ', '')">
                    <template #icon>
                      <n-icon :component="ListOutline" />
                    </template>
                  </n-button>
                  <n-button size="small" quaternary @click="insertMarkdown('1. ', '')">
                    <template #icon>
                      <n-icon :component="ReorderFourOutline" />
                    </template>
                  </n-button>
                  <n-button size="small" quaternary @click="insertMarkdown('> ', '')">
                    <template #icon>
                      <n-icon :component="ChatbubbleEllipsesOutline" />
                    </template>
                  </n-button>
                  <n-divider vertical />
                  <n-button size="small" quaternary @click="insertMarkdown('```\n', '\n```')">
                    <template #icon>
                      <n-icon :component="CodeOutline" />
                    </template>
                  </n-button>
                  <n-button size="small" quaternary @click="insertMarkdown('[', '](url)')">
                    <template #icon>
                      <n-icon :component="LinkOutline" />
                    </template>
                  </n-button>
                  <n-button size="small" quaternary @click="insertMarkdown('![', '](url)')">
                    <template #icon>
                      <n-icon :component="ImageOutline" />
                    </template>
                  </n-button>
                </n-space>
              </div>
            </n-card>
          </div>
        </n-layout-content>
      </n-layout>
    </div>
  </n-config-provider>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { darkTheme, useMessage } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import { renderMarkdown, loadThemeCSS } from '@/utils/markdown'
import {
  DocumentTextOutline,
  CreateOutline,
  EyeOutline,
  ResizeOutline,
  DownloadOutline,
  ChevronDownOutline,
  ExpandOutline,
  ContractOutline,
  BoldOutline,
  ItalicOutline,
  StrikethroughOutline,
  ListOutline,
  ReorderFourOutline,
  ChatbubbleEllipsesOutline,
  CodeOutline,
  LinkOutline,
  ImageOutline,
  AddOutline,
  RemoveOutline
} from '@vicons/ionicons5'

/**
 * @description 高级 Markdown 编辑器页面
 */

const message = useMessage()
const themeStore = useThemeStore()

// 主题
const isDark = computed(() => themeStore.isDark)

// 编辑器状态 - 默认分屏模式
const content = ref(`# 欢迎使用 Markdown 编辑器

这是一个功能强大的 Markdown 编辑器，支持：

## 🎯 核心功能

- **实时预览** - 编辑内容实时渲染
- **分屏编辑** - 👈 左边编写，👉 右边预览（推荐模式）
- **多种主题** - 16+ 代码高亮主题可选
- **快捷工具** - 便捷的工具栏操作
- **全屏模式** - 沉浸式编辑体验
- **滚动同步** - 编辑和预览自动滚动同步

## 📝 语法示例

### 文本格式
- **粗体文本**
- *斜体文本*
- ~~删除线文本~~
- \`行内代码\`

### 列表
1. 有序列表项 1
2. 有序列表项 2
   - 嵌套无序列表
   - 另一个嵌套项

### 代码块
\`\`\`javascript
function hello() {
  console.log('Hello, Markdown!')
}
\`\`\`

### 引用
> 这是一段引用文本
> 可以有多行

### 链接和图片
[链接文本](https://example.com)
![图片描述](https://example.com/image.jpg)

---

开始编辑你的内容吧！🎉`)
const previewMode = ref('split') // edit, preview, split - 默认分屏
const selectedTheme = ref('github')
const splitRatio = ref(50)
const showToolbar = ref(true)
const isFullscreen = ref(false)
const editorFontSize = ref(14) // 编辑器字体大小
const previewFontSize = ref(16) // 预览字体大小

// 引用
const editorRef = ref(null)
const previewRef = ref(null)
const splitEditorRef = ref(null)
const splitPreviewRef = ref(null)

// 主题选项 - 支持更多代码高亮主题
const themeOptions = ref([
  { label: 'GitHub', value: 'github', color: '#0366d6' },
  { label: 'GitHub Dark', value: 'github-dark', color: '#1f6feb' },
  { label: 'VS Code', value: 'vs2015', color: '#007acc' },
  { label: 'VS Code Dark', value: 'vs-dark', color: '#1e1e1e' },
  { label: 'Monokai', value: 'monokai', color: '#f92672' },
  { label: 'Dracula', value: 'dracula', color: '#bd93f9' },
  { label: 'One Dark', value: 'atom-one-dark', color: '#61dafb' },
  { label: 'One Light', value: 'atom-one-light', color: '#383a42' },
  { label: 'Solarized Dark', value: 'solarized-dark', color: '#002b36' },
  { label: 'Solarized Light', value: 'solarized-light', color: '#fdf6e3' },
  { label: 'Gruvbox Dark', value: 'atom-one-dark', color: '#282828' },
  { label: 'Gruvbox Light', value: 'idea', color: '#ebdbb2' },
  { label: 'Xcode', value: 'xcode', color: '#8658ac' },
  { label: 'Tokyo Night', value: 'tokyo-night-dark', color: '#bb9af7' },
  { label: 'One Pro', value: 'one-pro', color: '#61afef' },
  { label: 'Material', value: 'atom-one-dark', color: '#263238' }
])

// 导出选项
const exportOptions = ref([
  { label: '导出 Markdown', key: 'markdown' },
  { label: '导出 HTML', key: 'html' },
  { label: '导出 PDF', key: 'pdf' }
])

// 计算属性
const renderedContent = computed(() => {
  if (!content.value) return ''
  return renderMarkdown(content.value)
})

const previewThemeClass = computed(() => {
  return `preview-theme-${selectedTheme.value}`
})

const lineCount = computed(() => {
  return content.value.split('\n').length
})

const wordCount = computed(() => {
  return content.value.length
})

const expandIcon = computed(() => {
  return isFullscreen.value ? ContractOutline : ExpandOutline
})

const placeholder = `开始编写内容...

支持 Markdown 语法：
# 标题
**粗体** *斜体*
- 列表项
[链接](url)
\`\`\`代码块\`\`\``

// 方法
/**
 * 设置预览模式
 */
const setPreviewMode = (mode) => {
  previewMode.value = mode
  if (mode === 'split') {
    syncScroll()
  }
}

/**
 * 主题切换处理
 */
const handleThemeChange = (value) => {
  selectedTheme.value = value
  // 加载对应的主题 CSS
  loadThemeCSS(value)
  const themeName = themeOptions.value.find(t => t.value === value)?.label || value
  message.success(`主题已切换到 ${themeName}`)
}

/**
 * 切换全屏
 */
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

/**
 * 插入 Markdown 语法
 */
const insertMarkdown = (before, after) => {
  const textarea = editorRef.value || splitEditorRef.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = content.value.substring(start, end)

  const newText = before + selectedText + after
  const newContent =
    content.value.substring(0, start) +
    newText +
    content.value.substring(end)

  content.value = newContent

  // 设置光标位置
  nextTick(() => {
    textarea.focus()
    textarea.setSelectionRange(
      start + before.length,
      start + before.length + selectedText.length
    )
  })
}

// 标志位：防止滚动同步的循环更新
let isScrolling = false

/**
 * 编辑器滚动同步到预览
 */
const syncScroll = () => {
  if (previewMode.value !== 'split' || isScrolling) return

  const editor = splitEditorRef.value
  const preview = splitPreviewRef.value

  if (editor && preview) {
    isScrolling = true
    const scrollRatio = editor.scrollTop / Math.max(1, editor.scrollHeight - editor.clientHeight)
    preview.scrollTop = scrollRatio * Math.max(1, preview.scrollHeight - preview.clientHeight)
    isScrolling = false
  }
}

/**
 * 预览滚动同步到编辑器
 */
const syncPreviewScroll = () => {
  if (previewMode.value !== 'split' || isScrolling) return

  const editor = splitEditorRef.value
  const preview = splitPreviewRef.value

  if (editor && preview) {
    isScrolling = true
    const scrollRatio = preview.scrollTop / Math.max(1, preview.scrollHeight - preview.clientHeight)
    editor.scrollTop = scrollRatio * Math.max(1, editor.scrollHeight - editor.clientHeight)
    isScrolling = false
  }
}

/**
 * 输入处理
 */
const handleInput = () => {
  // 自动保存等逻辑
}

/**
 * 键盘快捷键
 */
const handleKeydown = (e) => {
  // Ctrl/Cmd + S 保存
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault()
    message.success('内容已保存')
  }

  // Ctrl/Cmd + B 粗体
  if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
    e.preventDefault()
    insertMarkdown('**', '**')
  }

  // Ctrl/Cmd + I 斜体
  if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
    e.preventDefault()
    insertMarkdown('*', '*')
  }

  // Ctrl/Cmd + = 放大字体
  if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) {
    e.preventDefault()
    editorFontSize.value = Math.min(28, editorFontSize.value + 1)
  }

  // Ctrl/Cmd + - 缩小字体
  if ((e.ctrlKey || e.metaKey) && e.key === '-') {
    e.preventDefault()
    editorFontSize.value = Math.max(10, editorFontSize.value - 1)
  }

  // Ctrl/Cmd + 0 重置字体和分屏
  if ((e.ctrlKey || e.metaKey) && e.key === '0') {
    e.preventDefault()
    editorFontSize.value = 14
    splitRatio.value = 50
    message.success('已重置字体和分屏比例')
  }

  // Tab 键处理
  if (e.key === 'Tab') {
    e.preventDefault()
    insertMarkdown('  ', '')
  }
}

/**
 * 导出处理
 */
const handleExport = (key) => {
  if (!content.value) {
    message.warning('内容为空，无法导出')
    return
  }

  switch (key) {
    case 'markdown':
      exportMarkdown()
      break
    case 'html':
      exportHTML()
      break
    case 'pdf':
      exportPDF()
      break
  }
}

const exportMarkdown = () => {
  const blob = new Blob([content.value], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `document-${Date.now()}.md`
  link.click()
  URL.revokeObjectURL(url)
  message.success('Markdown 文件已导出')
}

const exportHTML = () => {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/${selectedTheme.value}.min.css">
  <style>
    body {
      max-width: 800px;
      margin: 40px auto;
      padding: 0 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.6;
      color: #333;
    }
    img { max-width: 100%; }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
    }
    pre {
      background: #f4f4f4;
      padding: 16px;
      border-radius: 6px;
      overflow-x: auto;
    }
    pre code { background: none; padding: 0; }
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

const exportPDF = () => {
  // 这里可以集成 html2pdf 等库来实现 PDF 导出
  message.info('PDF 导出功能开发中...')
}

// 监听预览模式变化
watch(() => previewMode.value, (newMode) => {
  if (newMode === 'split') {
    nextTick(() => {
      syncScroll()
    })
  }
})

// 监听内容变化，确保预览实时更新
watch(() => content.value, () => {
  // 内容变化时，预览通过计算属性自动更新
  // 如果在分屏模式，同步滚动位置
  if (previewMode.value === 'split') {
    nextTick(() => {
      syncScroll()
    })
  }
}, { debounce: 50 })

// 生命周期
onMounted(() => {
  // 初始化加载主题 CSS
  loadThemeCSS(selectedTheme.value)

  // 可以在这里加载本地存储的内容
  nextTick(() => {
    syncScroll()
  })
})
</script>

<style scoped>
.markdown-editor-page {
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
  margin-bottom: 24px;
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
  margin: 0 0 16px 0;
}

.shortcuts-info {
  margin-top: 12px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.toolbar-card {
  margin-bottom: 16px;
}

.editor-card {
  min-height: 700px;
  position: relative;
  transition: all 0.3s ease;
}

.editor-card.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  margin: 0;
  border-radius: 0;
  min-height: 100vh;
}

.editor-container,
.preview-container {
  height: 700px;
  position: relative;
}

.split-container {
  display: flex;
  flex-direction: row;
  height: 700px;
  gap: 0;
  background: var(--n-border-color);
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
}

.editor-pane {
  overflow: hidden;
  background: var(--n-color);
  border-right: 1px solid var(--n-border-color);
  min-width: 200px;
  flex-basis: var(--editor-width, 50%);
  flex-shrink: 0;
}

.preview-pane {
  overflow: hidden;
  background: var(--n-color);
  min-width: 200px;
  flex: 1;
  flex-shrink: 1;
}

.editor-wrapper {
  display: flex;
  height: 100%;
  position: relative;
}

.markdown-textarea {
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Fira Code', monospace;
  font-size: v-bind(editorFontSize + 'px');
  line-height: 1.6;
  padding: 16px;
  background: var(--n-color);
  color: var(--n-text-color);
  tab-size: 2;
  white-space: pre;
  word-wrap: break-word;
  transition: font-size 0.2s ease;
}

.line-numbers {
  width: 50px;
  background: var(--n-color-hover);
  border-right: 1px solid var(--n-border-color);
  padding: 16px 8px;
  text-align: right;
  user-select: none;
  overflow: hidden;
  position: sticky;
  top: 0;
}

.line-number {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: v-bind(editorFontSize + 'px');
  line-height: 1.6;
  color: var(--n-text-color-3);
  height: v-bind((editorFontSize * 1.6) + 'px');
  transition: font-size 0.2s ease;
}

.markdown-preview {
  height: 100%;
  overflow-y: auto;
  padding: 24px;
  font-size: v-bind(previewFontSize + 'px');
  line-height: 1.8;
  color: var(--n-text-color);
  word-wrap: break-word;
  transition: font-size 0.2s ease;
}

/* 主题样式 - 轻色主题 */
.preview-theme-github {
  background: #ffffff;
  color: #24292e;
}

.preview-theme-github-dark {
  background: #0d1117;
  color: #c9d1d9;
}

.preview-theme-vs2015 {
  background: #1e1e1e;
  color: #d4d4d4;
}

.preview-theme-vs-dark {
  background: #1e1e1e;
  color: #d4d4d4;
}

.preview-theme-xcode {
  background: #ffffff;
  color: #000000;
}

.preview-theme-solarized-light {
  background: #fdf6e3;
  color: #657b83;
}

.preview-theme-atom-one-light {
  background: #fafafa;
  color: #383a42;
}

.preview-theme-idea {
  background: #ffffff;
  color: #000000;
}

/* 主题样式 - 暗色主题 */
.preview-theme-monokai {
  background: #272822;
  color: #f8f8f2;
}

.preview-theme-dracula {
  background: #282a36;
  color: #f8f8f2;
}

.preview-theme-atom-one-dark {
  background: #282c34;
  color: #abb2bf;
}

.preview-theme-solarized-dark {
  background: #002b36;
  color: #839496;
}

.preview-theme-tokyo-night-dark {
  background: #1a1b26;
  color: #c0caf5;
}

.preview-theme-one-pro {
  background: #1e1e2e;
  color: #e1e1e6;
}

/* 深色背景主题统一样式优化 */
.markdown-preview {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.markdown-preview :deep(pre) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.markdown-preview :deep(code) {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 代码块主题适配 */
.preview-theme-github :deep(code:not(pre code)),
.preview-theme-atom-one-light :deep(code:not(pre code)),
.preview-theme-solarized-light :deep(code:not(pre code)),
.preview-theme-idea :deep(code:not(pre code)) {
  background: #f6f8fa;
  color: #24292e;
}

.preview-theme-github-dark :deep(code:not(pre code)),
.preview-theme-dracula :deep(code:not(pre code)),
.preview-theme-atom-one-dark :deep(code:not(pre code)),
.preview-theme-monokai :deep(code:not(pre code)),
.preview-theme-tokyo-night-dark :deep(code:not(pre code)),
.preview-theme-solarized-dark :deep(code:not(pre code)) {
  background: rgba(255, 255, 255, 0.1);
  color: #f8f8f2;
}

/* Markdown 预览样式 */
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
  position: relative;
}

.markdown-preview :deep(code) {
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 14px;
}

.markdown-preview :deep(pre code) {
  padding: 16px;
  background: none;
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

.markdown-preview :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
}

.markdown-preview :deep(th),
.markdown-preview :deep(td) {
  border: 1px solid var(--n-border-color);
  padding: 8px 12px;
  text-align: left;
}

.markdown-preview :deep(th) {
  background: var(--n-color-hover);
  font-weight: 600;
}

.quick-toolbar {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--n-color);
  border: 1px solid var(--n-border-color);
  border-radius: 8px;
  padding: 4px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.theme-preview {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid var(--n-border-color);
}

.ratio-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 响应式 - 仅在极小屏幕上改为上下布局 */
@media (max-width: 480px) {
  .page-title {
    font-size: 20px;
  }

  .page-subtitle {
    font-size: 12px;
  }

  .shortcuts-info {
    font-size: 12px;
  }

  .content-container {
    padding: 0 12px;
  }

  .split-container {
    flex-direction: column;
    height: auto;
  }

  .editor-pane,
  .preview-pane {
    width: 100% !important;
    height: 400px;
  }

  .editor-container,
  .preview-container {
    height: 400px;
  }

  .editor-card {
    min-height: auto;
  }

  .quick-toolbar {
    position: static;
    margin-top: 8px;
    justify-content: center;
  }
}

/* 滚动条样式 */
.markdown-textarea::-webkit-scrollbar,
.markdown-preview::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.markdown-textarea::-webkit-scrollbar-track,
.markdown-preview::-webkit-scrollbar-track {
  background: var(--n-color-hover);
}

.markdown-textarea::-webkit-scrollbar-thumb,
.markdown-preview::-webkit-scrollbar-thumb {
  background: var(--n-color-pressed);
  border-radius: 3px;
}

.markdown-textarea::-webkit-scrollbar-thumb:hover,
.markdown-preview::-webkit-scrollbar-thumb:hover {
  background: var(--n-color-pressed);
}
</style>