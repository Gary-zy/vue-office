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
  if (!documentUrl.value.trim()) {
    error.value = '请输入文档链接'
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
  
  // 检查图片加载状态
  setTimeout(() => {
    checkImageLoadingIssues()
  }, 1000)
}

/**
 * @description 检查图片加载问题并自动修复
 */
const checkImageLoadingIssues = () => {
  const docxContainer = document.querySelector('.preview-wrapper')
  if (!docxContainer) return
  
  const images = docxContainer.querySelectorAll('img')
  const totalImages = images.length
  
  console.log(`📊 DOCX 图片统计: 总共 ${totalImages} 张图片`)
  console.log('🔍 开始检查每张图片的加载状态...')
  
  const imageStatus = {
    loaded: [],
    failed: [],
    loading: []
  }
  
  // 收集图片状态
  const collectImageStatus = async () => {
    for (let i = 0; i < images.length; i++) {
      const img = images[i]
      const status = {
        index: i + 1,
        src: img.src,
        alt: img.alt || '无描述',
        width: img.width,
        height: img.height,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      }
      
      if (img.complete) {
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
          imageStatus.loaded.push(status)
        } else {
          const failureAnalysis = await analyzeImageFailure(img, i + 1)
          imageStatus.failed.push({
            ...status,
            failureReason: failureAnalysis
          })
        }
      } else {
        imageStatus.loading.push(status)
      }
    }
  }
  
  // 自动修复失败的图片
  const fixFailedImages = async () => {
    if (imageStatus.failed.length === 0) return
    
    console.log(`🔧 开始自动修复 ${imageStatus.failed.length} 张失败的图片...`)
    
    let fixedCount = 0
    let failedToFixCount = 0
    
    // 等待图片加载的辅助函数
    const waitForImageLoad = (img, newSrc) => {
      return new Promise((resolve) => {
        const onLoad = () => {
          img.removeEventListener('load', onLoad)
          img.removeEventListener('error', onError)
          resolve(true)
        }
        
        const onError = () => {
          img.removeEventListener('load', onLoad)
          img.removeEventListener('error', onError)
          resolve(false)
        }
        
        img.addEventListener('load', onLoad)
        img.addEventListener('error', onError)
        
        // 设置新的src
        img.src = newSrc
        
        // 如果图片已经加载完成，立即触发
        if (img.complete) {
          if (img.naturalWidth > 0) {
            onLoad()
          } else {
            onError()
          }
        }
        
        // 设置超时
        setTimeout(() => {
          img.removeEventListener('load', onLoad)
          img.removeEventListener('error', onError)
          resolve(false)
        }, 5000)
      })
    }
    
    for (const failedImg of imageStatus.failed) {
      try {
        const imgElement = images[failedImg.index - 1]
        const fixedSrc = await fixImageBlob(imgElement.src, failedImg.index)
        
        if (fixedSrc) {
          console.log(`🔄 正在替换图片 ${failedImg.index} 的源地址...`)
          
          // 等待图片加载完成
          const loadSuccess = await waitForImageLoad(imgElement, fixedSrc)
          
          if (loadSuccess) {
            fixedCount++
            console.log(`✅ 图片 ${failedImg.index} 修复并加载成功`)
          } else {
            failedToFixCount++
            console.log(`❌ 图片 ${failedImg.index} 修复后仍无法加载`)
          }
        } else {
          failedToFixCount++
          console.log(`❌ 图片 ${failedImg.index} 修复失败`)
        }
      } catch (error) {
        failedToFixCount++
        console.log(`❌ 图片 ${failedImg.index} 修复出错:`, error.message)
      }
    }
    
    console.log(`🎉 修复完成! 成功: ${fixedCount} 张, 失败: ${failedToFixCount} 张`)
    
    if (fixedCount > 0) {
      console.log(`✨ ${fixedCount} 张图片已成功修复并显示在预览中`)
    }
    
    if (failedToFixCount > 0) {
      console.log(`⚠️ ${failedToFixCount} 张图片修复失败，可能需要手动处理`)
    }
  }
  
  // 执行检查和修复
  collectImageStatus().then(() => {
    // 显示初始状态
    console.log(`📈 图片加载状态统计:`)
    console.log(`   ✅ 已成功加载: ${imageStatus.loaded.length} 张`)
    console.log(`   ❌ 加载失败: ${imageStatus.failed.length} 张`)
    console.log(`   ⏳ 正在加载: ${imageStatus.loading.length} 张`)
    
    // 自动修复失败的图片
    fixFailedImages()
    
    if (imageStatus.failed.length === 0 && imageStatus.loading.length === 0) {
      console.log('🎊 所有图片加载完成!')
    }
  })
}

