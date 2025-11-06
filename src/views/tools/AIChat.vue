<template>
  <div class="ai-chat-page">
    <!-- 顶部导航栏 - 苹果风格 -->
    <div class="chat-header">
      <div class="header-content">
        <div class="header-left">
          <div class="logo-area">
            <div class="logo-icon">
              <n-icon :component="SparklesOutline" size="22" />
            </div>
            <div class="logo-text">
              <div class="logo-title">AI 助手</div>
            </div>
          </div>
        </div>
        
        <div class="header-center">
          <!-- 模型选择器 - 精简样式 -->
          <div class="model-selector" @click="showModelDrawer = true">
            <span class="model-name">{{ selectedModel || '选择模型' }}</span>
            <n-icon :component="ChevronDownOutline" size="16" />
          </div>
        </div>
        
        <div class="header-right">
          <!-- 设置按钮 -->
          <button class="header-icon-btn" @click="showSettingsDrawer = true">
            <n-icon :component="SettingsOutline" size="20" />
          </button>
        </div>
      </div>
    </div>

      <!-- 主对话区域 -->
      <div class="chat-container">
        <!-- 消息列表 -->
        <div class="messages-area" ref="messagesContainer">
          <!-- 欢迎消息 - 苹果风格 -->
          <div v-if="messages.length === 0" class="welcome-section">
            <div class="welcome-icon-wrapper">
              <div class="welcome-icon">
                <n-icon :component="SparklesOutline" size="72" />
              </div>
            </div>
            <h1 class="welcome-title">Hello.</h1>
            <h2 class="welcome-subtitle">我是 AI 助手</h2>
            <p class="welcome-text">我可以帮你回答问题、编写代码、创作内容</p>
            
            <!-- 快速提示 - 苹果风格 -->
            <div class="quick-prompts">
              <div 
                v-for="prompt in quickPrompts" 
                :key="prompt.text"
                class="prompt-card"
                @click="useQuickPrompt(prompt.text)"
              >
                <div class="prompt-icon">
                  <n-icon :component="prompt.icon" size="22" />
                </div>
                <span class="prompt-text">{{ prompt.text }}</span>
              </div>
            </div>
          </div>

          <!-- 对话消息 -->
          <div v-else class="messages-list">
            <div 
              v-for="(msg, index) in messages" 
              :key="index"
              class="message-wrapper"
              :class="{ 'message-user': msg.role === 'user', 'message-assistant': msg.role === 'assistant' }"
            >
              <div class="message-avatar">
                <n-avatar 
                  :size="36"
                  :style="{ 
                    background: msg.role === 'user' 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                  }"
                >
                  <n-icon :component="msg.role === 'user' ? PersonOutline : SparklesOutline" :size="20" />
                </n-avatar>
              </div>
              
              <div class="message-content-area">
                <div class="message-header">
                  <span class="message-role">{{ msg.role === 'user' ? '你' : 'AI 助手' }}</span>
                  <span class="message-time">{{ formatTime(msg.timestamp) }}</span>
                </div>
                
                <div class="message-body">
                  <div v-if="msg.loading" class="message-loading">
                    <div class="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div v-else class="message-text">
                    <span v-if="msg.typing" class="typing-text">{{ msg.displayContent || '' }}</span>
                    <span v-else>{{ msg.content }}</span>
                    <span v-if="msg.typing" class="cursor-blink">|</span>
                  </div>
                </div>
                
                <!-- 操作按钮 -->
                <div v-if="!msg.loading && !msg.typing && msg.role === 'assistant'" class="message-actions">
                  <n-button text size="tiny" @click="copyMessage(msg.content)">
                    <template #icon>
                      <n-icon :component="CopyOutline" />
                    </template>
                    复制
                  </n-button>
                  <n-button text size="tiny" @click="regenerateMessage(index)">
                    <template #icon>
                      <n-icon :component="RefreshOutline" />
                    </template>
                    重新生成
                  </n-button>
                  <span v-if="msg.usage && msg.usage.total_tokens" class="token-info">
                    <n-icon :component="StatsChartOutline" size="14" />
                    {{ msg.usage.total_tokens }} tokens
                  </span>
                </div>
                <!-- 打字中提示 -->
                <div v-if="msg.typing" class="typing-status">
                  <n-text depth="3" style="font-size: 12px;">
                    正在输入中...
                  </n-text>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 输入区域 - 苹果风格 -->
        <div class="input-area">
          <div class="input-container">
            <div class="input-box">
              <div class="input-wrapper-inner">
                <textarea
                  ref="inputRef"
                  v-model="inputMessage"
                  placeholder="请输入消息..."
                  :disabled="isLoading || !hasApiKey"
                  @keydown.enter.exact.prevent="sendMessage"
                  @keydown.shift.enter="handleShiftEnter"
                  class="chat-input"
                  rows="1"
                ></textarea>
                
                <button
                  :disabled="!inputMessage.trim() || isLoading || !hasApiKey"
                  @click="sendMessage"
                  class="send-button"
                  :class="{ 'send-button-active': inputMessage.trim() && !isLoading && hasApiKey }"
                >
                  <n-icon :component="isLoading ? StopCircleOutline : ArrowUpOutline" :size="20" />
                </button>
              </div>
            </div>
            
            <div class="input-hint">
              <span class="hint-text">{{ inputMessage.length }} 字符</span>
              <span class="hint-separator">·</span>
              <span class="hint-text">Enter 发送，Shift+Enter 换行</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 模型选择抽屉 -->
      <n-drawer
        v-model:show="showModelDrawer"
        :width="480"
        placement="bottom"
        :height="480"
      >
        <n-drawer-content title="选择模型" closable>
          <div class="model-list">
            <div 
              v-for="model in modelOptions" 
              :key="model.value"
              class="model-item"
              :class="{ 'model-item-active': selectedModel === model.value }"
              @click="selectModel(model.value)"
            >
              <div class="model-info">
                <div class="model-title">{{ model.label }}</div>
              </div>
              <div class="model-check" v-if="selectedModel === model.value">
                <n-icon :component="CheckmarkOutline" size="20" />
              </div>
            </div>
          </div>
          
          <template #footer>
            <n-button block @click="fetchModels" :loading="loadingModels" secondary>
              <template #icon>
                <n-icon :component="RefreshOutline" />
              </template>
              刷新模型列表
            </n-button>
          </template>
        </n-drawer-content>
      </n-drawer>

      <!-- 设置抽屉 -->
      <n-drawer
        v-model:show="showSettingsDrawer"
        :width="400"
        placement="right"
      >
        <n-drawer-content title="设置" closable>
          <n-space vertical :size="20">
            <!-- API 配置状态 -->
            <n-alert :type="hasApiKey ? 'success' : 'warning'">
              <template #header>
                API Key {{ hasApiKey ? '已配置' : '未配置' }}
              </template>
              {{ hasApiKey ? 'API Key 已安全保存在本地' : '请配置 API Key 以使用对话功能' }}
            </n-alert>

            <!-- 模型管理 -->
            <n-card title="模型管理" size="small">
              <n-space vertical :size="12">
                <n-space justify="space-between" align="center">
                  <n-text>当前模型</n-text>
                  <n-tag type="info" size="small">
                    {{ selectedModel || '未选择' }}
                  </n-tag>
                </n-space>
                
                <n-space justify="space-between" align="center">
                  <n-text>可用模型</n-text>
                  <n-tag type="success" size="small">
                    {{ modelOptions.length }} 个
                  </n-tag>
                </n-space>

                <n-button block size="small" @click="fetchModels" :loading="loadingModels" secondary>
                  <template #icon>
                    <n-icon :component="RefreshOutline" />
                  </template>
                  刷新模型列表
                </n-button>
              </n-space>
            </n-card>

            <!-- API Key 管理 -->
            <n-card title="API Key 管理" size="small">
              <n-space vertical :size="12">
                <n-space justify="space-between" align="center">
                  <n-text>状态</n-text>
                  <n-tag :type="hasApiKey ? 'success' : 'default'" size="small">
                    {{ hasApiKey ? '已配置' : '未配置' }}
                  </n-tag>
                </n-space>
                
                <n-collapse-transition :show="showApiKeyInput">
                  <n-space vertical :size="12">
                    <n-input
                      v-model:value="tempApiKey"
                      type="password"
                      placeholder="sk-xxxxxxxxxxxxxxxx"
                      show-password-on="click"
                    />
                    <n-space>
                      <n-button type="primary" size="small" @click="saveApiKey">
                        保存
                      </n-button>
                      <n-button size="small" @click="showApiKeyInput = false">
                        取消
                      </n-button>
                      <n-button 
                        size="small" 
                        @click="testConnection" 
                        :loading="testingConnection"
                        :disabled="!tempApiKey"
                      >
                        测试连接
                      </n-button>
                    </n-space>
                  </n-space>
                </n-collapse-transition>

                <n-space v-if="!showApiKeyInput">
                  <n-button 
                    v-if="hasApiKey" 
                    size="small" 
                    @click="showApiKeyInput = true"
                  >
                    更新 API Key
                  </n-button>
                  <n-button 
                    v-else 
                    type="primary" 
                    size="small" 
                    @click="showApiKeyInput = true"
                  >
                    配置 API Key
                  </n-button>
                  <n-button 
                    v-if="hasApiKey" 
                    size="small" 
                    type="error" 
                    @click="clearApiKey"
                  >
                    清除
                  </n-button>
                </n-space>

                <n-divider style="margin: 8px 0" />

                <n-text depth="3" style="font-size: 12px;">
                  获取 API Key：
                  <n-button 
                    text 
                    tag="a" 
                    href="https://cloud.siliconflow.cn" 
                    target="_blank" 
                    type="primary"
                    size="tiny"
                  >
                    访问官网
                  </n-button>
                </n-text>
              </n-space>
            </n-card>

            <!-- 模型参数 -->
            <n-card title="模型参数" size="small">

              <n-space vertical :size="16">
                <div class="param-item">
                  <div class="param-label">
                    <span>Temperature</span>
                    <span class="param-value">{{ settings.temperature }}</span>
                  </div>
                  <n-slider
                    v-model:value="settings.temperature"
                    :min="0"
                    :max="2"
                    :step="0.1"
                  />
                  <n-text depth="3" style="font-size: 12px;">
                    控制随机性，越高越随机
                  </n-text>
                </div>

                <div class="param-item">
                  <div class="param-label">
                    <span>Max Tokens</span>
                    <span class="param-value">{{ settings.maxTokens }}</span>
                  </div>
                  <n-slider
                    v-model:value="settings.maxTokens"
                    :min="100"
                    :max="32768"
                    :step="100"
                  />
                  <n-text depth="3" style="font-size: 12px;">
                    最大输出长度
                  </n-text>
                </div>

                <div class="param-item">
                  <div class="param-label">
                    <span>Top P</span>
                    <span class="param-value">{{ settings.topP }}</span>
                  </div>
                  <n-slider
                    v-model:value="settings.topP"
                    :min="0.1"
                    :max="1"
                    :step="0.1"
                  />
                  <n-text depth="3" style="font-size: 12px;">
                    核采样参数
                  </n-text>
                </div>
              </n-space>
            </n-card>

            <!-- 打字机速度设置 -->
            <n-card title="打字机效果" size="small">
              <n-space vertical :size="12">
                <div class="param-item">
                  <div class="param-label">
                    <span>打字速度</span>
                    <span class="param-value">{{ typingSpeed }}ms</span>
                  </div>
                  <n-slider
                    v-model:value="typingSpeed"
                    :min="10"
                    :max="100"
                    :step="5"
                    :marks="{ 10: '快', 50: '中', 100: '慢' }"
                  />
                  <n-text depth="3" style="font-size: 12px;">
                    控制 AI 回复的打字速度
                  </n-text>
                </div>
                <n-button block size="small" @click="stopAllTyping" secondary>
                  <template #icon>
                    <n-icon :component="StopCircleOutline" />
                  </template>
                  跳过打字动画
                </n-button>
              </n-space>
            </n-card>

            <!-- 操作按钮 -->
            <n-space vertical :size="12">
              <n-button block @click="clearChat" secondary>
                <template #icon>
                  <n-icon :component="TrashOutline" />
                </template>
                清空对话
              </n-button>
              
              <n-button block @click="showDebugLog = !showDebugLog" secondary>
                <template #icon>
                  <n-icon :component="BugOutline" />
                </template>
                {{ showDebugLog ? '隐藏' : '显示' }}调试日志
              </n-button>
            </n-space>

            <!-- 调试日志 -->
            <n-card v-if="showDebugLog" title="调试日志" size="small">
              <n-scrollbar style="max-height: 300px;">
                <n-space vertical :size="8">
                  <div v-for="(log, index) in debugLogs" :key="index" class="debug-log-item">
                    <n-text :type="log.type === 'error' ? 'error' : log.type === 'success' ? 'success' : 'default'" style="font-size: 12px;">
                      [{{ formatTime(log.timestamp) }}] {{ log.message }}
                    </n-text>
                    <n-text v-if="log.details" depth="3" style="font-size: 11px; display: block; margin-left: 12px; white-space: pre-wrap; margin-top: 4px;">
                      {{ log.details }}
                    </n-text>
                  </div>
                  <n-empty v-if="debugLogs.length === 0" description="暂无日志" size="small" />
                </n-space>
              </n-scrollbar>
              <template #action>
                <n-button v-if="debugLogs.length > 0" text type="error" size="small" @click="debugLogs = []">
                  清空日志
                </n-button>
              </template>
            </n-card>
          </n-space>
        </n-drawer-content>
      </n-drawer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useMessage } from 'naive-ui'
