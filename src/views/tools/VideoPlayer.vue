<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="video-player-page">
      <n-layout>
        <n-layout-content class="player-content">
          <div class="content-container">
            <!-- 页面标题 -->
            <div class="page-header">
              <h1 class="page-title">
                <n-icon :component="VideocamOutline" />
                视频播放器
              </h1>
              <p class="page-subtitle">
                基于 xgplayer 的 HTML5 视频播放器，支持多种格式和功能
              </p>
            </div>

            <!-- 播放器卡片 -->
            <n-card>
              <n-space vertical :size="16">
                <!-- 在线链接输入 -->
                <n-card title="在线链接播放" size="small">
                  <n-space vertical :size="12">
                    <n-input
                      v-model:value="videoUrl"
                      placeholder="请输入视频链接（支持 MP4、M3U8、WebM 等格式）"
                      clearable
                      @keyup.enter="loadUrl"
                    >
                      <template #prefix>
                        <n-icon :component="LinkOutline" />
                      </template>
                    </n-input>
                    <n-space justify="space-between">
                      <n-space>
                        <n-button type="primary" @click="loadUrl" :loading="loading">
                          <template #icon>
                            <n-icon :component="PlayOutline" />
                          </template>
                          加载并播放
                        </n-button>
                        <n-button @click="saveToPlaylist">
                          <template #icon>
                            <n-icon :component="AddOutline" />
                          </template>
                          保存到列表
                        </n-button>
                      </n-space>
                      <n-text depth="3" style="font-size: 12px;">
                        示例：https://example.com/video.mp4
                      </n-text>
                    </n-space>
                  </n-space>
                </n-card>

                <!-- 工具栏 -->
                <n-space justify="space-between" wrap>
                  <n-space wrap>
                    <n-select
                      v-model:value="currentVideo"
                      :options="videoOptions"
                      style="width: 300px"
                      placeholder="选择视频"
                      filterable
                      @update:value="changeVideo"
                    />
                  </n-space>
                  <n-space>
                    <n-button @click="playVideo">
                      <template #icon>
                        <n-icon :component="PlayOutline" />
                      </template>
                      播放
                    </n-button>
                    <n-button @click="pauseVideo">
                      <template #icon>
                        <n-icon :component="PauseOutline" />
                      </template>
                      暂停
                    </n-button>
                  </n-space>
                </n-space>

                <!-- 播放器容器 -->
                <div class="player-wrapper">
                  <div ref="playerContainer" class="player-container"></div>
                </div>

                <!-- 播放器控制信息 -->
                <n-space>
                  <n-text depth="3">当前时间：{{ currentTime }}s</n-text>
                  <n-divider vertical />
                  <n-text depth="3">总时长：{{ duration }}s</n-text>
                  <n-divider vertical />
                  <n-text depth="3">播放状态：{{ isPlaying ? '播放中' : '已暂停' }}</n-text>
                </n-space>
              </n-space>
            </n-card>

            <!-- 功能说明 -->
            <n-card title="播放器特性" style="margin-top: 24px">
              <n-grid :cols="2" :x-gap="24" :y-gap="16" responsive="screen">
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>在线链接播放</template>
                    <template #description>
                      支持输入在线视频链接直接播放，支持多种格式
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>多格式支持</template>
                    <template #description>
                      支持 MP4、WebM、HLS、FLV 等多种视频格式
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>倍速播放</template>
                    <template #description>
                      支持 0.5x 至 2x 倍速播放
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>全屏模式</template>
                    <template #description>
                      支持网页全屏和系统全屏
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>播放列表</template>
                    <template #description>
                      支持保存自定义链接到播放列表
                    </template>
                  </n-thing>
                </n-grid-item>
                <n-grid-item>
                  <n-thing>
                    <template #avatar>
                      <n-icon :component="CheckmarkCircleOutline" color="#18a058" size="24" />
                    </template>
                    <template #header>快捷键支持</template>
                    <template #description>
                      支持空格暂停、方向键快进等快捷键
                    </template>
                  </n-thing>
                </n-grid-item>
              </n-grid>
            </n-card>

            <!-- 使用说明 -->
            <n-card title="使用说明" style="margin-top: 24px">
              <n-space vertical :size="16">
                <n-alert type="info" title="在线链接播放">
                  <n-space vertical :size="8">
                    <n-text>支持通过在线链接播放视频，支持以下格式：</n-text>
                    <ul style="margin: 0; padding-left: 24px;">
                      <li>MP4、WebM、OGG 等标准视频格式</li>
                      <li>M3U8 (HLS) 流媒体格式</li>
                      <li>FLV、MOV、AVI 等其他格式</li>
                    </ul>
                    <n-text depth="3">输入链接后点击"加载并播放"即可开始播放，或点击"保存到列表"将链接添加到播放列表中。</n-text>
                  </n-space>
                </n-alert>
                <n-divider />
                <n-space vertical>
                  <n-text><strong>快捷键：</strong></n-text>
                  <ul style="margin: 0; padding-left: 24px;">
                    <li>空格键：播放/暂停</li>
                    <li>→ 方向键：快进 10 秒</li>
                    <li>← 方向键：快退 10 秒</li>
                    <li>↑ 方向键：增加音量</li>
                    <li>↓ 方向键：减少音量</li>
                    <li>F 键：全屏/退出全屏</li>
                  </ul>
                </n-space>
              </n-space>
            </n-card>
          </div>
        </n-layout-content>
      </n-layout>
    </div>
  </n-config-provider>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { darkTheme, useMessage } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'
