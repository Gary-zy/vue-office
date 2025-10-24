<template>
  <div class="docx-preview">
    <!-- 页面标题 -->
    <n-space vertical size="large" align="center">
      <n-space vertical size="medium" align="center">
        <n-h1 class="gradient-text">Word 文档预览</n-h1>
        <n-p class="subtitle">支持本地上传和在线链接预览 (.docx)</n-p>
      </n-space>
      
      <!-- 控制面板 -->
      <n-grid cols="1 s:2" responsive="screen" :x-gap="24" :y-gap="24">
        <!-- 本地文件上传 -->
        <n-grid-item>
          <n-card title="本地文件上传" :bordered="false" size="small" hoverable>
            <n-space vertical size="medium">
              <n-upload
                ref="uploadRef"
                :max="1"
                accept=".docx"
                :show-file-list="false"
                @change="handleFileUpload"
                :custom-request="() => {}"
              >
                <n-upload-dragger>
                  <div style="margin-bottom: 12px">
                    <n-icon size="48" :depth="3">
                      <DocumentTextOutline />
                    </n-icon>
                  </div>
                  <n-text style="font-size: 16px">
                    点击或者拖动文件到该区域来上传
                  </n-text>
                  <n-p depth="3" style="margin: 8px 0 0 0">
                    支持 .doc 和 .docx 格式的文档文件
                  </n-p>
                </n-upload-dragger>
              </n-upload>
              
              <n-button 
                type="primary" 
                size="large" 
                block
                @click="triggerFileSelect"
                :render-icon="renderUploadIcon"
              >
                选择 Word 文件
              </n-button>
            </n-space>
          </n-card>
        </n-grid-item>
        
        <!-- 在线链接预览 -->
        <n-grid-item>
          <n-card title="在线链接预览" :bordered="false" size="small" hoverable>
            <n-space vertical size="medium">
              <n-input
                v-model:value="documentUrl"
                type="text"
                placeholder="请输入 Word 文件链接 (.doc / .docx)"
                size="large"
                clearable
                :input-props="{ type: 'url' }"
              >
                <template #prefix>
                  <n-icon :component="LinkOutline" />
                </template>
              </n-input>
              
              <n-button 
                type="primary" 
                size="large" 
                block
                @click="loadFromUrl"
                :loading="loading"
                :render-icon="renderLoadIcon"
              >
                加载预览
              </n-button>
            </n-space>
          </n-card>
        </n-grid-item>
      </n-grid>
      
      <!-- 加载状态 -->
      <n-spin v-if="loading" size="large">
        <template #description>
          <n-text>正在加载文档...</n-text>
        </template>
      </n-spin>
      
      <!-- 错误信息 -->
      <n-alert 
        v-if="error" 
        type="error" 
        :title="error"
        closable
        @close="clearError"
      >
        <template #icon>
          <n-icon :component="WarningOutline" />
        </template>
      </n-alert>
      
      <!-- DOCX 预览容器 -->
      <n-card 
        v-if="documentSrc && !loading && fileType === 'docx'" 
        title="DOCX 文档预览"
        :bordered="false"
        size="small"
        class="preview-card"
      >
        <template #header-extra>
          <n-button 
            quaternary 
            circle 
            type="primary"
            @click="clearPreview"
          >
            <template #icon>
              <n-icon :component="CloseOutline" />
            </template>
          </n-button>
        </template>
        
        <div class="preview-wrapper">
          <VueOfficeDocx
            :src="documentSrc"
            style="height: 70vh; width: 100%;"
            @rendered="onDocumentRendered"
            @error="onDocumentError"
          />
        </div>
      </n-card>

      <!-- DOC HTML 预览容器 -->
      <n-card 
        v-if="htmlContent && !loading && fileType === 'doc'" 
        title="DOC 文档预览"
        :bordered="false"
        size="small"
        class="preview-card"
      >
        <template #header-extra>
          <n-button 
            quaternary 
            circle 
            type="primary"
            @click="clearPreview"
          >
            <template #icon>
              <n-icon :component="CloseOutline" />
            </template>
          </n-button>
        </template>
        
        <div class="preview-wrapper doc-html-preview">
          <div v-html="htmlContent" class="doc-content"></div>
        </div>
      </n-card>
    </n-space>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'
import { 
  NCard, NSpace, NH1, NP, NGrid, NGridItem, NUpload, NUploadDragger, 
  NText, NIcon, NInput, NButton, NAlert, NSpin, NEmpty, NTag, NTooltip,
  useMessage, useThemeVars 
} from 'naive-ui'
import { 
  DocumentTextOutline, 
  CloudUploadOutline,
  CloudDownloadOutline, 
  InformationCircleOutline,
  CloseOutline
} from '@vicons/ionicons5'
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'

/**
 * @description Word 文档预览组件
 * 支持本地文件上传和在线链接预览 (.doc / .docx)
 */

// 响应式数据
const uploadRef = ref(null)
const documentSrc = ref('')
const documentUrl = ref('')
const htmlContent = ref('')
const fileType = ref('')
const loading = ref(false)
const error = ref('')

/**
 * @description 触发文件选择器
 */
const triggerFileSelect = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.doc,.docx'
  input.onchange = (e) => handleFileUpload({ fileList: e.target.files })
  input.click()
}

/**
 * @description 获取文件扩展名
 * @param {string} filename - 文件名
 * @returns {string} 文件扩展名
 */
const getFileExtension = (filename) => {
  return filename.toLowerCase().split('.').pop()
}

