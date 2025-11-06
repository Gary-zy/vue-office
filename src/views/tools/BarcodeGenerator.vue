<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="barcode-generator-page">
      <n-layout>
        <n-layout-content class="generator-content">
          <div class="content-container">
            <!-- 页面标题 -->
            <div class="page-header">
              <h1 class="page-title">
                <n-icon :component="QrCodeOutline" />
                条形码 & 二维码生成器
              </h1>
              <p class="page-subtitle">
                快速生成条形码和二维码，支持多种格式和自定义配置
              </p>
            </div>

            <!-- 二维码生成器 -->
            <n-card title="📱 二维码生成器">
              <n-space vertical :size="16">
                <!-- 输入区域 -->
                <n-form-item label="输入内容">
                  <n-input
                    v-model:value="qrContent"
                    type="textarea"
                    placeholder="请输入要生成二维码的内容（文本、网址、JSON等）"
                    :autosize="{ minRows: 3, maxRows: 6 }"
                  />
                </n-form-item>

                <!-- 配置选项 -->
                <n-grid :cols="4" :x-gap="16" responsive="screen">
                  <n-grid-item>
                    <n-form-item label="尺寸">
                      <n-input-number v-model:value="qrSize" :min="100" :max="1000" :step="50" style="width: 100%" />
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item>
                    <n-form-item label="容错率">
                      <n-select v-model:value="qrErrorLevel" :options="errorLevelOptions" />
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item>
                    <n-form-item label="前景色">
                      <n-color-picker v-model:value="qrForeground" :show-alpha="false" />
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item>
                    <n-form-item label="背景色">
                      <n-color-picker v-model:value="qrBackground" :show-alpha="false" />
                    </n-form-item>
                  </n-grid-item>
                </n-grid>

                <!-- 操作按钮 -->
                <n-space>
                  <n-button type="primary" @click="generateQRCode">
                    <template #icon>
                      <n-icon :component="CreateOutline" />
                    </template>
                    生成二维码
                  </n-button>
                  <n-button @click="downloadQRCode">
                    <template #icon>
                      <n-icon :component="DownloadOutline" />
                    </template>
                    下载二维码
                  </n-button>
                  <n-button @click="copyQRCodeImage">
                    <template #icon>
                      <n-icon :component="CopyOutline" />
                    </template>
                    复制图片
                  </n-button>
                </n-space>

                <!-- 二维码显示 -->
                <div class="code-display-container">
                  <canvas ref="qrCanvas" class="code-canvas"></canvas>
                  <n-empty v-if="!qrGenerated" description="请输入内容并点击生成按钮" />
                </div>
              </n-space>
            </n-card>

            <!-- 条形码生成器 -->
            <n-card title="🏷️ 条形码生成器" style="margin-top: 24px">
              <n-space vertical :size="16">
                <!-- 输入区域 -->
                <n-form-item label="输入内容">
                  <n-input
                    v-model:value="barcodeContent"
                    placeholder="请输入要生成条形码的内容（数字、字母等）"
                  />
                </n-form-item>

                <!-- 配置选项 -->
                <n-grid :cols="4" :x-gap="16" responsive="screen">
                  <n-grid-item>
                    <n-form-item label="条形码格式">
                      <n-select v-model:value="barcodeFormat" :options="barcodeFormatOptions" />
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item>
                    <n-form-item label="宽度">
                      <n-input-number v-model:value="barcodeWidth" :min="1" :max="5" :step="0.5" style="width: 100%" />
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item>
                    <n-form-item label="高度">
                      <n-input-number v-model:value="barcodeHeight" :min="30" :max="200" :step="10" style="width: 100%" />
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item>
                    <n-form-item label="显示文本">
                      <n-switch v-model:value="barcodeDisplayValue" />
                    </n-form-item>
                  </n-grid-item>
                </n-grid>

                <!-- 操作按钮 -->
                <n-space>
                  <n-button type="primary" @click="generateBarcode">
                    <template #icon>
                      <n-icon :component="CreateOutline" />
                    </template>
                    生成条形码
                  </n-button>
                  <n-button @click="downloadBarcode">
                    <template #icon>
                      <n-icon :component="DownloadOutline" />
                    </template>
                    下载条形码
                  </n-button>
                </n-space>

                <!-- 条形码显示 -->
                <div class="code-display-container">
                  <svg ref="barcodeSvg" class="barcode-svg"></svg>
                  <n-empty v-if="!barcodeGenerated" description="请输入内容并点击生成按钮" />
                </div>
              </n-space>
            </n-card>

            <!-- 快速示例 -->
            <n-card title="快速示例" style="margin-top: 24px">
              <n-tabs type="segment">
                <n-tab-pane name="qr" tab="二维码示例">
                  <n-space>
                    <n-button @click="loadQRExample('url')">网址</n-button>
                    <n-button @click="loadQRExample('text')">文本</n-button>
                    <n-button @click="loadQRExample('vcard')">电子名片</n-button>
                    <n-button @click="loadQRExample('wifi')">WiFi 信息</n-button>
                  </n-space>
                </n-tab-pane>
                <n-tab-pane name="barcode" tab="条形码示例">
                  <n-space>
                    <n-button @click="loadBarcodeExample('ean13')">EAN-13</n-button>
                    <n-button @click="loadBarcodeExample('code128')">CODE128</n-button>
                    <n-button @click="loadBarcodeExample('upc')">UPC</n-button>
                    <n-button @click="loadBarcodeExample('isbn')">ISBN</n-button>
                  </n-space>
                </n-tab-pane>
              </n-tabs>
            </n-card>

            <!-- 功能说明 -->
            <n-card title="功能特性" style="margin-top: 24px">
              <n-grid :cols="2" :x-gap="24" :y-gap="16" responsive="screen">
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>二维码生成</template>
                    <template #description>
                      支持文本、网址、名片等多种内容，可自定义颜色和容错率
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>条形码生成</template>
                    <template #description>
                      支持 EAN-13、CODE128、UPC 等多种标准格式
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>高清输出</template>
                    <template #description>
                      生成高质量图片，支持下载为 PNG 格式
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>自定义配置</template>
                    <template #description>
                      可调整尺寸、颜色、容错率等多种参数
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
import { ref, computed } from 'vue'
import { darkTheme, useMessage } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import QRCode from 'qrcode'
import JsBarcode from 'jsbarcode'
import { 
  QrCodeOutline,
  CreateOutline,
  DownloadOutline,
  CopyOutline,
  CheckmarkCircleOutline
} from '@vicons/ionicons5'

