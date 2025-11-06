<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="indoor-guide-page">
      <div class="guide-container">
        <!-- 顶部搜索栏 -->
        <div class="search-header">
          <n-input
            v-model:value="searchKeyword"
            placeholder="请输入搜索关键词"
            clearable
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <n-icon :component="SearchOutline" />
            </template>
            <template #suffix>
              <n-button text @click="handleSearchCancel" v-if="searchKeyword">
                取消
              </n-button>
            </template>
          </n-input>
        </div>

        <!-- 快速设施按钮 -->
        <div class="quick-facilities">
          <n-button
            v-for="facility in quickFacilities"
            :key="facility.type"
            :type="selectedFacilityType === facility.type ? 'primary' : 'default'"
            size="small"
            @click="toggleFacilityFilter(facility.type)"
          >
            <template #icon>
              <span style="font-size: 16px;">{{ facility.icon }}</span>
            </template>
            {{ facility.label }}
          </n-button>
        </div>

        <!-- 主内容区 -->
        <div class="main-content">
          <!-- 左侧控制面板 -->
          <div class="left-panel">
            <n-button
              text
              class="scan-button"
              @click="showScanDialog = true"
            >
              <template #icon>
                <n-icon :component="QrCodeOutline" />
              </template>
              扫码讲解
            </n-button>
            <n-button
              text
              :type="mapMode ? 'primary' : 'default'"
              class="map-button"
              @click="mapMode = !mapMode"
            >
              <template #icon>
                <n-icon :component="MapOutline" />
              </template>
              地图导览
            </n-button>
          </div>

          <!-- 中间楼层平面图 -->
          <div class="floor-map-container" ref="mapContainer">
            <div class="floor-map-wrapper" :style="{ height: mapHeight + 'px' }">
              <!-- SVG 楼层平面图 -->
              <svg
                :width="currentFloor?.svg.width || 800"
                :height="currentFloor?.svg.height || 600"
                :viewBox="currentFloor?.svg.viewBox || '0 0 800 600'"
                class="floor-svg"
                @click="handleMapClick"
              >
                <!-- 走廊 -->
                <g v-for="corridor in currentFloor?.corridors" :key="corridor.id">
                  <polyline
                    v-for="(point, index) in corridor.points.slice(1)"
                    :key="index"
                    :points="`${corridor.points[index].x},${corridor.points[index].y} ${point.x},${point.y}`"
                    :stroke="isDark ? '#666' : '#ddd'"
                    :stroke-width="corridor.width"
                    fill="none"
                    stroke-linecap="round"
                  />
                </g>

                <!-- 房间 -->
                <g v-for="room in filteredRooms" :key="room.id">
                  <rect
                    :x="room.x"
                    :y="room.y"
                    :width="room.width"
                    :height="room.height"
                    :fill="getRoomColor(room.type)"
                    :stroke="getRoomStrokeColor(room.type)"
                    stroke-width="2"
                    :class="{ 'room-highlight': selectedRoom?.id === room.id }"
                    @click.stop="selectRoom(room)"
                    style="cursor: pointer;"
                  />
                  <text
                    :x="room.x + room.width / 2"
                    :y="room.y + room.height / 2"
                    text-anchor="middle"
                    dominant-baseline="middle"
                    :fill="getRoomStrokeColor(room.type)"
                    font-size="14"
                    font-weight="bold"
                    pointer-events="none"
                  >
                    {{ room.name }}
                  </text>
                </g>

                <!-- 设施标记 -->
                <g v-for="facility in filteredFacilities" :key="facility.id">
                  <circle
                    :cx="facility.x"
                    :cy="facility.y"
                    r="15"
                    :fill="getFacilityColor(facility.type)"
                    :stroke="getFacilityColor(facility.type)"
                    stroke-width="2"
                    :class="{ 'facility-highlight': selectedFacilityType === facility.type }"
                    @click.stop="selectFacility(facility)"
                    style="cursor: pointer;"
                  />
                  <text
                    :x="facility.x"
                    :y="facility.y - 25"
                    text-anchor="middle"
                    :fill="getFacilityColor(facility.type)"
                    font-size="18"
                    pointer-events="none"
                  >
                    {{ facility.icon }}
                  </text>
                  <text
                    :x="facility.x"
                    :y="facility.y + 5"
                    text-anchor="middle"
                    :fill="getFacilityColor(facility.type)"
                    font-size="10"
                    font-weight="bold"
                    pointer-events="none"
                  >
                    {{ facility.name }}
                  </text>
                </g>
              </svg>

              <!-- 缩放控制 -->
              <div class="zoom-controls">
                <n-button size="small" @click="zoomIn">
                  <template #icon>
                    <n-icon :component="AddOutline" />
                  </template>
                </n-button>
                <n-button size="small" @click="zoomOut">
                  <template #icon>
                    <n-icon :component="RemoveOutline" />
                  </template>
                </n-button>
                <n-button size="small" @click="resetZoom">
                  <template #icon>
                    <n-icon :component="RefreshOutline" />
                  </template>
                </n-button>
              </div>
            </div>
          </div>

          <!-- 右侧楼层选择器 -->
          <div class="floor-selector">
            <n-button
              text
              size="small"
              :disabled="currentFloorIndex === 0"
              @click="switchFloor(-1)"
            >
              <template #icon>
                <n-icon :component="ChevronUpOutline" />
              </template>
            </n-button>
            <n-scrollbar style="max-height: 400px;">
              <div class="floor-list">
                <n-button
                  v-for="(floor, index) in currentBuilding?.floors"
                  :key="floor.id"
                  :type="currentFloor?.id === floor.id ? 'primary' : 'default'"
                  :class="{ 'floor-active': currentFloor?.id === floor.id }"
                  @click="switchFloorByIndex(index)"
                  block
                  style="margin-bottom: 8px;"
                >
                  {{ floor.name }}
                </n-button>
              </div>
            </n-scrollbar>
            <n-button
              text
              size="small"
              :disabled="currentFloorIndex === (currentBuilding?.floors.length || 0) - 1"
              @click="switchFloor(1)"
            >
              <template #icon>
                <n-icon :component="ChevronDownOutline" />
              </template>
            </n-button>
          </div>
        </div>
      </div>

      <!-- 房间详情对话框 -->
      <n-modal v-model:show="showRoomDetail" preset="card" style="width: 600px" title="展区详情">
        <div v-if="selectedRoom">
          <n-space vertical :size="16">
            <n-descriptions :column="1" bordered>
              <n-descriptions-item label="名称">
                {{ selectedRoom.name }}
              </n-descriptions-item>
              <n-descriptions-item label="类型">
                <n-tag :type="getRoomTypeTag(selectedRoom.type)">
                  {{ getRoomTypeLabel(selectedRoom.type) }}
                </n-tag>
              </n-descriptions-item>
              <n-descriptions-item label="描述">
                {{ selectedRoom.description }}
              </n-descriptions-item>
              <n-descriptions-item label="展品" v-if="selectedRoom.exhibits">
                <n-space>
                  <n-tag v-for="(exhibit, index) in selectedRoom.exhibits" :key="index" size="small">
                    {{ exhibit }}
                  </n-tag>
                </n-space>
              </n-descriptions-item>
            </n-descriptions>
          </n-space>
        </div>
      </n-modal>

      <!-- 扫码讲解对话框 -->
      <n-modal v-model:show="showScanDialog" preset="card" style="width: 400px" title="扫码讲解">
        <n-space vertical :size="16">
          <n-alert type="info">
            请使用手机扫描展品旁的二维码，即可收听语音讲解。
          </n-alert>
          <div style="text-align: center; padding: 20px;">
            <canvas ref="qrCodeCanvas" style="display: inline-block;"></canvas>
            <n-text depth="3" style="display: block; margin-top: 12px;">
              示例二维码
            </n-text>
          </div>
        </n-space>
      </n-modal>
    </div>
  </n-config-provider>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { darkTheme, useMessage } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import QRCode from 'qrcode'
