<template>
  <div class="pptx-preview">
    <!-- 页面标题 -->
    <n-space vertical size="large" align="center">
      <n-space vertical size="medium" align="center">
        <n-h1 class="gradient-text">PPTX 演示文稿预览</n-h1>
        <n-p class="subtitle">支持本地上传和在线链接预览</n-p>
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
                accept=".pptx,.ppt"
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
                    支持 .pptx、.ppt 格式的演示文稿文件
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
                选择 PPTX 文件
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
                placeholder="请输入 PPTX 文件链接"
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
          <n-text>正在加载演示文稿...</n-text>
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
      
      <!-- 预览容器 -->
      <n-card 
        v-if="documentSrc && !loading" 
        title="演示文稿预览"
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
          <VueOfficePptx
            v-if="shouldShowDocument"
            :key="documentSrc"
            :src="documentSrc"
            style="height: 70vh; width: 100%;"
            @rendered="onDocumentRendered"
            @error="onDocumentError"
          />
        </div>
      </n-card>
    </n-space>
  </div>
</template>

<script setup>
import { ref, h, computed, nextTick } from 'vue'
import { 
  NCard, 
  NSpace, 
  NH1, 
  NP, 
  NGrid, 
  NGridItem, 
  NUpload, 
  NUploadDragger, 
  NText, 
  NIcon, 
  NInput, 
  NButton, 
  NAlert, 
  NSpin, 
  NEmpty, 
  NTag, 
  NTooltip,
  useMessage, 
  useThemeVars 
} from 'naive-ui'
import { 
  DocumentTextOutline, 
  CloudUploadOutline, 
  LinkOutline, 
  CloudDownloadOutline,
  WarningOutline,
  CloseOutline
} from '@vicons/ionicons5'
import VueOfficePptx from '@vue-office/pptx'

/**
 * @description PPTX 演示文稿预览组件
 * 支持本地文件上传和在线链接预览
 */

// 响应式数据
const uploadRef = ref(null)
const documentSrc = ref('')
const documentUrl = ref('')
const loading = ref(false)
const error = ref('')

/**
 * @description 安全检查是否应该显示文档
 * 处理documentSrc可能是字符串或ArrayBuffer的情况
 */
const shouldShowDocument = computed(() => {
  if (!documentSrc.value) return false
  
  // 如果是字符串类型，检查trim后是否有内容
  if (typeof documentSrc.value === 'string') {
    return documentSrc.value.trim().length > 0
  }
  
  // 如果是ArrayBuffer类型，直接返回true（存在即可显示）
  if (documentSrc.value instanceof ArrayBuffer) {
    return true
  }
  
  return false
})

/**
 * @description 触发文件选择器
 */
const triggerFileSelect = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.pptx,.ppt'
  input.onchange = (e) => handleFileUpload({ fileList: e.target.files })
  input.click()
}

/**
 * @description 处理本地文件上传
 * @param {Object} options - 上传选项
 */
const handleFileUpload = (options) => {
  const file = options.fileList?.[0] || options.file?.file
  if (!file) return

  // 验证文件类型
  const fileName = file.name.toLowerCase()
  if (!fileName.endsWith('.pptx') && !fileName.endsWith('.ppt')) {
    error.value = '请选择 .pptx 或 .ppt 格式的文件'
    return
  }
  
  loading.value = true
  error.value = ''
  
  // 使用 FileReader 读取文件的 ArrayBuffer
  const fileReader = new FileReader()
  fileReader.readAsArrayBuffer(file)
  fileReader.onload = async () => {
    documentSrc.value = fileReader.result
    await nextTick()
    loading.value = false
  }
  fileReader.onerror = () => {
    error.value = '文件读取失败'
    loading.value = false
  }
}

/**
 * @description 从 URL 加载文档
 */
const loadFromUrl = async () => {
  if (!documentUrl.value.trim()) {
    error.value = '请输入有效的文档链接'
    return
  }

  loading.value = true
  error.value = ''
  documentSrc.value = documentUrl.value.trim()
  await nextTick()
  loading.value = false
}

/**
 * @description 文档渲染完成回调
 */
const onDocumentRendered = () => {
  loading.value = false
  console.log('PPTX 演示文稿渲染完成')
}

/**
 * @description 文档加载错误回调
 * @param {Error} err - 错误对象
 */
const onDocumentError = (err) => {
  loading.value = false
  // 更详细的错误处理
  if (err && err.message) {
    if (err.message.includes('parentNode')) {
      error.value = '文档渲染失败，请尝试重新上传文件'
    } else if (err.message.includes('network') || err.message.includes('fetch')) {
      error.value = '网络错误，请检查文件链接或网络连接'
    } else {
      error.value = `演示文稿加载失败: ${err.message}`
    }
  } else {
    error.value = '演示文稿加载失败，请检查文件格式或重试'
  }
  console.error('PPTX 演示文稿加载错误:', err)
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
const clearPreview = async () => {
  loading.value = true
  documentSrc.value = ''
  documentUrl.value = ''
  error.value = ''
  await nextTick()
  loading.value = false
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
.pptx-preview {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 4rem);
}

.gradient-text {
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
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

/* 响应式设计 */
@media (max-width: 768px) {
  .pptx-preview {
    padding: 1rem;
  }
  
  .gradient-text {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 16px;
  }
}

/* 深色主题适配 */
.dark .preview-wrapper {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>