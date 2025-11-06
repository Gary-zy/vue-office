<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="map-viewer-page">
      <n-layout has-sider>
        <!-- 左侧边栏 -->
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="0"
          :width="300"
          :collapsed="sidebarCollapsed"
          show-trigger="bar"
          @collapse="sidebarCollapsed = true"
          @expand="sidebarCollapsed = false"
        >
          <div class="sidebar-content">
            <n-tabs type="segment" animated>
              <n-tab-pane name="museums" tab="博物馆">
                <n-list>
                  <n-list-item
                    v-for="museum in museums"
                    :key="museum.id"
                    @click="selectMuseum(museum)"
                    class="museum-item"
                  >
                    <n-thing :title="museum.name" :description="museum.description" />
                  </n-list-item>
                </n-list>
              </n-tab-pane>
              
              <n-tab-pane name="floors" tab="楼层" v-if="selectedMuseum">
                <n-space vertical>
                  <n-radio-group v-model:value="selectedFloorId">
                    <n-space vertical>
                      <n-radio
                        v-for="floor in selectedMuseum.floors"
                        :key="floor.id"
                        :value="floor.id"
                        @change="switchFloor(floor)"
                      >
                        {{ floor.name }}
                      </n-radio>
                    </n-space>
                  </n-radio-group>
                </n-space>
              </n-tab-pane>
              
              <n-tab-pane name="buildings" tab="建筑" v-if="selectedFloor">
                <n-list>
                  <n-list-item
                    v-for="building in selectedFloor.buildings"
                    :key="building.id"
                    @click="selectBuilding(building)"
                    class="building-item"
                  >
                    <n-thing>
                      <template #header>
                        <n-space align="center">
                          <n-tag :type="getBuildingType(building.type)" size="small">
                            {{ getBuildingTypeLabel(building.type) }}
                          </n-tag>
                          <span>{{ building.name }}</span>
                        </n-space>
                      </template>
                      <template #description>
                        {{ building.description }}
                      </template>
                    </n-thing>
                  </n-list-item>
                </n-list>
              </n-tab-pane>
              
              <n-tab-pane name="facilities" tab="设施" v-if="selectedMuseum">
                <n-list>
                  <n-list-item
                    v-for="facility in selectedMuseum.facilities"
                    :key="facility.id"
                    @click="selectFacility(facility)"
                    class="facility-item"
                  >
                    <n-thing :title="facility.name" />
                  </n-list-item>
                </n-list>
              </n-tab-pane>
            </n-tabs>
          </div>
        </n-layout-sider>

        <!-- 主内容区 -->
        <n-layout-content>
          <div class="content-container">
            <!-- 页面标题 -->
            <div class="page-header">
              <h1 class="page-title">
                <n-icon :component="LocationOutline" />
                地图导览系统
              </h1>
              <p class="page-subtitle">
                支持博物馆楼层导览、建筑标点、路线规划等功能
              </p>
            </div>

            <!-- 地图卡片 -->
            <n-card>
              <template #header>
                <n-space justify="space-between">
                  <span>{{ selectedMuseum ? selectedMuseum.name : '选择博物馆开始导览' }}</span>
                  <n-space v-if="selectedMuseum">
                    <n-tag type="info">{{ selectedFloor ? selectedFloor.name : '选择楼层' }}</n-tag>
                    <n-button size="small" @click="showRouteDialog = true">
                      <template #icon>
                        <n-icon :component="NavigateOutline" />
                      </template>
                      推荐路线
                    </n-button>
                  </n-space>
                </n-space>
              </template>

              <!-- 地图容器 -->
              <div class="map-wrapper">
                <div ref="mapContainer" class="map-container"></div>
              </div>

              <!-- 地图信息 -->
              <template #footer>
                <n-space>
                  <n-text depth="3" v-if="selectedBuilding">
                    当前选中：{{ selectedBuilding.name }}
                  </n-text>
                  <n-divider vertical v-if="selectedBuilding" />
                  <n-text depth="3">
                    标记数：{{ allMarkers.length }}
                  </n-text>
                </n-space>
              </template>
            </n-card>
          </div>
        </n-layout-content>
      </n-layout>

      <!-- 建筑详情对话框 -->
      <n-modal v-model:show="showBuildingDetail" preset="card" style="width: 600px" title="建筑详情">
        <div v-if="selectedBuilding">
          <n-space vertical :size="16">
            <img v-if="selectedBuilding.image" :src="selectedBuilding.image" style="width: 100%; border-radius: 8px;" />
            <n-descriptions :column="1" bordered>
              <n-descriptions-item label="名称">
                {{ selectedBuilding.name }}
              </n-descriptions-item>
              <n-descriptions-item label="类型">
                <n-tag :type="getBuildingType(selectedBuilding.type)">
                  {{ getBuildingTypeLabel(selectedBuilding.type) }}
                </n-tag>
              </n-descriptions-item>
              <n-descriptions-item label="描述">
                {{ selectedBuilding.description }}
              </n-descriptions-item>
              <n-descriptions-item label="开放时间" v-if="selectedBuilding.openTime">
                {{ selectedBuilding.openTime }}
              </n-descriptions-item>
              <n-descriptions-item label="展品" v-if="selectedBuilding.exhibits">
                <n-space>
                  <n-tag v-for="(exhibit, index) in selectedBuilding.exhibits" :key="index" size="small">
                    {{ exhibit }}
                  </n-tag>
                </n-space>
              </n-descriptions-item>
            </n-descriptions>
          </n-space>
        </div>
      </n-modal>

      <!-- 推荐路线对话框 -->
      <n-modal v-model:show="showRouteDialog" preset="card" style="width: 500px" title="推荐游览路线">
        <n-list v-if="recommendedRoute">
          <n-list-item>
            <n-thing>
              <template #header>{{ recommendedRoute.name }}</template>
              <template #description>
                <n-space vertical :size="8">
                  <n-text>{{ recommendedRoute.description }}</n-text>
                  <n-text depth="3">预计用时：{{ recommendedRoute.duration }}</n-text>
                </n-space>
              </template>
            </n-thing>
          </n-list-item>
        </n-list>
        <template #action>
          <n-button type="primary" block @click="startTour">
            开始导览
          </n-button>
        </template>
      </n-modal>
    </div>
  </n-config-provider>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { darkTheme, useMessage } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { 
  LocationOutline,
  NavigateOutline
} from '@vicons/ionicons5'