import {
  SearchOutline,
  QrCodeOutline,
  MapOutline,
  AddOutline,
  RemoveOutline,
  RefreshOutline,
  ChevronUpOutline,
  ChevronDownOutline
} from '@vicons/ionicons5'

// 导入 mock 数据
import indoorData from '@/assets/mock/indoor-guide.json'

/**
 * @description 室内导览工具页面
 */

const message = useMessage()
const themeStore = useThemeStore()

// 主题
const isDark = computed(() => themeStore.isDark)

// 数据
const buildings = ref(indoorData.buildings)
const facilityTypes = ref(indoorData.facilityTypes)
const roomTypes = ref(indoorData.roomTypes)

// 当前状态
const currentBuilding = computed(() => buildings.value[0])
const currentFloorIndex = ref(0)
const currentFloor = computed(() => {
  return currentBuilding.value?.floors[currentFloorIndex.value]
})

// 搜索
const searchKeyword = ref('')
const searchResults = ref([])

// 选中状态
const selectedRoom = ref(null)
const selectedFacilityType = ref(null)
const showRoomDetail = ref(false)
const showScanDialog = ref(false)
const mapMode = ref(true)

// 缩放
const zoomLevel = ref(1)
const mapHeight = ref(600)

// DOM 引用
const mapContainer = ref(null)
const qrCodeCanvas = ref(null)

