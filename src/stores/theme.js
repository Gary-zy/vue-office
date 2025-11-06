import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

/**
 * @description 主题状态管理 Store
 * 管理深色/浅色主题切换及持久化
 */
export const useThemeStore = defineStore('theme', () => {
  // ========== 状态 ==========
  
  // 当前主题模式：'light' | 'dark' | 'auto'
  const themeMode = ref('light')
  
  // 是否为深色模式
  const isDark = ref(false)
  
  // ========== Actions ==========
  
  /**
   * @description 初始化主题
   */
  function initTheme() {
    // 从本地存储读取主题设置
    const savedTheme = localStorage.getItem('theme_mode')
    
    if (savedTheme) {
      themeMode.value = savedTheme
    } else {
      // 如果没有保存的设置，检查系统偏好
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeMode.value = 'dark'
      } else {
        themeMode.value = 'light'
      }
    }
    
    applyTheme()
    
    // 监听系统主题变化（仅在 auto 模式下）
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (themeMode.value === 'auto') {
          isDark.value = e.matches
          applyTheme()
        }
      })
    }
  }
  
  /**
   * @description 应用主题到页面
   */
  function applyTheme() {
    if (themeMode.value === 'dark') {
      isDark.value = true
      document.documentElement.classList.add('dark')
    } else if (themeMode.value === 'light') {
      isDark.value = false
      document.documentElement.classList.remove('dark')
    } else if (themeMode.value === 'auto') {
      // 自动模式：跟随系统
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        isDark.value = true
        document.documentElement.classList.add('dark')
      } else {
        isDark.value = false
        document.documentElement.classList.remove('dark')
      }
    }
  }
  
  /**
   * @description 切换主题模式
   * @param {string} mode - 'light' | 'dark' | 'auto'
   */
  function setTheme(mode) {
    themeMode.value = mode
    applyTheme()
    localStorage.setItem('theme_mode', mode)
  }
  
  /**
   * @description 切换深色/浅色模式
   */
  function toggleTheme() {
    if (themeMode.value === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }
  
  // 监听主题变化，保存到本地存储
  watch(themeMode, (newMode) => {
    localStorage.setItem('theme_mode', newMode)
  })
  
  return {
    // 状态
    themeMode,
    isDark,
    
    // 方法
    initTheme,
    setTheme,
    toggleTheme,
    applyTheme
  }
})