import { 
  VideocamOutline,
  PlayOutline,
  PauseOutline,
  CheckmarkCircleOutline,
  LinkOutline,
  AddOutline
} from '@vicons/ionicons5'

/**
 * @description 视频播放器页面
 */

const message = useMessage()
const themeStore = useThemeStore()

// 主题
const isDark = computed(() => themeStore.isDark)

// 播放器容器和实例
const playerContainer = ref(null)
let player = null

// 当前视频
const currentVideo = ref('demo1')

// 在线链接输入
const videoUrl = ref('')
const loading = ref(false)

// 播放器状态
const currentTime = ref(0)
const duration = ref(0)
const isPlaying = ref(false)

// 视频选项（使用 ref 以便动态添加）
const videoOptions = ref([
  { 
    label: '演示视频 1 - Big Buck Bunny', 
    value: 'demo1',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  },
  { 
    label: '演示视频 2 - Sintel', 
    value: 'demo2',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  },
  { 
    label: '演示视频 3 - Elephant Dream', 
    value: 'demo3',
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  }
])

/**
 * @description 初始化播放器
 */
const initPlayer = () => {
  if (!playerContainer.value) return

  const videoInfo = videoOptions.value.find(v => v.value === currentVideo.value)

  player = new Player({
    el: playerContainer.value,
    url: videoInfo.url,
    width: '100%',
    height: '500px',
    autoplay: false,
    playbackRate: [0.5, 0.75, 1, 1.25, 1.5, 2],
    defaultPlaybackRate: 1,
    pip: true, // 画中画
    fluid: true,
    lang: 'zh-cn',
    
    // 监听播放事件
    play: () => {
      isPlaying.value = true
    },
    
    // 监听暂停事件
    pause: () => {
      isPlaying.value = false
    },
    
    // 监听时间更新
    timeupdate: () => {
      if (player) {
        currentTime.value = Math.floor(player.currentTime)
        duration.value = Math.floor(player.duration)
      }
    }
  })

  message.success('播放器加载成功')
}

/**
 * @description 切换视频
 */
const changeVideo = (value) => {
  const videoInfo = videoOptions.value.find(v => v.value === value)
  
  if (player && videoInfo) {
    player.src = videoInfo.url
    message.success(`已切换到：${videoInfo.label}`)
  }
}

/**
 * @description 播放视频
 */
