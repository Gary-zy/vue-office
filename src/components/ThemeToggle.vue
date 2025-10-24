<template>
  <n-dropdown 
    :options="themeOptions" 
    @select="setTheme"
    trigger="click"
    placement="bottom-end"
  >
    <n-button 
      circle 
      quaternary
      :aria-label="'当前主题: ' + getCurrentThemeLabel()"
    >
      <template #icon>
        <n-icon :size="18">
          <component :is="getThemeIcon()" />
        </n-icon>
      </template>
    </n-button>
  </n-dropdown>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import { useColorMode } from '@vueuse/core'
import { 
  SunnyOutline as SunIcon,
  MoonOutline as MoonIcon,
  DesktopOutline as DesktopIcon
} from '@vicons/ionicons5'

/**
 * @description 主题切换组件
 * 使用 Naive UI 的下拉菜单和按钮组件提供明亮、暗黑和系统主题的切换功能
 */

// 使用 VueUse 的 useColorMode 管理主题状态
const mode = useColorMode({
  modes: {
    light: 'light',
    dark: 'dark',
    system: 'auto'
  }
})

/**
 * @description 获取当前主题对应的图标组件
 * @returns {Component} Vue 组件
 */
const getThemeIcon = () => {
  switch (mode.value) {
    case 'light':
      return SunIcon
    case 'dark':
      return MoonIcon
    default:
      return DesktopIcon
  }
}

/**
 * @description 获取当前主题的标签文本
 * @returns {string} 主题标签
 */
const getCurrentThemeLabel = () => {
  switch (mode.value) {
    case 'light':
      return '明亮'
    case 'dark':
      return '暗黑'
    default:
      return '系统'
  }
}

/**
 * @description 设置主题模式
 * @param {string} theme - 主题模式 ('light' | 'dark' | 'system')
 */
const setTheme = (theme) => {
  mode.value = theme
}

// 主题选项配置 - 适配 Naive UI 下拉菜单格式
const themeOptions = computed(() => [
  {
    key: 'light',
    label: '明亮',
    icon: () => h(SunIcon)
  },
  {
    key: 'dark', 
    label: '暗黑',
    icon: () => h(MoonIcon)
  },
  {
    key: 'system',
    label: '系统',
    icon: () => h(DesktopIcon)
  }
])
</script>

<style scoped>
/* Naive UI 组件的自定义样式 */
</style>