/**
 * @description 处理本地文件上传
 * @param {Object} options - 上传选项
 */
const handleFileUpload = (options) => {
  const file = options.fileList?.[0] || options.file?.file
  if (!file) return

  const extension = getFileExtension(file.name)
  if (!['doc', 'docx'].includes(extension)) {
    error.value = '请选择有效的 Word 文件 (.doc 或 .docx)'
    return
  }

  loading.value = true
  error.value = ''
  fileType.value = extension

  if (extension === 'docx') {
    // 处理 DOCX 文件
    handleDocxFile(file)
  } else if (extension === 'doc') {
    // 处理 DOC 文件
    handleDocFile(file)
  }
}

/**
 * @description 处理 DOCX 文件
 * @param {File} file - 文件对象
 */
const handleDocxFile = (file) => {
  const fileReader = new FileReader()
  fileReader.readAsArrayBuffer(file)
  fileReader.onload = () => {
    documentSrc.value = fileReader.result
    htmlContent.value = ''
    loading.value = false
  }
  fileReader.onerror = () => {
    error.value = 'DOCX 文件读取失败'
    loading.value = false
  }
}

/**
 * @description 处理 DOC 文件 - 显示不支持提示
 * @param {File} file - 文件对象
 */
const handleDocFile = (file) => {
  error.value = 'DOC 格式暂不支持预览。请将文件转换为 DOCX 格式后重试。\n\n转换方法：\n1. 使用 Microsoft Word 打开文件，另存为 DOCX 格式\n2. 使用在线转换工具（如 CloudConvert）\n3. 使用 LibreOffice 等免费办公软件'
  loading.value = false
}

/**
 * @description 从 URL 加载文档
 */
const loadFromUrl = async () => {
  if (!urlInput.value.trim()) {
    message.warning('请输入文档链接')
    return
  }

  loading.value = true
  error.value = ''
  
  try {
    const response = await fetch(urlInput.value)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const contentType = response.headers.get('content-type') || ''
    const url = urlInput.value.toLowerCase()
    
    if (url.includes('.docx') || contentType.includes('officedocument.wordprocessingml')) {
      // 处理 DOCX 文件
      fileType.value = 'docx'
      const arrayBuffer = await response.arrayBuffer()
      documentSrc.value = arrayBuffer
      htmlContent.value = ''
    } else if (url.includes('.doc') || contentType.includes('msword')) {
      // DOC 文件不支持
      fileType.value = 'doc'
      error.value = 'DOC 格式暂不支持在线预览。请将文件转换为 DOCX 格式后重试。'
      documentSrc.value = ''
      htmlContent.value = ''
    } else {
      throw new Error('不支持的文件格式，请使用 .docx 文件')
    }
    
    loading.value = false
  } catch (err) {
    error.value = `文档加载失败: ${err.message}`
    loading.value = false
  }
}

/**
 * @description 文档渲染完成回调
 */
const onDocumentRendered = () => {
  loading.value = false
  console.log('DOCX 文档渲染完成')
}

/**
 * @description 文档加载错误回调
 * @param {Error} err - 错误对象
 */
const onDocumentError = (err) => {
  loading.value = false
  error.value = `文档加载失败: ${err.message || '未知错误'}`
  console.error('DOCX 文档加载错误:', err)
}

/**
 * @description 清除错误信息
 */
const clearError = () => {
  error.value = ''
}

/**
 * @description 清除预览
 */
const clearPreview = () => {
  documentSrc.value = ''
  documentUrl.value = ''
  htmlContent.value = ''
  fileType.value = ''
  error.value = ''
}

/**
 * @description 渲染上传图标
 */
const renderUploadIcon = () => {
  return h(NIcon, null, {
    default: () => h(CloudUploadOutline)
  })
}

/**
 * @description 渲染加载图标
 */
const renderLoadIcon = () => {
  return h(NIcon, null, {
    default: () => h(CloudDownloadOutline)
  })
}
</script>

<style scoped>
.docx-preview {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 4rem);
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
}

.subtitle {
  font-size: 18px;
  opacity: 0.8;
}

.preview-card {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.preview-wrapper {
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.doc-html-preview {
  max-height: 70vh;
  overflow-y: auto;
}

.doc-content {
  padding: 20px;
  line-height: 1.6;
  font-family: 'Times New Roman', serif;
  color: #333;
}

.doc-content h1, .doc-content h2, .doc-content h3, 
.doc-content h4, .doc-content h5, .doc-content h6 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: bold;
}

.doc-content p {
  margin-bottom: 1em;
}

.doc-content ul, .doc-content ol {
  margin-left: 2em;
  margin-bottom: 1em;
}

.doc-content table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1em;
}

.doc-content table, .doc-content th, .doc-content td {
  border: 1px solid #ddd;
}

.doc-content th, .doc-content td {
  padding: 8px 12px;
  text-align: left;
}

.doc-content th {
  background-color: #f5f5f5;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .docx-preview {
    padding: 1rem;
  }
  
  .gradient-text {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 16px;
  }
  
  .doc-content {
    padding: 15px;
  }
}

/* 深色主题适配 */
.dark .preview-wrapper {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark .doc-content {
  color: #e0e0e0;
  background: rgba(255, 255, 255, 0.02);
}

.dark .doc-content th {
  background-color: rgba(255, 255, 255, 0.1);
}

.dark .doc-content table, .dark .doc-content th, .dark .doc-content td {
  border-color: rgba(255, 255, 255, 0.2);
}
</style>