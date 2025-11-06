<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="wang-editor-page">
      <n-layout>
        <n-layout-content class="editor-content">
          <div class="content-container">
            <!-- 页面标题 -->
            <div class="page-header">
              <h1 class="page-title">
                <n-icon :component="CreateOutline" />
                WangEditor 富文本编辑器
              </h1>
              <p class="page-subtitle">
                功能强大的富文本编辑器，支持图片、表格、代码块等
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
                      清空内容
                    </n-button>
                    <n-button @click="getHtml">
                      <template #icon>
                        <n-icon :component="CodeOutline" />
                      </template>
                      获取 HTML
                    </n-button>
                    <n-button @click="getText">
                      <template #icon>
                        <n-icon :component="DocumentTextOutline" />
                      </template>
                      获取纯文本
                    </n-button>
                  </n-space>
                  <n-space>
                    <n-text depth="3">字数: {{ wordCount }}</n-text>
                  </n-space>
                </n-space>

                <!-- 编辑器容器 -->
                <div class="editor-wrapper">
                  <!-- 工具栏容器 -->
                  <div ref="toolbarContainer" class="toolbar-container"></div>
                  <!-- 编辑器容器 -->
                  <div ref="editorContainer" class="editor-container"></div>
                </div>
              </n-space>
            </n-card>

            <!-- 功能说明 -->
            <n-card title="功能特性" style="margin-top: 24px">
              <n-list>
                <n-list-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>所见即所得</template>
                    <template #description>
                      提供直观的富文本编辑体验，支持格式化文本、图片、表格等
                    </template>
                  </n-thing>
                </n-list-item>
                <n-list-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>丰富的工具栏</template>
                    <template #description>
                      支持字体样式、对齐、列表、引用、代码块、表格等多种格式
                    </template>
                  </n-thing>
                </n-list-item>
                <n-list-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>轻量高效</template>
                    <template #description>
                      wangEditor 5 体积小巧，性能优异，适合各种项目
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
import { ref, onMounted, onBeforeUnmount, computed, shallowRef } from 'vue'
import { darkTheme, useMessage } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar } from '@wangeditor/editor'
import { 
  CreateOutline, 
  TrashOutline, 
  CodeOutline,
  DocumentTextOutline,
  CheckmarkCircleOutline
} from '@vicons/ionicons5'

/**
 * @description WangEditor 富文本编辑器页面
 */

const message = useMessage()
const themeStore = useThemeStore()

// 主题
const isDark = computed(() => themeStore.isDark)

// 编辑器实例
const editorContainer = ref(null)
const toolbarContainer = ref(null)
const editorRef = shallowRef()

// 字数统计
const wordCount = ref(0)

/**
 * @description 初始化编辑器
 */
const initEditor = () => {
  if (!editorContainer.value) return

  // 编辑器配置
  const editorConfig = {
    placeholder: '请输入内容...',
    onChange: (editor) => {
      wordCount.value = editor.getText().length
    },
    MENU_CONF: {
      // 配置上传图片
      uploadImage: {
        // 自定义上传，这里使用 base64
        customUpload: async (file, insertFn) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            insertFn(e.target.result, '', '')
          }
          reader.readAsDataURL(file)
        }
      }
    }
  }

  // 创建编辑器
  const editor = createEditor({
    selector: editorContainer.value,
    html: '<p>欢迎使用 <strong>WangEditor</strong> 富文本编辑器！</p><p>您可以：</p><ul><li>输入文字并设置样式</li><li>插入图片、表格</li><li>添加代码块</li><li>还有更多功能等你探索...</li></ul>',
    config: editorConfig,
    mode: 'default'
  })

  editorRef.value = editor

  // 工具栏配置
  const toolbarConfig = {
    toolbarKeys: [
      'headerSelect',
      '|',
      'bold',
      'italic',
      'underline',
      'through',
      '|',
      'color',
      'bgColor',
      '|',
      'fontSize',
      'fontFamily',
      'lineHeight',
      '|',
      'bulletedList',
      'numberedList',
      'todo',
      '|',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyJustify',
      '|',
      'insertLink',
      'uploadImage',
      'insertTable',
      'codeBlock',
      '|',
      'undo',
      'redo',
      '|',
      'fullScreen'
    ]
  }

  // 创建工具栏
  createToolbar({
    editor,
    selector: toolbarContainer.value,
    config: toolbarConfig,
    mode: 'default'
  })

  // 初始化字数
  wordCount.value = editor.getText().length
}

/**
 * @description 清空内容
 */
const clearContent = () => {
  if (editorRef.value) {
    editorRef.value.clear()
    message.success('内容已清空')
  }
}

/**
 * @description 获取 HTML
 */
const getHtml = () => {
  if (editorRef.value) {
    const html = editorRef.value.getHtml()
    console.log('HTML:', html)
    message.success('HTML 已输出到控制台')
    
    // 也可以下载为文件
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `document-${Date.now()}.html`
    link.click()
    URL.revokeObjectURL(url)
  }
}

/**
 * @description 获取纯文本
 */
const getText = () => {
  if (editorRef.value) {
    const text = editorRef.value.getText()
    console.log('Text:', text)
    message.success('文本已输出到控制台')
  }
}

onMounted(() => {
  initEditor()
})

onBeforeUnmount(() => {
  if (editorRef.value) {
    editorRef.value.destroy()
  }
})
</script>

<style scoped>
.wang-editor-page {
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
  border: 1px solid var(--n-border-color);
  border-radius: 8px;
  overflow: hidden;
}

.toolbar-container {
  border-bottom: 1px solid var(--n-border-color);
}

.editor-container {
  min-height: 500px;
  max-height: 800px;
  overflow-y: auto;
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