import { 
  ChatbubblesOutline,
  PersonOutline,
  SendOutline,
  SettingsOutline,
  TrashOutline,
  CopyOutline,
  RefreshOutline,
  CheckmarkCircleOutline,
  BugOutline,
  SparklesOutline,
  CodeSlashOutline,
  BulbOutline,
  RocketOutline,
  StatsChartOutline,
  StopCircleOutline,
  ChevronDownOutline,
  ArrowUpOutline,
  CheckmarkOutline
} from '@vicons/ionicons5'
import dayjs from 'dayjs'

/**
 * @description AI 对话助手页面 - 始终使用深色主题
 */

const message = useMessage()

// API 配置 (从 localStorage 读取)
const STORAGE_KEY = 'ai_chat_api_key'
const apiKey = ref(localStorage.getItem(STORAGE_KEY) || '')
const tempApiKey = ref('')
const showApiKeyInput = ref(false)
const hasApiKey = computed(() => !!apiKey.value)
const API_URL = 'https://api.siliconflow.cn/v1/chat/completions'
const testingConnection = ref(false)

// 模型选择
const selectedModel = ref('')
const showModelDrawer = ref(false)
const modelOptions = ref([])
const loadingModels = ref(false)

// 选择模型
const selectModel = (model) => {
  selectedModel.value = model
  showModelDrawer.value = false
  message.success(`已切换模型: ${model}`)
}