/**
 * @description 条形码和二维码生成工具
 */

const message = useMessage()
const themeStore = useThemeStore()

// 主题
const isDark = computed(() => themeStore.isDark)

// ========== 二维码相关 ==========
const qrCanvas = ref(null)
const qrContent = ref('')
const qrSize = ref(300)
const qrErrorLevel = ref('M')
const qrForeground = ref('#000000')
const qrBackground = ref('#FFFFFF')
const qrGenerated = ref(false)

// 容错率选项
const errorLevelOptions = [
  { label: '低 (L) - 7%', value: 'L' },
  { label: '中 (M) - 15%', value: 'M' },
  { label: '高 (Q) - 25%', value: 'Q' },
  { label: '最高 (H) - 30%', value: 'H' }
]

// ========== 条形码相关 ==========
const barcodeSvg = ref(null)
const barcodeContent = ref('')
const barcodeFormat = ref('CODE128')
const barcodeWidth = ref(2)
const barcodeHeight = ref(100)
const barcodeDisplayValue = ref(true)
const barcodeGenerated = ref(false)

// 条形码格式选项
const barcodeFormatOptions = [
  { label: 'CODE128', value: 'CODE128' },
  { label: 'EAN-13', value: 'EAN13' },
  { label: 'EAN-8', value: 'EAN8' },
  { label: 'UPC', value: 'UPC' },
  { label: 'CODE39', value: 'CODE39' },
  { label: 'ITF-14', value: 'ITF14' }
]

/**
 * @description 生成二维码
 */