/**
 * @description 修复图片 blob 的 MIME 类型
 * @param {string} blobUrl - 原始 blob URL
 * @param {number} index - 图片索引
 * @returns {Promise<string|null>} 修复后的 blob URL
 */
const fixImageBlob = async (blobUrl, index) => {
  try {
    if (!blobUrl.startsWith('blob:')) {
      return null
    }
    
    // 获取原始 blob 数据
    const response = await fetch(blobUrl)
    const arrayBuffer = await response.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    
    // 显示调试信息
    const headerBytes = Array.from(uint8Array.slice(0, 16))
      .map(b => b.toString(16).padStart(2, '0'))
      .join(' ')
    console.log(`🔍 图片 ${index} 数据头 (${uint8Array.length} 字节): ${headerBytes}`)
    
    // 检测图片格式
    let mimeType = detectImageMimeType(uint8Array)
    
    if (!mimeType) {
      console.log(`⚠️ 图片 ${index}: 无法检测到有效的图片格式，尝试回退策略`)
      
      // 回退策略：尝试常见的MIME类型
      const fallbackTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp']
      
      for (const fallbackType of fallbackTypes) {
        try {
          const testBlob = new Blob([arrayBuffer], { type: fallbackType })
          const testUrl = URL.createObjectURL(testBlob)
          
          // 创建临时图片元素测试是否能加载
          const testImg = new Image()
          const canLoad = await new Promise((resolve) => {
            testImg.onload = () => resolve(true)
            testImg.onerror = () => resolve(false)
            testImg.src = testUrl
            
            // 设置超时
            setTimeout(() => resolve(false), 1000)
          })
          
          URL.revokeObjectURL(testUrl)
          
          if (canLoad) {
            mimeType = fallbackType
            console.log(`✅ 图片 ${index}: 回退策略成功，使用 ${fallbackType}`)
            break
          }
        } catch (e) {
          continue
        }
      }
    }
    
    if (!mimeType) {
      console.log(`❌ 图片 ${index}: 所有检测方法都失败了`)
      return null
    }
    
    // 创建带有正确 MIME 类型的新 blob
    const blob = new Blob([arrayBuffer], { type: mimeType })
    const newBlobUrl = URL.createObjectURL(blob)
    
    console.log(`🔧 图片 ${index}: 检测到格式 ${mimeType}，创建新的 blob URL`)
    
    return newBlobUrl
  } catch (error) {
    console.error(`❌ 修复图片 ${index} 时出错:`, error)
    return null
  }
}

/**
 * @description 通过文件头检测图片 MIME 类型
 * @param {Uint8Array} bytes - 图片字节数据
 * @returns {string|null} MIME 类型
 */
const detectImageMimeType = (bytes) => {
  if (bytes.length < 4) return null
  
  // PNG: 89 50 4E 47
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) {
    return 'image/png'
  }
  
  // JPEG: FF D8 FF
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
    return 'image/jpeg'
  }
  
  // GIF: 47 49 46 38 (GIF8)
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) {
    return 'image/gif'
  }
  
  // WebP: 52 49 46 46 ... 57 45 42 50
  if (bytes.length >= 12 && 
      bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
    return 'image/webp'
  }
  
  // BMP: 42 4D
  if (bytes[0] === 0x42 && bytes[1] === 0x4D) {
    return 'image/bmp'
  }
  
  // TIFF: 49 49 2A 00 或 4D 4D 00 2A
  if ((bytes[0] === 0x49 && bytes[1] === 0x49 && bytes[2] === 0x2A && bytes[3] === 0x00) ||
      (bytes[0] === 0x4D && bytes[1] === 0x4D && bytes[2] === 0x00 && bytes[3] === 0x2A)) {
    return 'image/tiff'
  }
  
  // ICO: 00 00 01 00
  if (bytes[0] === 0x00 && bytes[1] === 0x00 && bytes[2] === 0x01 && bytes[3] === 0x00) {
    return 'image/x-icon'
  }
  
  // EMF (Enhanced Metafile): 01 00 00 00
  if (bytes.length >= 8 && bytes[0] === 0x01 && bytes[1] === 0x00 && bytes[2] === 0x00 && bytes[3] === 0x00) {
    // 进一步检查EMF签名
    if (bytes.length >= 44) {
      // EMF签名通常在偏移40处有特定标识
      return 'image/emf'
    }
  }
  
  // WMF (Windows Metafile): D7 CD C6 9A 或 01 00 09 00
  if ((bytes[0] === 0xD7 && bytes[1] === 0xCD && bytes[2] === 0xC6 && bytes[3] === 0x9A) ||
      (bytes[0] === 0x01 && bytes[1] === 0x00 && bytes[2] === 0x09 && bytes[3] === 0x00)) {
    return 'image/wmf'
  }
  
  // SVG: 检查是否以 < 开头 (可能是SVG)
  if (bytes[0] === 0x3C) {
    const text = new TextDecoder('utf-8').decode(bytes.slice(0, Math.min(100, bytes.length)))
    if (text.includes('<svg') || text.includes('<?xml')) {
      return 'image/svg+xml'
    }
  }
  
  // AVIF: 检查 ftyp 盒子
  if (bytes.length >= 12 && bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) {
    const brand = String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11])
    if (brand === 'avif' || brand === 'avis') {
      return 'image/avif'
    }
  }
  
  // HEIC/HEIF: 检查 ftyp 盒子
  if (bytes.length >= 12 && bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) {
    const brand = String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11])
    if (brand === 'heic' || brand === 'heix' || brand === 'heif' || brand === 'mif1') {
      return 'image/heic'
    }
  }
  
  return null
}