// 设置
const showSettingsDrawer = ref(false)
const settings = ref({
  temperature: 0.7,
  maxTokens: 8192,
  topP: 0.7
})

// 对话消息
const messages = ref([])
const inputMessage = ref('')
const inputRef = ref(null)
const isLoading = ref(false)
const messagesContainer = ref(null)

// 快速提示
const quickPrompts = [
  { text: '帮我写一段代码', icon: CodeSlashOutline },
  { text: '解释一个概念', icon: BulbOutline },
  // { text: '创作一篇文章', icon: ChatbubblesOutline },
  { text: '头脑风暴', icon: RocketOutline }
]

// 调试
const showDebugLog = ref(false)
const debugLogs = ref([])

// 打字机效果
const typingSpeed = ref(30) // 每个字符的间隔时间(ms)
const typingTimers = new Map() // 存储每条消息的定时器

/**
 * @description 添加调试日志
 */
const addDebugLog = (message, type = 'info', details = null) => {
  debugLogs.value.push({
    message,
    type,
    details: details ? JSON.stringify(details, null, 2) : null,
    timestamp: new Date()
  })
  // 只保留最近 20 条日志
  if (debugLogs.value.length > 20) {
    debugLogs.value.shift()
  }
}

/**
 * @description 获取可用模型列表
 */