// 导入 mock 数据
import museumData from '@/assets/mock/museum-data.json'

/**
 * @description 地图导览工具页面
 */

const message = useMessage()
const themeStore = useThemeStore()

// 主题
const isDark = computed(() => themeStore.isDark)

// 地图容器和实例
const mapContainer = ref(null)
let map = null

// 侧边栏状态
const sidebarCollapsed = ref(false)

// 数据
const museums = ref(museumData.museums)
const routes = ref(museumData.routes)

// 选中状态
const selectedMuseum = ref(null)
const selectedFloorId = ref(null)
const selectedFloor = computed(() => {
  if (!selectedMuseum.value || !selectedFloorId.value) return null
  return selectedMuseum.value.floors.find(f => f.id === selectedFloorId.value)
})
const selectedBuilding = ref(null)

// 对话框
const showBuildingDetail = ref(false)
const showRouteDialog = ref(false)

// 推荐路线
const recommendedRoute = computed(() => {
  if (!selectedMuseum.value) return null
  return routes.value.find(r => r.museum === selectedMuseum.value.id)
})

// 所有标记
const allMarkers = ref([])
let markersLayer = null

/**
 * @description 初始化地图
 */
const initMap = () => {
  if (!mapContainer.value) return

  // 修复 Leaflet 默认图标路径问题
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
  })

  // 创建地图 - 默认显示北京
  map = L.map(mapContainer.value).setView([39.9042, 116.4074], 13)

  // 添加 OpenStreetMap 图层
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map)

  // 创建标记图层组
  markersLayer = L.layerGroup().addTo(map)

  message.success('地图加载成功')
}

/**
 * @description 选择博物馆
 */
const selectMuseum = (museum) => {
  selectedMuseum.value = museum
  selectedFloorId.value = museum.floors[0]?.id
  selectedBuilding.value = null
  
  // 移动地图到博物馆位置
  if (map) {
    map.setView(museum.center, museum.zoom)
  }
  
  // 加载博物馆设施标记
  loadFacilities()
  
  message.success(`已选择：${museum.name}`)
}

/**
 * @description 切换楼层
 */
const switchFloor = (floor) => {
  selectedBuilding.value = null
  loadBuildings()
  message.success(`已切换到${floor.name}`)
}

/**
 * @description 加载建筑标记
 */
const loadBuildings = () => {
  if (!selectedFloor.value || !map) return
  
  // 清除旧标记
  markersLayer.clearLayers()
  allMarkers.value = []
  
  // 创建自定义图标
  const buildingIcon = L.divIcon({
    className: 'custom-marker building-marker',
    html: '<div style="background: #18a058; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">📍</div>',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
  })
  
  // 添加建筑标记
  selectedFloor.value.buildings.forEach(building => {
    const marker = L.marker(building.position, { icon: buildingIcon })
      .bindPopup(`
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0;">${building.name}</h3>
          <p style="margin: 0;">${building.description}</p>
        </div>
      `)
      .on('click', () => {
        selectedBuilding.value = building
        showBuildingDetail.value = true
      })
    
    markersLayer.addLayer(marker)
    allMarkers.value.push(marker)
  })
  
  // 调整地图视图以显示所有标记
  if (allMarkers.value.length > 0) {
    const group = L.featureGroup(allMarkers.value)
    map.fitBounds(group.getBounds().pad(0.1))
  }
}

