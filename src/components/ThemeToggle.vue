<script setup>
import { ref, onMounted } from 'vue'
import { useColorMode } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/**
 * @description 主题切换组件
 * 提供明亮、暗黑和系统主题的切换功能
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
 * @description 获取当前主题对应的图标
 * @returns {string} 图标名称
 */
const getThemeIcon = () => {
  switch (mode.value) {
    case 'light':
      return 'radix-icons:sun'
    case 'dark':
      return 'radix-icons:moon'
    default:
      return 'radix-icons:desktop'
  }
}

/**
 * @description 设置主题模式
 * @param {string} theme - 主题模式 ('light' | 'dark' | 'system')
 */
const setTheme = (theme) => {
  mode.value = theme
}

// 主题选项配置
const themeOptions = [
  { value: 'light', label: '明亮', icon: 'radix-icons:sun' },
  { value: 'dark', label: '暗黑', icon: 'radix-icons:moon' },
  { value: 'system', label: '系统', icon: 'radix-icons:desktop' }
]
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon" class="relative">
        <Icon 
          :icon="getThemeIcon()" 
          class="h-4 w-4 transition-all"
        />
        <span class="sr-only">切换主题</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-40">
      <DropdownMenuItem
        v-for="option in themeOptions"
        :key="option.value"
        @click="setTheme(option.value)"
        class="cursor-pointer"
      >
        <Icon :icon="option.icon" class="mr-2 h-4 w-4" />
        <span>{{ option.label }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>