const fetchModels = async () => {
  if (!apiKey.value) {
    addDebugLog('无法获取模型列表：未配置 API Key', 'warning')
    return
  }

  loadingModels.value = true
  addDebugLog('正在获取模型列表...', 'info')

  try {
    const response = await fetch('https://api.siliconflow.cn/v1/models?sub_type=chat', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey.value}`
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      addDebugLog('获取模型列表失败', 'error', errorText)
      throw new Error(`获取模型列表失败: ${response.status}`)
    }

    const data = await response.json()
    addDebugLog('成功获取模型列表', 'success', data)

    // 解析模型列表
    if (data.data && Array.isArray(data.data)) {
      modelOptions.value = data.data.map(model => ({
        label: model.id,
        value: model.id
      }))

      // 如果有模型且当前没有选中的模型，选择第一个
      if (modelOptions.value.length > 0 && !selectedModel.value) {
        selectedModel.value = modelOptions.value[0].value
        addDebugLog(`默认选择模型: ${selectedModel.value}`, 'info')
      }

      message.success(`成功加载 ${modelOptions.value.length} 个可用模型`)
    } else {
      throw new Error('模型列表格式错误')
    }
  } catch (error) {
    console.error('获取模型列表失败:', error)
    addDebugLog(`获取模型列表失败: ${error.message}`, 'error')
    message.error(`获取模型列表失败: ${error.message}`)
    
    // 使用备用模型列表
    modelOptions.value = [
      { label: 'DeepSeek V3.1', value: 'deepseek-ai/DeepSeek-V3.1' },
      { label: 'Qwen QwQ-32B', value: 'Qwen/QwQ-32B' }
    ]
    if (!selectedModel.value) {
      selectedModel.value = modelOptions.value[0].value
    }
    addDebugLog('已切换到备用模型列表', 'warning')
  } finally {
    loadingModels.value = false
  }
}

/**
 * @description 保存 API Key
 */
const saveApiKey = async () => {
  if (!tempApiKey.value) {
    message.warning('请输入 API Key')
    return
  }
  
  apiKey.value = tempApiKey.value
  localStorage.setItem(STORAGE_KEY, tempApiKey.value)
  showApiKeyInput.value = false
  tempApiKey.value = ''
  message.success('API Key 已保存')
  addDebugLog('API Key 已更新', 'success')
  
  // 保存后立即获取模型列表
  await fetchModels()
}

/**
 * @description 清除 API Key
 */
const clearApiKey = () => {
  apiKey.value = ''
  tempApiKey.value = ''
  localStorage.removeItem(STORAGE_KEY)
  message.success('API Key 已清除')
  addDebugLog('API Key 已清除', 'info')
}

/**
 * @description 测试 API 连接
 */
const testConnection = async () => {
  const keyToTest = tempApiKey.value || apiKey.value
  if (!keyToTest) {
    message.warning('请先输入 API Key')
    return
  }

  testingConnection.value = true
  addDebugLog('测试 API 连接...', 'info')

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${keyToTest}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: selectedModel.value,
        messages: [{ role: 'user', content: '你好' }],
        max_tokens: 10,
        stream: false
      })
    })

    addDebugLog(`响应状态: ${response.status} ${response.statusText}`, response.ok ? 'success' : 'error')

    if (!response.ok) {
      const errorText = await response.text()
      addDebugLog('API 错误响应', 'error', errorText)
      throw new Error(`API 返回错误: ${response.status}`)
    }

    const data = await response.json()
    addDebugLog('API 连接成功', 'success', data)
    message.success('API 连接测试成功！')
  } catch (error) {
    addDebugLog(`连接失败: ${error.message}`, 'error')
    message.error(`连接失败: ${error.message}`)
    console.error('测试连接失败:', error)
  } finally {
    testingConnection.value = false
  }
}

/**
 * @description 打字机效果
 */
const typewriterEffect = (messageIndex, fullText) => {
  return new Promise((resolve) => {
    // 清除可能存在的旧定时器
    if (typingTimers.has(messageIndex)) {
      clearInterval(typingTimers.get(messageIndex))
    }

    const msg = messages.value[messageIndex]
    if (!msg) {
      resolve()
      return
    }

    msg.typing = true
    msg.displayContent = ''
    
    let currentIndex = 0
    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        // 每次添加一个字符
        msg.displayContent = fullText.substring(0, currentIndex + 1)
        currentIndex++
        
        // 自动滚动到底部
        scrollToBottom()
      } else {
        // 打字完成
        clearInterval(timer)
        typingTimers.delete(messageIndex)
        msg.typing = false
        msg.displayContent = fullText
        resolve()
      }
    }, typingSpeed.value)
    
    typingTimers.set(messageIndex, timer)
  })
}

/**
 * @description 停止所有打字机效果
 */
const stopAllTyping = () => {
  typingTimers.forEach((timer) => {
    clearInterval(timer)
  })
  typingTimers.clear()
  
  // 立即显示所有内容
  messages.value.forEach(msg => {
    if (msg.typing) {
      msg.typing = false
      msg.displayContent = msg.content
    }
  })
}

/**
 * @description 使用快速提示
 */
const useQuickPrompt = (text) => {
  inputMessage.value = text
  nextTick(() => {
    inputRef.value?.focus()
  })
}

/**
 * @description 处理 Shift+Enter
 */
const handleShiftEnter = (e) => {
  // 允许换行
}

/**
 * @description 发送消息
 */
const sendMessage = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return

  if (!apiKey.value) {
    message.warning('请先在设置中配置 API Key')
    showSettingsDrawer.value = true
    return
  }

  const userMessage = inputMessage.value.trim()
  inputMessage.value = ''

  addDebugLog(`发送用户消息: ${userMessage.substring(0, 50)}...`, 'info')

  // 添加用户消息
  messages.value.push({
    role: 'user',
    content: userMessage,
    timestamp: new Date()
  })

  // 添加 AI 占位消息
  const aiMessageIndex = messages.value.length
  messages.value.push({
    role: 'assistant',
    content: '',
    loading: true,
    timestamp: new Date()
  })

  // 滚动到底部
  scrollToBottom()

  isLoading.value = true

  let aiMessageIndexForError = aiMessageIndex // 用于错误处理

  try {
    // 构建请求消息历史（只保留最后 20 轮对话）
    const conversationMessages = messages.value
      .slice(-20) // 只保留最后 20 条消息
      .filter(m => !m.loading) // 过滤掉加载中的消息
      .map(m => ({
        role: m.role,
        content: m.content
      }))

    const requestPayload = {
      model: selectedModel.value,
      messages: conversationMessages,
      max_tokens: settings.value.maxTokens,
      temperature: settings.value.temperature,
      top_p: settings.value.topP,
      stream: false
    }

    addDebugLog('发送 API 请求', 'info', {
      url: API_URL,
      model: selectedModel.value,
      messageCount: conversationMessages.length,
      settings: settings.value
    })

    // 发送请求
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestPayload)
    })

    addDebugLog(`收到响应: ${response.status} ${response.statusText}`, response.ok ? 'info' : 'error')

    if (!response.ok) {
      const errorText = await response.text()
      let errorData = {}
      try {
        errorData = JSON.parse(errorText)
      } catch (e) {
        errorData = { error: { message: errorText } }
      }
      
      addDebugLog('API 错误', 'error', errorData)
      
      const errorMessage = errorData.error?.message || errorData.message || `HTTP ${response.status}: ${response.statusText}`
      throw new Error(errorMessage)
    }

    const data = await response.json()
    addDebugLog('收到 AI 响应', 'success', data)

    // 处理不同格式的 API 响应
    let aiContent = ''
    let usage = null

    // OpenAI 兼容格式 (chat/completions)
    if (data.choices && data.choices[0]) {
      aiContent = data.choices[0].message?.content || ''
      usage = data.usage || null
    }
    // Anthropic 格式 (messages)
    else if (data.content && Array.isArray(data.content)) {
      const textContent = data.content.find(c => c.type === 'text')
      aiContent = textContent?.text || ''
      usage = data.usage || null
    }
    // 其他格式
    else if (data.content) {
      aiContent = typeof data.content === 'string' ? data.content : ''
      usage = data.usage || null
    }

    if (!aiContent) {
      addDebugLog('未收到有效的 AI 回复内容', 'error', data)
      throw new Error('未收到有效的回复内容')
    }

    addDebugLog(`AI 回复长度: ${aiContent.length} 字符`, 'success', {
      contentPreview: aiContent.substring(0, 100) + '...',
      usage: usage
    })

    // 更新 AI 消息
    messages.value[aiMessageIndex] = {
      role: 'assistant',
      content: aiContent,
      displayContent: '',
      loading: false,
      typing: false,
      timestamp: new Date(),
      usage: usage
    }

    // 启动打字机效果
    await typewriterEffect(aiMessageIndex, aiContent)
    
    message.success('回复已收到')
  } catch (error) {
    console.error('AI 请求失败:', error)
    addDebugLog(`请求失败: ${error.message}`, 'error', error)
    
    // 显示详细错误信息
    let errorMsg = error.message || '未知错误'
    
    // 处理常见错误
    if (errorMsg.includes('Failed to fetch')) {
      errorMsg = '网络请求失败，可能是跨域问题或网络连接问题。建议：1) 检查网络连接 2) 尝试使用代理 3) 查看浏览器控制台获取详细错误'
    } else if (errorMsg.includes('401')) {
      errorMsg = 'API Key 无效，请检查您的 API Key 是否正确'
    } else if (errorMsg.includes('429')) {
      errorMsg = 'API 请求频率超限，请稍后再试'
    } else if (errorMsg.includes('500') || errorMsg.includes('502') || errorMsg.includes('503')) {
      errorMsg = 'API 服务器错误，请稍后再试'
    }
    
    message.error(errorMsg, {
      duration: 5000
    })
    
    // 移除加载中的消息
    messages.value.splice(aiMessageIndexForError, 1)
  } finally {
    isLoading.value = false
  }
}

/**
 * @description 复制消息
 */
const copyMessage = async (content) => {
  try {
    await navigator.clipboard.writeText(content)
    message.success('已复制到剪贴板')
  } catch (error) {
    message.error('复制失败')
  }
}

/**
 * @description 重新生成消息
 */
const regenerateMessage = async (index) => {
  if (index === 0 || messages.value[index - 1].role !== 'user') {
    message.warning('无法重新生成：没有对应的用户消息')
    return
  }

  // 移除当前 AI 消息
  const userMessage = messages.value[index - 1].content
  messages.value.splice(index, 1)

  // 重新发送
  inputMessage.value = userMessage
  await sendMessage()
}

/**
 * @description 清空对话
 */
const clearChat = () => {
  stopAllTyping()
  messages.value = []
  message.success('对话已清空')
}

/**
 * @description 滚动到底部
 */
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

/**
 * @description 格式化时间
 */
const formatTime = (timestamp) => {
  return dayjs(timestamp).format('HH:mm:ss')
}

onMounted(async () => {
  // 检查 API Key
  if (!hasApiKey.value) {
    showSettingsDrawer.value = true
    message.info('请先配置 API Key 以开始使用')
  } else {
    // 如果已有 API Key，自动获取模型列表
    await fetchModels()
  }
})

// 组件卸载时清理定时器
import { onBeforeUnmount } from 'vue'
onBeforeUnmount(() => {
  stopAllTyping()
})
</script>

<style scoped>
/* 苹果风格 - 深色主题 */
.ai-chat-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #000;
  position: relative;
  overflow: hidden;
}

.ai-chat-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse at 20% 30%, rgba(0, 113, 227, 0.08), transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.08), transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* 顶部导航栏 - 苹果风格 */
.chat-header {
  background: rgba(29, 29, 31, 0.8);
  backdrop-filter: blur(30px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 14px 24px;
  position: relative;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  gap: 24px;
}

.header-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.header-center {
  display: flex;
  justify-content: center;
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.logo-area:hover {
  opacity: 0.8;
}

.logo-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #0071e3 0%, #00a8e3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 113, 227, 0.25);
  transition: all 0.2s ease;
}

.logo-area:hover .logo-icon {
  box-shadow: 0 4px 16px rgba(0, 113, 227, 0.4);
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-size: 17px;
  font-weight: 600;
  color: #f5f5f7;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

/* 模型选择器样式 */
.model-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 300px;
}

.model-selector:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
}

.model-name {
  font-size: 14px;
  font-weight: 500;
  color: #f5f5f7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-icon-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: #f5f5f7;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.header-icon-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

/* 聊天容器 */
.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

/* 消息区域 */
.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 40px 24px 24px;
  position: relative;
  z-index: 1;
}

/* 欢迎区域 - 苹果风格 */
.welcome-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  text-align: center;
  padding: 60px 24px;
  animation: welcomeFadeIn 0.8s ease-out;
}

@keyframes welcomeFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.welcome-icon-wrapper {
  margin-bottom: 32px;
  animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

.welcome-icon {
  width: 120px;
  height: 120px;
  border-radius: 30px;
  background: linear-gradient(135deg, #0071e3 0%, #00a8e3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 16px 48px rgba(0, 113, 227, 0.35);
  position: relative;
}

.welcome-icon::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 33px;
  background: linear-gradient(135deg, rgba(0, 113, 227, 0.4), rgba(0, 168, 227, 0.4));
  filter: blur(15px);
  z-index: -1;
  opacity: 0.5;
}

.welcome-title {
  font-size: clamp(64px, 10vw, 96px);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.0;
  color: #f5f5f7;
  margin: 0 0 12px 0;
}

.welcome-subtitle {
  font-size: 24px;
  font-weight: 600;
  color: #86868b;
  margin: 0 0 12px 0;
  letter-spacing: -0.01em;
}

.welcome-text {
  font-size: 17px;
  color: #86868b;
  margin: 0 0 48px 0;
  max-width: 560px;
  line-height: 1.5;
  letter-spacing: -0.01em;
}

/* 快速提示 - 苹果风格 */
.quick-prompts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  width: 100%;
  max-width: 800px;
}

.prompt-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.prompt-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #0071e3, #00a8e3);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.prompt-card:hover::before {
  transform: scaleX(1);
}

.prompt-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 113, 227, 0.2);
}

.prompt-icon {
  width: 44px;
  height: 44px;
  border-radius: 11px;
  background: rgba(0, 113, 227, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0071e3;
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.prompt-card:hover .prompt-icon {
  background: #0071e3;
  color: #fff;
  transform: scale(1.08) rotate(3deg);
}

.prompt-text {
  font-size: 15px;
  font-weight: 500;
  color: #f5f5f7;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

/* 消息列表 - 苹果风格 */
.messages-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 900px;
  margin: 0 auto;
}

.message-wrapper {
  display: flex;
  gap: 16px;
  animation: messageSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.message-avatar {
  flex-shrink: 0;
}

.message-content-area {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.message-role {
  font-size: 15px;
  font-weight: 600;
  color: #f5f5f7;
  letter-spacing: -0.01em;
}

.message-time {
  font-size: 13px;
  color: #86868b;
}

.message-body {
  margin-bottom: 12px;
}

.message-text {
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  font-size: 15px;
  line-height: 1.6;
  color: #f5f5f7;
  word-wrap: break-word;
  white-space: pre-wrap;
  position: relative;
  transition: all 0.2s ease;
}

.message-text:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.12);
}

.typing-text {
  display: inline;
}

.cursor-blink {
  display: inline-block;
  margin-left: 2px;
  animation: blink 1s infinite;
  color: #667eea;
  font-weight: bold;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.message-user .message-text {
  background: #0071e3;
  border: 1px solid rgba(0, 113, 227, 0.5);
  color: #fff;
  box-shadow: 0 2px 12px rgba(0, 113, 227, 0.2);
}

.message-user .message-text:hover {
  background: #0077ed;
  box-shadow: 0 4px 20px rgba(0, 113, 227, 0.3);
}

.message-loading {
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
}

/* 打字机效果 - 深色主题 */
.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #86868b;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.message-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  margin-top: 4px;
}

.typing-status {
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.token-info {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #999;
  font-size: 12px;
  margin-left: auto;
}

/* 输入区域 - 苹果风格 */
.input-area {
  padding: 0 24px 32px;
  position: relative;
  z-index: 10;
}

.input-container {
  max-width: 900px;
  margin: 0 auto;
}

.input-wrapper {
  position: relative;
}

.input-box {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(40px) saturate(180%);
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  border-radius: 28px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.input-box:focus-within {
  background: rgba(255, 255, 255, 0.09);
  border-color: #0071e3;
  box-shadow: 0 8px 32px rgba(0, 113, 227, 0.2), 
              0 0 0 4px rgba(0, 113, 227, 0.08);
}

.input-wrapper-inner {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 14px 18px;
}

.chat-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: #f5f5f7;
  font-size: 15px;
  line-height: 1.5;
  resize: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  max-height: 200px;
  min-height: 24px;
}

.chat-input::placeholder {
  color: #86868b;
  opacity: 0.8;
}

.input-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px 0;
  font-size: 12px;
  color: #86868b;
}

.hint-separator {
  color: #494a4d;
}

.send-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #0071e3;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.send-button-active {
  background: linear-gradient(135deg, #0071e3 0%, #00a8e3 100%);
  box-shadow: 0 2px 8px rgba(0, 113, 227, 0.3);
}

.send-button:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 4px 16px rgba(0, 113, 227, 0.4);
}

.send-button:active:not(:disabled) {
  transform: scale(0.95);
}

.send-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: none;
}

.send-button.sending {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 参数项 - 深色主题 */
.param-item {
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
}

.param-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #f5f5f7;
}

.param-value {
  color: #0071e3;
  font-weight: 700;
}

/* 调试日志 - 深色主题 */
.debug-log-item {
  padding: 10px 12px;
  border-left: 3px solid rgba(0, 113, 227, 0.5);
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
}

/* 模型列表样式 */
.model-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.model-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.model-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
}

.model-item-active {
  background: rgba(0, 113, 227, 0.1);
  border-color: #0071e3;
}

.model-info {
  flex: 1;
}

.model-title {
  font-size: 14px;
  font-weight: 500;
  color: #f5f5f7;
}

.model-check {
  color: #0071e3;
}

/* 响应式 - 苹果风格 */
@media (max-width: 768px) {
  .chat-header {
    padding: 12px 16px;
  }

  .header-content {
    grid-template-columns: auto 1fr auto;
    gap: 12px;
  }

  .header-center {
    justify-content: flex-start;
  }

  .model-selector {
    max-width: none;
    font-size: 13px;
    padding: 6px 12px;
  }

  .logo-title {
    font-size: 15px;
  }

  .logo-icon {
    width: 32px;
    height: 32px;
  }
  
  .chat-container {
    padding: 12px;
  }
  
  .messages-area {
    padding: 24px 16px 16px;
  }

  .messages-list {
    gap: 24px;
  }

  .message-wrapper {
    gap: 12px;
  }

  .message-text {
    padding: 14px 16px;
    font-size: 14px;
  }
  
  .welcome-section {
    padding: 40px 16px;
    min-height: 400px;
  }

  .welcome-icon {
    width: 100px;
    height: 100px;
    border-radius: 25px;
  }

  .welcome-icon::before {
    border-radius: 27px;
  }
  
  .welcome-title {
    font-size: 48px;
  }

  .welcome-subtitle {
    font-size: 21px;
  }

  .welcome-text {
    font-size: 16px;
  }
  
  .quick-prompts {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .prompt-card {
    padding: 16px 20px;
  }

  .prompt-icon {
    width: 40px;
    height: 40px;
  }

  .input-area {
    padding: 0 16px 24px;
  }

  .input-box {
    padding: 14px 16px;
    border-radius: 20px;
  }

  .send-button {
    width: 36px;
    height: 36px;
  }
}

/* Naive UI 组件样式覆盖 - 深色主题 */
:deep(.n-select) {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px !important;
}

:deep(.n-base-selection) {
  background: transparent !important;
  border: none !important;
}

:deep(.n-base-selection-label) {
  color: #f5f5f7 !important;
}

:deep(.n-base-selection-placeholder) {
  color: #86868b !important;
}

:deep(.n-input__textarea-el) {
  color: #f5f5f7 !important;
}

:deep(.n-drawer) {
  background: rgba(29, 29, 31, 0.95) !important;
  backdrop-filter: blur(30px) !important;
}

:deep(.n-drawer-header) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
}

:deep(.n-drawer-header__main) {
  color: #f5f5f7 !important;
  font-size: 21px !important;
  font-weight: 600 !important;
}

:deep(.n-card) {
  background: rgba(255, 255, 255, 0.03) !important;
  backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 16px !important;
}

:deep(.n-card-header__main) {
  color: #f5f5f7 !important;
  font-weight: 600 !important;
}

:deep(.n-alert) {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-radius: 12px !important;
}

:deep(.n-tag) {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  color: #f5f5f7 !important;
}

:deep(.n-button) {
  border-radius: 10px !important;
  font-weight: 500 !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  color: #f5f5f7 !important;
}

:deep(.n-button--primary-type) {
  background: #0071e3 !important;
  border: none !important;
  box-shadow: 0 2px 8px rgba(0, 113, 227, 0.3) !important;
}

:deep(.n-button--primary-type:hover) {
  background: #0077ed !important;
  box-shadow: 0 4px 16px rgba(0, 113, 227, 0.4) !important;
}

:deep(.n-button--secondary-type) {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.n-button--secondary-type:hover) {
  background: rgba(255, 255, 255, 0.08) !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
}

:deep(.n-button--error-type) {
  background: #ff3b30 !important;
  border: none !important;
}

:deep(.n-button--error-type:hover) {
  background: #ff4d42 !important;
}

:deep(.n-slider) {
  --n-fill-color: #0071e3 !important;
  --n-fill-color-hover: #0077ed !important;
  --n-rail-color: rgba(255, 255, 255, 0.1) !important;
}

:deep(.n-text) {
  color: #f5f5f7 !important;
}

:deep(.n-empty) {
  color: #86868b !important;
}

:deep(.n-empty__description) {
  color: #86868b !important;
}

:deep(.n-scrollbar-rail) {
  background: transparent !important;
}

:deep(.n-collapse-item__header) {
  color: #f5f5f7 !important;
}

:deep(.n-divider) {
  border-color: rgba(255, 255, 255, 0.08) !important;
}

/* 滚动条样式 - 苹果风格 */
.messages-area::-webkit-scrollbar {
  width: 8px;
}

.messages-area::-webkit-scrollbar-track {
  background: transparent;
}

.messages-area::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  transition: background 0.2s ease;
}

.messages-area::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* 选中文本样式 */
::selection {
  background: rgba(0, 113, 227, 0.3);
  color: #f5f5f7;
}
</style>