const generateQRCode = async () => {
  if (!qrContent.value) {
    message.warning('请输入要生成二维码的内容')
    return
  }

  if (!qrCanvas.value) return

  try {
    await QRCode.toCanvas(qrCanvas.value, qrContent.value, {
      width: qrSize.value,
      margin: 2,
      errorCorrectionLevel: qrErrorLevel.value,
      color: {
        dark: qrForeground.value,
        light: qrBackground.value
      }
    })

    qrGenerated.value = true
    message.success('二维码生成成功')
  } catch (error) {
    message.error('二维码生成失败：' + error.message)
  }
}

/**
 * @description 下载二维码
 */
const downloadQRCode = () => {
  if (!qrGenerated.value) {
    message.warning('请先生成二维码')
    return
  }

  const canvas = qrCanvas.value
  const url = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.href = url
  link.download = `qrcode-${Date.now()}.png`
  link.click()

  message.success('二维码已下载')
}

/**
 * @description 复制二维码图片
 */
const copyQRCodeImage = async () => {
  if (!qrGenerated.value) {
    message.warning('请先生成二维码')
    return
  }

  try {
    const canvas = qrCanvas.value
    canvas.toBlob(async (blob) => {
      const item = new ClipboardItem({ 'image/png': blob })
      await navigator.clipboard.write([item])
      message.success('二维码已复制到剪贴板')
    })
  } catch (error) {
    message.error('复制失败：' + error.message)
  }
}

/**
 * @description 生成条形码
 */
const generateBarcode = () => {
  if (!barcodeContent.value) {
    message.warning('请输入要生成条形码的内容')
    return
  }

  if (!barcodeSvg.value) return

  try {
    JsBarcode(barcodeSvg.value, barcodeContent.value, {
      format: barcodeFormat.value,
      width: barcodeWidth.value,
      height: barcodeHeight.value,
      displayValue: barcodeDisplayValue.value,
      fontSize: 20,
      margin: 10
    })

    barcodeGenerated.value = true
    message.success('条形码生成成功')
  } catch (error) {
    message.error('条形码生成失败：' + error.message)
  }
}

/**
 * @description 下载条形码
 */
const downloadBarcode = () => {
  if (!barcodeGenerated.value) {
    message.warning('请先生成条形码')
    return
  }

  const svg = barcodeSvg.value
  const svgData = new XMLSerializer().serializeToString(svg)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()

  img.onload = () => {
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = `barcode-${Date.now()}.png`
    link.click()
    message.success('条形码已下载')
  }

  img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
}

/**
 * @description 加载二维码示例
 */
const loadQRExample = (type) => {
  const examples = {
    url: 'https://www.example.com',
    text: '这是一个二维码示例文本\n支持多行内容\n可以包含中文',
    vcard: `BEGIN:VCARD
VERSION:3.0
N:张;三
FN:张三
ORG:某某科技有限公司
TITLE:前端工程师
TEL;TYPE=WORK,VOICE:13800138000
EMAIL:zhangsan@example.com
END:VCARD`,
    wifi: 'WIFI:T:WPA;S:MyWiFi;P:password123;;'
  }

  qrContent.value = examples[type]
  message.success('示例已加载，点击生成按钮查看效果')
}

/**
 * @description 加载条形码示例
 */
const loadBarcodeExample = (type) => {
  const examples = {
    ean13: { content: '6901234567892', format: 'EAN13' },
    code128: { content: 'EXAMPLE123', format: 'CODE128' },
    upc: { content: '123456789012', format: 'UPC' },
    isbn: { content: '9787115123459', format: 'EAN13' }
  }

  const example = examples[type]
  barcodeContent.value = example.content
  barcodeFormat.value = example.format
  message.success('示例已加载，点击生成按钮查看效果')
}
</script>

<style scoped>
.barcode-generator-page {
  min-height: 100vh;
  background: var(--n-color);
}

.generator-content {
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

.code-display-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  padding: 24px;
  border: 2px dashed var(--n-border-color);
  border-radius: 8px;
  background: var(--n-color-hover);
}

.code-canvas {
  max-width: 100%;
  height: auto;
}

.barcode-svg {
  max-width: 100%;
  height: auto;
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

