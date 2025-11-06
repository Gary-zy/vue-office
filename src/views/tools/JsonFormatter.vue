<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="json-formatter-page">
      <n-layout>
        <n-layout-content class="formatter-content">
          <div class="content-container">
            <!-- 页面标题 -->
            <div class="page-header">
              <h1 class="page-title">
                <n-icon :component="CodeSlashOutline" />
                JSON 格式化工具
              </h1>
              <p class="page-subtitle">
                JSON 格式化、验证、压缩、美化一站式解决方案
              </p>
            </div>

            <!-- 主要功能区 -->
            <n-card>
              <n-space vertical :size="16">
                <!-- 工具栏 -->
                <n-space justify="space-between" wrap>
                  <n-space wrap>
                    <n-button type="primary" @click="formatJson">
                      <template #icon>
                        <n-icon :component="CheckmarkCircleOutline" />
                      </template>
                      格式化
                    </n-button>
                    <n-button @click="compressJson">
                      <template #icon>
                        <n-icon :component="ContractOutline" />
                      </template>
                      压缩
                    </n-button>
                    <n-button @click="validateJson">
                      <template #icon>
                        <n-icon :component="ShieldCheckmarkOutline" />
                      </template>
                      验证
                    </n-button>
                    <n-button @click="clearAll">
                      <template #icon>
                        <n-icon :component="TrashOutline" />
                      </template>
                      清空
                    </n-button>
                  </n-space>
                  <n-space wrap>
                    <n-button @click="copyToClipboard">
                      <template #icon>
                        <n-icon :component="CopyOutline" />
                      </template>
                      复制
                    </n-button>
                    <n-button @click="downloadJson">
                      <template #icon>
                        <n-icon :component="DownloadOutline" />
                      </template>
                      下载
                    </n-button>
                  </n-space>
                </n-space>

                <!-- 缩进设置 -->
                <n-space align="center">
                  <n-text>缩进空格数：</n-text>
                  <n-radio-group v-model:value="indentSize">
                    <n-radio-button :value="2">2</n-radio-button>
                    <n-radio-button :value="4">4</n-radio-button>
                    <n-radio-button :value="8">8</n-radio-button>
                  </n-radio-group>
                  <n-divider vertical />
                  <n-checkbox v-model:checked="sortKeys">
                    排序键名
                  </n-checkbox>
                </n-space>

                <!-- 编辑器区域 -->
                <n-grid :cols="2" :x-gap="16" responsive="screen">
                  <n-grid-item>
                    <n-card title="输入 JSON" size="small">
                      <template #header-extra>
                        <n-space>
                          <n-text depth="3" style="font-size: 12px">
                            字符数: {{ inputJson.length }}
                          </n-text>
                        </n-space>
                      </template>
                      <n-input
                        v-model:value="inputJson"
                        type="textarea"
                        placeholder='请输入 JSON 数据，例如：{"name": "张三", "age": 25}'
                        :autosize="{ minRows: 20, maxRows: 30 }"
                        :status="jsonStatus"
                        @input="onInputChange"
                      />
                      <n-space v-if="errorMessage" style="margin-top: 12px;">
                        <n-alert type="error" :title="errorMessage" closable />
                      </n-space>
                    </n-card>
                  </n-grid-item>

                  <n-grid-item>
                    <n-card title="输出结果" size="small">
                      <template #header-extra>
                        <n-space>
                          <n-text depth="3" style="font-size: 12px">
                            字符数: {{ outputJson.length }}
                          </n-text>
                        </n-space>
                      </template>
                      <n-input
                        v-model:value="outputJson"
                        type="textarea"
                        placeholder="格式化后的结果将显示在这里"
                        :autosize="{ minRows: 20, maxRows: 30 }"
                        readonly
                      />
                    </n-card>
                  </n-grid-item>
                </n-grid>
              </n-space>
            </n-card>

            <!-- 快速示例 -->
            <n-card title="快速示例" style="margin-top: 24px">
              <n-space>
                <n-button @click="loadExample('user')">用户数据</n-button>
                <n-button @click="loadExample('array')">数组数据</n-button>
                <n-button @click="loadExample('nested')">嵌套对象</n-button>
                <n-button @click="loadExample('complex')">复杂数据</n-button>
              </n-space>
            </n-card>

            <!-- 功能说明 -->
            <n-card title="功能特性" style="margin-top: 24px">
              <n-grid :cols="2" :x-gap="24" :y-gap="16" responsive="screen">
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>JSON 格式化</template>
                    <template #description>
                      自动美化 JSON，支持自定义缩进
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>JSON 验证</template>
                    <template #description>
                      实时验证 JSON 语法，显示错误位置
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>JSON 压缩</template>
                    <template #description>
                      移除空格和换行，压缩 JSON 体积
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>键名排序</template>
                    <template #description>
                      按字母顺序排序 JSON 键名
                    </template>
                  </n-thing>
                </n-grid-item>
              </n-grid>
            </n-card>

            <!-- 使用技巧 -->
            <n-card title="使用技巧" style="margin-top: 24px">
              <n-space vertical>
                <n-alert type="info">
                  <template #icon>
                    <n-icon :component="BulbOutline" />
                  </template>
                  <strong>提示：</strong>支持粘贴包含单引号的 JSON，工具会自动转换为标准的双引号格式
                </n-alert>
                <n-alert type="success">
                  <template #icon>
                    <n-icon :component="CheckmarkCircleOutline" />
                  </template>
                  <strong>技巧：</strong>输入 JSON 后会自动验证，红色边框表示格式错误
                </n-alert>
                <n-alert type="warning">
                  <template #icon>
                    <n-icon :component="WarningOutline" />
                  </template>
                  <strong>注意：</strong>请勿输入包含敏感信息的 JSON 数据，所有处理均在浏览器本地完成
                </n-alert>
              </n-space>
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
import { 
  CodeSlashOutline,
  CheckmarkCircleOutline,
  ContractOutline,
  ShieldCheckmarkOutline,
  TrashOutline,
  CopyOutline,
  DownloadOutline,
  BulbOutline,
  WarningOutline
} from '@vicons/ionicons5'

