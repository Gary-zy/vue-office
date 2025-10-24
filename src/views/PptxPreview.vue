<template>
  <div class="pptx-preview">
    <div class="header">
      <h1>PPTX 演示文稿预览</h1>
      <p>支持本地上传和在线链接预览</p>
    </div>

    <div class="controls">
      <div class="upload-section">
        <h3>本地文件上传</h3>
        <input
          type="file"
          ref="fileInput"
          accept=".pptx,.ppt"
          @change="handleFileUpload"
          class="file-input"
        />
        <button @click="triggerFileSelect" class="upload-btn">
          选择 PPTX 文件
        </button>
      </div>

      <div class="url-section">
        <h3>在线链接预览</h3>
        <div class="url-input-group">
          <input
            v-model="documentUrl"
            type="url"
            placeholder="请输入 PPTX 文件链接"
            class="url-input"
          />
          <button @click="loadFromUrl" class="load-btn">
            加载预览
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <p>正在加载演示文稿...</p>
    </div>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="clearError" class="clear-btn">清除错误</button>
    </div>

    <div v-if="documentSrc && !loading" class="preview-container">
      <h3>演示文稿预览</h3>
      <VueOfficePptx
        :src="documentSrc"
        style="height: 100vh;"
        @rendered="onDocumentRendered"
        @error="onDocumentError"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueOfficePptx from '@vue-office/pptx'

// 响应式数据
const fileInput = ref(null)
const documentSrc = ref('')
const documentUrl = ref('')
const loading = ref(false)
const error = ref('')

/**
 * @description 触发文件选择器
 */
const triggerFileSelect = () => {
  fileInput.value?.click()
}

/**
 * @description 处理本地文件上传
 * @param {Event} event - 文件输入事件
 */
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // 验证文件类型
    if (!file.name.toLowerCase().endsWith('.pptx')) {
      error.value = '请选择 .pptx 格式的文件'
      return
    }
    
    loading.value = true
    error.value = ''
    
    // 使用 FileReader 读取文件的 ArrayBuffer
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = () => {
      documentSrc.value = fileReader.result
      loading.value = false
    }
    fileReader.onerror = () => {
      error.value = '文件读取失败'
      loading.value = false
    }
  }
}

/**
 * @description 从 URL 加载文档
 */
const loadFromUrl = () => {
  if (!documentUrl.value.trim()) {
    error.value = '请输入有效的文档链接'
    return
  }

  loading.value = true
  error.value = ''
  documentSrc.value = documentUrl.value.trim()
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
  error.value = `演示文稿加载失败: ${err.message || '未知错误'}`
  console.error('PPTX 演示文稿加载错误:', err)
}

/**
 * @description 清除错误信息
 */
const clearError = () => {
  error.value = ''
}
</script>

<style scoped>
.pptx-preview {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.header p {
  color: #7f8c8d;
  font-size: 16px;
}

.controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.upload-section,
.url-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.upload-section h3,
.url-section h3 {
  color: #2c3e50;
  margin: 0;
  font-size: 18px;
}

.file-input {
  display: none;
}

.upload-btn,
.load-btn,
.clear-btn {
  padding: 12px 24px;
  background: #f39c12;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.upload-btn:hover,
.load-btn:hover {
  background: #e67e22;
}

.clear-btn {
  background: #e74c3c;
}

.clear-btn:hover {
  background: #c0392b;
}

.url-input-group {
  display: flex;
  gap: 10px;
}

.url-input {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.url-input:focus {
  outline: none;
  border-color: #f39c12;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #f39c12;
  font-size: 18px;
}

.error {
  background: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-container {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.preview-container h3 {
  background: #f8f9fa;
  margin: 0;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .controls {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .url-input-group {
    flex-direction: column;
  }
}
</style>