// 快速设施按钮
const quickFacilities = computed(() => {
  return Object.values(facilityTypes.value).map(type => ({
    ...type,
    type: Object.keys(facilityTypes.value).find(
      key => facilityTypes.value[key] === type
    )
  }))
})

// 过滤后的房间和设施
const filteredRooms = computed(() => {
  let rooms = currentFloor.value?.rooms || []
  
  // 搜索过滤
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    rooms = rooms.filter(room =>
      room.name.toLowerCase().includes(keyword) ||
      room.description?.toLowerCase().includes(keyword) ||
      room.exhibits?.some(exhibit => exhibit.toLowerCase().includes(keyword))
    )
  }
  
  return rooms
})

const filteredFacilities = computed(() => {
  let facilities = currentFloor.value?.facilities || []
  
  // 设施类型过滤
  if (selectedFacilityType.value) {
    facilities = facilities.filter(f => f.type === selectedFacilityType.value)
  }
  
  return facilities
})

/**
 * @description 切换楼层
 */
const switchFloor = (direction) => {
  const maxIndex = currentBuilding.value.floors.length - 1
  const newIndex = currentFloorIndex.value + direction
  
  if (newIndex >= 0 && newIndex <= maxIndex) {
    currentFloorIndex.value = newIndex
    selectedRoom.value = null
    message.success(`已切换到${currentFloor.value.name}`)
  }
}

/**
 * @description 按索引切换楼层
 */
const switchFloorByIndex = (index) => {
  currentFloorIndex.value = index
  selectedRoom.value = null
  message.success(`已切换到${currentFloor.value.name}`)
}

/**
 * @description 选择房间
 */
const selectRoom = (room) => {
  selectedRoom.value = room
  showRoomDetail.value = true
  message.info(`已选择：${room.name}`)
}

/**
 * @description 选择设施
 */
const selectFacility = (facility) => {
  message.info(`已定位：${facility.name}`)
}

/**
 * @description 切换设施过滤
 */
const toggleFacilityFilter = (type) => {
  if (selectedFacilityType.value === type) {
    selectedFacilityType.value = null
  } else {
    selectedFacilityType.value = type
  }
}

/**
 * @description 搜索
 */
const handleSearch = () => {
  if (!searchKeyword.value) return
  
  const keyword = searchKeyword.value.toLowerCase()
  const results = []
  
  currentBuilding.value.floors.forEach(floor => {
    floor.rooms.forEach(room => {
      if (
        room.name.toLowerCase().includes(keyword) ||
        room.description?.toLowerCase().includes(keyword) ||
        room.exhibits?.some(exhibit => exhibit.toLowerCase().includes(keyword))
      ) {
        results.push({ ...room, floor: floor.name })
      }
    })
  })
  
  searchResults.value = results
  
  if (results.length > 0) {
    // 自动切换到第一个结果的楼层
    const firstResult = results[0]
    const floorIndex = currentBuilding.value.floors.findIndex(
      f => f.name === firstResult.floor
    )
    if (floorIndex !== -1) {
      currentFloorIndex.value = floorIndex
      message.success(`找到 ${results.length} 个结果`)
    }
  } else {
    message.warning('未找到相关展品')
  }
}

/**
 * @description 取消搜索
 */