/**
 * @description JSON 格式化工具页面
 */

const message = useMessage()
const themeStore = useThemeStore()

// 主题
const isDark = computed(() => themeStore.isDark)

// JSON 数据
const inputJson = ref('')
const outputJson = ref('')
const errorMessage = ref('')
const jsonStatus = ref(undefined)

// 格式化选项
const indentSize = ref(2)
const sortKeys = ref(false)

// 示例数据
const examples = {
  user: {
    name: '张三',
    age: 25,
    email: 'zhangsan@example.com',
    phone: '13800138000',
    address: {
      province: '北京市',
      city: '朝阳区',
      street: '某某街道123号'
    }
  },
  array: {
    users: [
      { id: 1, name: '张三', role: 'admin' },
      { id: 2, name: '李四', role: 'user' },
      { id: 3, name: '王五', role: 'guest' }
    ]
  },
  nested: {
    company: {
      name: '某某科技有限公司',
      departments: [
        {
          id: 1,
          name: '技术部',
          employees: [
            { id: 101, name: '张三', position: '前端工程师' },
            { id: 102, name: '李四', position: '后端工程师' }
          ]
        },
        {
          id: 2,
          name: '产品部',
          employees: [
            { id: 201, name: '王五', position: '产品经理' }
          ]
        }
      ]
    }
  },
  complex: {
    status: 'success',
    code: 200,
    message: '请求成功',
    data: {
      list: [
        {
          id: 1,
          title: '文章标题1',
          content: '文章内容...',
          tags: ['Vue', 'JavaScript', '前端'],
          author: {
            id: 1001,
            name: '作者1',
            avatar: 'https://example.com/avatar1.jpg'
          },
          stats: {
            views: 1234,
            likes: 56,
            comments: 12
          },
          publishTime: '2024-01-20T10:00:00Z',
          isPublished: true
        }
      ],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 100
      }
    }
  }
}

/**
 * @description 输入变化时验证
 */
const onInputChange = () => {
  if (!inputJson.value.trim()) {
    jsonStatus.value = undefined
    errorMessage.value = ''
    return
  }

  try {
    JSON.parse(inputJson.value)
    jsonStatus.value = 'success'
    errorMessage.value = ''
  } catch (error) {
    jsonStatus.value = 'error'
    errorMessage.value = `JSON 格式错误: ${error.message}`
  }
}

