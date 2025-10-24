<template>
  <div class="excel-preview">
    <div class="header">
      <h1>Excel 表格预览</h1>
      <p>支持本地上传和在线链接预览</p>
    </div>

    <div class="controls">
      <div class="upload-section">
        <h3>本地文件上传</h3>
        <input
          type="file"
          ref="fileInput"
          accept=".xlsx,.xls"
          @change="handleFileUpload"
          class="file-input"
        />
        <button @click="triggerFileSelect" class="upload-btn">
          选择 Excel 文件
        </button>
      </div>

      <div class="url-section">
        <h3>在线链接预览</h3>
        <div class="url-input-group">
          <input
            v-model="documentUrl"
            type="url"
            placeholder="请输入 Excel 文件链接"
            class="url-input"
          />
          <button @click="loadFromUrl" class="load-btn">
            加载预览
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <p>正在加载表格...</p>
    </div>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="clearError" class="clear-btn">清除错误</button>
    </div>

    <div v-if="documentSrc && !loading" class="preview-container">
      <h3>表格预览</h3>
      <VueOfficeExcel
        :src="documentSrc"
        :options="excelOptions"
        style="height: 100vh;"
        @rendered="onDocumentRendered"
        @error="onDocumentError"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'

// 响应式数据
const fileInput = ref(null)
const documentSrc = ref('')
const documentUrl = ref('')
const loading = ref(false)
const error = ref('')

/**
 * @description Excel 预览配置选项
 */
const excelOptions = ref({
  xls: false, // 默认为 xlsx 格式，根据文件类型动态调整
  minColLength: 0,
  minRowLength: 0,
  widthOffset: 10,
  heightOffset: 10
})

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
    const fileName = file.name.toLowerCase()
    if (!fileName.endsWith('.xlsx') && !fileName.endsWith('.xls')) {
      error.value = '请选择 .xlsx 或 .xls 格式的文件'
      return
    }
    
    // 根据文件扩展名设置正确的格式配置
    excelOptions.value.xls = fileName.endsWith('.xls')
    
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
 * @description 从URL加载Excel文件
 */
const loadFromUrl = async () => {
  if (!documentUrl.value.trim()) {
    error.value = '请输入有效的文件链接'
    return
  }

  loading.value = true
  error.value = ''
  
  // 根据文件扩展名设置Excel选项
  const url = documentUrl.value.trim().toLowerCase()
  if (url.endsWith('.xlsx') || url.endsWith('.xlsm')) {
    excelOptions.value.xls = false
  } else if (url.endsWith('.xls')) {
    excelOptions.value.xls = true
  }
  
  try {
    // 通过 fetch 获取文件的二进制数据
    const response = await fetch(documentUrl.value.trim())
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    // 将响应转换为 ArrayBuffer
    const arrayBuffer = await response.arrayBuffer()
    documentSrc.value = arrayBuffer
    
    // 注意：loading状态将在onDocumentRendered或onDocumentError中设置为false
    
  } catch (err) {
    loading.value = false
    
    // 检测是否为CORS错误
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      error.value = '跨域访问被阻止。请尝试以下解决方案：\n1. 使用本地文件上传功能\n2. 确保文件服务器支持CORS\n3. 使用代理服务器访问文件'
    } else {
      error.value = `文件加载失败: ${err.message}`
    }
    
    console.error('Excel 文件加载错误:', err)
    return
  }
}

/**
 * @description 文档渲染完成回调
 */
const onDocumentRendered = () => {
  loading.value = false
  console.log('Excel 表格渲染完成')
}

/**
 * @description 文档加载错误回调
 * @param {Error} err - 错误对象
 */
const onDocumentError = (err) => {
  loading.value = false
  error.value = `表格加载失败: ${err.message || '未知错误'}`
  console.error('Excel 表格加载错误:', err)
}

/**
 * @description 清除错误信息
 */
const clearError = () => {
  error.value = ''
}
</script>

<style scoped>
.excel-preview {
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
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.upload-btn:hover,
.load-btn:hover {
  background: #229954;
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
  border-color: #27ae60;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #27ae60;
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