/**
 * @description 加载设施标记
 */
const loadFacilities = () => {
  if (!selectedMuseum.value || !map) return
  
  // 清除旧标记
  markersLayer.clearLayers()
  allMarkers.value = []
  
  // 添加设施标记
  selectedMuseum.value.facilities.forEach(facility => {
    const facilityIcon = L.divIcon({
      className: 'custom-marker facility-marker',
      html: `<div style="background: #2080f0; color: white; padding: 4px 12px; border-radius: 16px; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${getFacilityIcon(facility.type)} ${facility.name}</div>`,
      iconSize: [null, 32],
      iconAnchor: [0, 16]
    })
    
    const marker = L.marker(facility.position, { icon: facilityIcon })
      .bindPopup(`<strong>${facility.name}</strong>`)
    
    markersLayer.addLayer(marker)
    allMarkers.value.push(marker)
  })
}

/**
 * @description 选择建筑
 */
const selectBuilding = (building) => {
  selectedBuilding.value = building
  
  // 移动地图到建筑位置
  if (map) {
    map.setView(building.position, 18)
  }
  
  // 打开详情弹窗
  showBuildingDetail.value = true
}

/**
 * @description 选择设施
 */
const selectFacility = (facility) => {
  if (map) {
    map.setView(facility.position, 18)
  }
  message.success(`已定位：${facility.name}`)
}

/**
 * @description 开始导览
 */
const startTour = () => {
  if (!recommendedRoute.value || !selectedMuseum.value) return
  
  showRouteDialog.value = false
  
  // 获取路线中的所有建筑
  const routeBuildings = selectedFloor.value.buildings.filter(b => 
    recommendedRoute.value.points.includes(b.id)
  )
  
  if (routeBuildings.length > 0) {
    // 绘制路线
    const latlngs = routeBuildings.map(b => b.position)
    const polyline = L.polyline(latlngs, { color: '#f0a020', weight: 4, opacity: 0.7 })
      .addTo(map)
    
    // 调整视图
    map.fitBounds(polyline.getBounds().pad(0.1))
    
    message.success('路线已规划，沿着橙色线路游览')
  }
}

/**
 * @description 获取建筑类型标签类型
 */
const getBuildingType = (type) => {
  const types = {
    entrance: 'info',
    exhibition: 'success',
    shop: 'warning',
    restaurant: 'error'
  }
  return types[type] || 'default'
}

/**
 * @description 获取建筑类型标签
 */
const getBuildingTypeLabel = (type) => {
  const labels = {
    entrance: '入口',
    exhibition: '展厅',
    shop: '商店',
    restaurant: '餐厅'
  }
  return labels[type] || type
}

/**
 * @description 获取设施图标
 */
const getFacilityIcon = (type) => {
  const icons = {
    info: 'ℹ️',
    restroom: '🚻',
    restaurant: '🍴',
    shop: '🛍️',
    cafe: '☕',
    entrance: '🚪'
  }
  return icons[type] || '📍'
}

onMounted(() => {
  initMap()
  // 默认选择第一个博物馆
  if (museums.value.length > 0) {
    selectMuseum(museums.value[0])
  }
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
.map-viewer-page {
  min-height: 100vh;
  background: var(--n-color);
}

.sidebar-content {
  padding: 16px;
  height: 100vh;
  overflow-y: auto;
}

.museum-item,
.building-item,
.facility-item {
  cursor: pointer;
  transition: background 0.2s;
}

.museum-item:hover,
.building-item:hover,
.facility-item:hover {
  background: var(--n-color-hover);
}

.content-container {
  padding: 24px;
}

.page-header {
  text-align: center;
  margin-bottom: 24px;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--n-title-text-color);
}

.page-title .n-icon {
  font-size: 32px;
}

.page-subtitle {
  font-size: 14px;
  color: var(--n-text-color);
  opacity: 0.7;
  margin: 0;
}

.map-wrapper {
  width: 100%;
}

.map-container {
  width: 100%;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
}

/* 响应式 */
@media (max-width: 768px) {
  .page-title {
    font-size: 20px;
  }

  .page-subtitle {
    font-size: 12px;
  }

  .map-container {
    height: 400px;
  }
}
</style>