/**
 * @description 格式化 JSON
 */
const formatJson = () => {
  if (!inputJson.value.trim()) {
    message.warning('请输入 JSON 数据')
    return
  }

  try {
    // 尝试替换单引号为双引号（简单处理）
    let jsonStr = inputJson.value.replace(/'/g, '"')
    
    let obj = JSON.parse(jsonStr)

    // 如果需要排序键名
    if (sortKeys.value) {
      obj = sortObjectKeys(obj)
    }

    outputJson.value = JSON.stringify(obj, null, indentSize.value)
    jsonStatus.value = 'success'
    errorMessage.value = ''
    message.success('格式化成功')
  } catch (error) {
    jsonStatus.value = 'error'
    errorMessage.value = `格式化失败: ${error.message}`
    message.error('格式化失败，请检查 JSON 格式')
  }
}

/**
 * @description 压缩 JSON
 */
const compressJson = () => {
  if (!inputJson.value.trim()) {
    message.warning('请输入 JSON 数据')
    return
  }

  try {
    const obj = JSON.parse(inputJson.value)
    outputJson.value = JSON.stringify(obj)
    message.success('压缩成功')
  } catch (error) {
    message.error('压缩失败，请检查 JSON 格式')
  }
}

/**
 * @description 验证 JSON
 */
const validateJson = () => {
  if (!inputJson.value.trim()) {
    message.warning('请输入 JSON 数据')
    return
  }

  try {
    const obj = JSON.parse(inputJson.value)
    const size = new Blob([JSON.stringify(obj)]).size
    
    message.success(`JSON 格式正确！数据大小: ${formatBytes(size)}`, {
      duration: 3000
    })
    
    jsonStatus.value = 'success'
    errorMessage.value = ''
    
    // 显示数据信息
    outputJson.value = `✅ JSON 验证通过\n\n数据类型: ${typeof obj}\n数据大小: ${formatBytes(size)}\n${getJsonInfo(obj)}`
  } catch (error) {
    jsonStatus.value = 'error'
    errorMessage.value = `验证失败: ${error.message}`
    message.error('JSON 格式错误')
    outputJson.value = `❌ JSON 验证失败\n\n错误信息: ${error.message}`
  }
}

/**
 * @description 清空所有
 */
const clearAll = () => {
  inputJson.value = ''
  outputJson.value = ''
  errorMessage.value = ''
  jsonStatus.value = undefined
  message.success('已清空')
}

/**
 * @description 复制到剪贴板
 */
const copyToClipboard = async () => {
  if (!outputJson.value) {
    message.warning('没有可复制的内容')
    return
  }

  try {
    await navigator.clipboard.writeText(outputJson.value)
    message.success('已复制到剪贴板')
  } catch (error) {
    message.error('复制失败')
  }
}

/**
 * @description 下载 JSON 文件
 */
const downloadJson = () => {
  if (!outputJson.value) {
    message.warning('没有可下载的内容')
    return
  }

  const blob = new Blob([outputJson.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `formatted-${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(url)
  
  message.success('文件已下载')
}

/**
 * @description 加载示例
 */
const loadExample = (type) => {
  inputJson.value = JSON.stringify(examples[type], null, 2)
  onInputChange()
  message.success('示例已加载')
}

/**
 * @description 递归排序对象键名
 */
const sortObjectKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys)
  }
  
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce((result, key) => {
        result[key] = sortObjectKeys(obj[key])
        return result
      }, {})
  }
  
  return obj
}

/**
 * @description 格式化字节大小
 */
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * @description 获取 JSON 信息
 */
const getJsonInfo = (obj) => {
  let info = ''
  
  if (Array.isArray(obj)) {
    info += `数组长度: ${obj.length}\n`
  } else if (typeof obj === 'object' && obj !== null) {
    const keys = Object.keys(obj)
    info += `对象键数: ${keys.length}\n`
    if (keys.length > 0) {
      info += `键名列表: ${keys.slice(0, 10).join(', ')}${keys.length > 10 ? '...' : ''}`
    }
  }
  
  return info
}
</script>

<style scoped>
.json-formatter-page {
  min-height: 100vh;
  background: var(--n-color);
}

.formatter-content {
  padding: 40px 0;
}

.content-container {
  max-width: 1600px;
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