const handleSearchCancel = () => {
  searchKeyword.value = ''
  searchResults.value = []
  selectedFacilityType.value = null
}

/**
 * @description 地图点击
 */
const handleMapClick = (event) => {
  // 点击空白区域取消选择
  if (event.target.tagName === 'svg' || event.target.tagName === 'g') {
    selectedRoom.value = null
  }
}

/**
 * @description 获取房间颜色
 */
const getRoomColor = (type) => {
  const roomType = roomTypes.value[type]
  return isDark.value 
    ? roomType?.fill.replace('#', '#33') || '#333'
    : roomType?.fill || '#f0f0f0'
}

/**
 * @description 获取房间边框颜色
 */
const getRoomStrokeColor = (type) => {
  const roomType = roomTypes.value[type]
  return roomType?.color || '#666'
}

/**
 * @description 获取设施颜色
 */
const getFacilityColor = (type) => {
  const facilityType = facilityTypes.value[type]
  return facilityType?.color || '#1890ff'
}

/**
 * @description 获取房间类型标签
 */
const getRoomTypeLabel = (type) => {
  return roomTypes.value[type]?.label || type
}

/**
 * @description 获取房间类型标签类型
 */
const getRoomTypeTag = (type) => {
  const types = {
    exhibition: 'success',
    info: 'info',
    shop: 'warning',
    restaurant: 'error'
  }
  return types[type] || 'default'
}

/**
 * @description 缩放控制
 */
const zoomIn = () => {
  zoomLevel.value = Math.min(zoomLevel.value + 0.1, 2)
  updateZoom()
}

const zoomOut = () => {
  zoomLevel.value = Math.max(zoomLevel.value - 0.1, 0.5)
  updateZoom()
}

const resetZoom = () => {
  zoomLevel.value = 1
  updateZoom()
}

const updateZoom = () => {
  const svg = mapContainer.value?.querySelector('.floor-svg')
  if (svg) {
    svg.style.transform = `scale(${zoomLevel.value})`
    svg.style.transformOrigin = 'center center'
  }
}

/**
 * @description 生成二维码
 */
const generateQRCode = async () => {
  if (!qrCodeCanvas.value) return
  
  try {
    const url = 'https://museum.example.com/audio-guide/123'
    await QRCode.toCanvas(qrCodeCanvas.value, url, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })
  } catch (error) {
    console.error('生成二维码失败:', error)
  }
}

// 监听扫码对话框显示
watch(showScanDialog, (value) => {
  if (value) {
    nextTick(() => {
      generateQRCode()
    })
  }
})

onMounted(() => {
  if (currentBuilding.value?.floors.length > 0) {
    currentFloorIndex.value = 0
  }
})
</script>

<style scoped>
.indoor-guide-page {
  min-height: 100vh;
  background: var(--n-color);
  padding: 16px;
}

.guide-container {
  max-width: 1400px;
  margin: 0 auto;
}

.search-header {
  margin-bottom: 16px;
}

.quick-facilities {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.main-content {
  display: flex;
  gap: 16px;
  height: calc(100vh - 200px);
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 120px;
}

.scan-button,
.map-button {
  width: 100%;
  justify-content: flex-start;
}

.floor-map-container {
  flex: 1;
  position: relative;
  overflow: auto;
  background: var(--n-color);
  border-radius: 8px;
  border: 1px solid var(--n-border-color);
}

.floor-map-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.floor-svg {
  background: var(--n-color);
  transition: transform 0.3s ease;
}

.room-highlight {
  stroke-width: 4 !important;
  filter: drop-shadow(0 0 8px rgba(24, 160, 88, 0.5));
}

.facility-highlight {
  filter: drop-shadow(0 0 8px currentColor);
}

.zoom-controls {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.floor-selector {
  display: flex;
  flex-direction: column;
  width: 80px;
  align-items: center;
  gap: 8px;
}

.floor-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.floor-active {
  font-weight: bold;
}

/* 响应式 */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    height: auto;
  }

  .left-panel {
    flex-direction: row;
    width: 100%;
  }

  .floor-selector {
    flex-direction: row;
    width: 100%;
    justify-content: center;
  }

  .floor-map-wrapper {
    min-height: 400px;
  }
}
</style>