const playVideo = () => {
  if (player) {
    player.play()
  }
}

/**
 * @description 暂停视频
 */
const pauseVideo = () => {
  if (player) {
    player.pause()
  }
}

/**
 * @description 验证视频链接
 */
const isValidVideoUrl = (url) => {
  if (!url || !url.trim()) return false
  
  try {
    const urlObj = new URL(url.trim())
    // 检查是否是 http 或 https
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false
    }
    
    // 检查是否是常见的视频格式
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.m3u8', '.flv', '.mov', '.avi']
    const pathname = urlObj.pathname.toLowerCase()
    const hasVideoExtension = videoExtensions.some(ext => pathname.endsWith(ext))
    
    // 如果是 M3U8 或没有扩展名但看起来像视频链接，也认为是有效的
    return hasVideoExtension || pathname.includes('video') || url.includes('.m3u8')
  } catch (e) {
    return false
  }
}

/**
 * @description 加载在线链接
 */
const loadUrl = async () => {
  if (!videoUrl.value || !videoUrl.value.trim()) {
    message.warning('请输入视频链接')
    return
  }

  const url = videoUrl.value.trim()

  if (!isValidVideoUrl(url)) {
    message.warning('请输入有效的视频链接（支持 MP4、M3U8、WebM 等格式）')
    return
  }

  loading.value = true

  try {
    // 如果播放器已存在，更新视频源
    if (player) {
      player.src = url
      player.play()
      message.success('视频链接加载成功，开始播放')
    } else {
      // 如果播放器不存在，先初始化
      initPlayerWithUrl(url)
    }
  } catch (error) {
    console.error('加载视频失败:', error)
    message.error('加载视频失败，请检查链接是否正确')
  } finally {
    loading.value = false
  }
}

/**
 * @description 使用指定 URL 初始化播放器
 */
const initPlayerWithUrl = (url) => {
  if (!playerContainer.value) return

  // 如果已有播放器实例，先销毁
  if (player) {
    player.destroy()
  }

  player = new Player({
    el: playerContainer.value,
    url: url,
    width: '100%',
    height: '500px',
    autoplay: true,
    playbackRate: [0.5, 0.75, 1, 1.25, 1.5, 2],
    defaultPlaybackRate: 1,
    pip: true,
    fluid: true,
    lang: 'zh-cn',
    
    play: () => {
      isPlaying.value = true
    },
    
    pause: () => {
      isPlaying.value = false
    },
    
    timeupdate: () => {
      if (player) {
        currentTime.value = Math.floor(player.currentTime)
        duration.value = Math.floor(player.duration)
      }
    }
  })

  message.success('视频加载成功')
}

/**
 * @description 保存到播放列表
 */
const saveToPlaylist = () => {
  if (!videoUrl.value || !videoUrl.value.trim()) {
    message.warning('请输入视频链接')
    return
  }

  const url = videoUrl.value.trim()

  if (!isValidVideoUrl(url)) {
    message.warning('请输入有效的视频链接')
    return
  }

  // 检查是否已存在
  const exists = videoOptions.value.some(v => v.url === url)
  if (exists) {
    message.warning('该链接已存在于播放列表中')
    return
  }

  // 生成新的选项
  const newOption = {
    label: `自定义视频 ${videoOptions.value.length - 2}`,
    value: `custom-${Date.now()}`,
    url: url
  }

  videoOptions.value.push(newOption)
  currentVideo.value = newOption.value
  
  // 切换到新视频
  changeVideo(newOption.value)
  
  message.success('已保存到播放列表')
  videoUrl.value = '' // 清空输入框
}

onMounted(() => {
  initPlayer()
})

onBeforeUnmount(() => {
  if (player) {
    player.destroy()
  }
})
</script>

<style scoped>
.video-player-page {
  min-height: 100vh;
  background: var(--n-color);
}

.player-content {
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

.player-wrapper {
  width: 100%;
}

.player-container {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
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