/**
 * @description 分析图片加载失败的具体原因
 * @param {HTMLImageElement} img - 图片元素
 * @param {number} index - 图片索引
 * @returns {Promise<string>} 失败原因描述
 */
const analyzeImageFailure = async (img, index) => {
  const src = img.src
  
  // 检查 src 格式
  if (!src || src === '') {
    return 'src 属性为空'
  }
  
  if (src.startsWith('blob:')) {
    try {
      // 尝试通过 fetch 检查 blob URL 是否有效
      const response = await fetch(src)
      if (!response.ok) {
        return `blob URL 无效 (状态: ${response.status})`
      }
      
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.startsWith('image/')) {
        return `blob 内容类型错误: ${contentType || '未知'}`
      }
      
      const blob = await response.blob()
      if (blob.size === 0) {
        return 'blob 内容为空'
      }
      
      return `blob URL 有效但图片解析失败 (大小: ${blob.size} bytes, 类型: ${contentType})`
    } catch (error) {
      return `blob URL 访问失败: ${error.message}`
    }
  } else if (src.startsWith('data:')) {
    // 检查 data URL
    const parts = src.split(',')
    if (parts.length !== 2) {
      return 'data URL 格式错误'
    }
    
    const header = parts[0]
    const data = parts[1]
    
    if (!header.includes('image/')) {
      return `data URL 不是图片类型: ${header}`
    }
    
    if (!data || data.length === 0) {
      return 'data URL 数据为空'
    }
    
    return `data URL 有效但图片解析失败 (数据长度: ${data.length})`
  } else {
    return `不支持的图片 URL 格式: ${src.substring(0, 50)}...`
  }
}

/**
 * @description 文档加载错误回调
 * @param {Error} err - 错误对象
 */
const onDocumentError = (err) => {
  loading.value = false
  
  // 详细的错误信息
  let errorMessage = '文档加载失败'
  let debugInfo = {
    originalError: err,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    documentSrc: typeof documentSrc.value === 'string' ? documentSrc.value.substring(0, 100) : 'ArrayBuffer'
  }
  
  if (err.message) {
    errorMessage += `: ${err.message}`
    
    // 针对常见错误提供解决建议
    if (err.message.includes('network') || err.message.includes('fetch')) {
      errorMessage += '\n💡 建议: 检查网络连接或文件链接是否有效'
    } else if (err.message.includes('parse') || err.message.includes('format')) {
      errorMessage += '\n💡 建议: 文件可能损坏或格式不支持，请尝试其他 DOCX 文件'
    } else if (err.message.includes('cors') || err.message.includes('origin')) {
      errorMessage += '\n💡 建议: 跨域问题，请使用本地文件上传方式'
    }
  }
  
  error.value = errorMessage
  
  console.group('🔍 DOCX 文档加载错误详情')
  console.error('错误对象:', err)
  console.log('调试信息:', debugInfo)
  console.log('🛠️  调试建议:')
  console.log('1. 检查文件是否为有效的 .docx 格式')
  console.log('2. 尝试用 Microsoft Word 打开原文件确认无损坏')
  console.log('3. 如果是在线链接，检查是否存在跨域限制')
  console.log('4. 查看浏览器网络面板是否有请求失败')
  console.groupEnd()
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