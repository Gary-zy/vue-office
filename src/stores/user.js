import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * @description 用户状态管理 Store
 * 管理用户信息、偏好设置等
 */
export const useUserStore = defineStore('user', () => {
  // ========== 状态 ==========
  
  // 用户信息（模拟）
  const userInfo = ref({
    id: 'user_001',
    nickname: '前端开发者',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    bio: '热爱技术，专注前端开发',
    email: 'developer@example.com',
    github: 'https://github.com',
    website: 'https://example.com',
    joinDate: '2023-01-01',
    // 统计数据
    stats: {
      articlesCount: 0,
      viewsCount: 0,
      likesCount: 0,
      collectionsCount: 0
    }
  })
  
  // 是否已登录（模拟）
  const isLoggedIn = ref(false)
  
  // 用户偏好设置
  const preferences = ref({
    // 文章列表布局：'card' | 'list'
    articleLayout: 'card',
    // 每页显示数量
    pageSize: 10,
    // 是否显示阅读进度条
    showReadingProgress: true,
    // 代码高亮主题
    codeTheme: 'github',
    // 字体大小
    fontSize: 'medium', // 'small' | 'medium' | 'large'
    // 是否自动播放视频
    autoPlayVideo: false
  })
  
  // ========== 计算属性 ==========
  
  /**
   * @description 用户显示名称
   */
  const displayName = computed(() => {
    return userInfo.value.nickname || '游客'
  })
  
  /**
   * @description 用户头像URL
   */
  const avatarUrl = computed(() => {
    return userInfo.value.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Default'
  })
  
  // ========== Actions ==========
  
  /**
   * @description 初始化用户数据
   */
  function initUserData() {
    // 从本地存储加载用户偏好
    loadPreferences()
    
    // 从本地存储加载用户信息
    const savedUserInfo = localStorage.getItem('user_info')
    if (savedUserInfo) {
      try {
        const data = JSON.parse(savedUserInfo)
        userInfo.value = { ...userInfo.value, ...data }
        isLoggedIn.value = true
      } catch (error) {
        console.error('加载用户信息失败:', error)
      }
    }
  }
  
  /**
   * @description 更新用户信息
   */
  function updateUserInfo(info) {
    userInfo.value = { ...userInfo.value, ...info }
    localStorage.setItem('user_info', JSON.stringify(userInfo.value))
  }
  
  /**
   * @description 更新用户统计数据
   */
  function updateUserStats(stats) {
    userInfo.value.stats = { ...userInfo.value.stats, ...stats }
    localStorage.setItem('user_info', JSON.stringify(userInfo.value))
  }
  
  /**
   * @description 登录（模拟）
   */
  function login(userData) {
    userInfo.value = { ...userInfo.value, ...userData }
    isLoggedIn.value = true
    localStorage.setItem('user_info', JSON.stringify(userInfo.value))
  }
  
  /**
   * @description 退出登录
   */
  function logout() {
    isLoggedIn.value = false
    localStorage.removeItem('user_info')
  }
  
  /**
   * @description 更新偏好设置
   */
  function updatePreferences(prefs) {
    preferences.value = { ...preferences.value, ...prefs }
    savePreferences()
  }
  
  /**
   * @description 保存偏好设置到本地存储
   */
  function savePreferences() {
    localStorage.setItem('user_preferences', JSON.stringify(preferences.value))
  }
  
  /**
   * @description 从本地存储加载偏好设置
   */
  function loadPreferences() {
    try {
      const saved = localStorage.getItem('user_preferences')
      if (saved) {
        const data = JSON.parse(saved)
        preferences.value = { ...preferences.value, ...data }
      }
    } catch (error) {
      console.error('加载用户偏好失败:', error)
    }
  }
  
  /**
   * @description 设置文章列表布局
   */
  function setArticleLayout(layout) {
    preferences.value.articleLayout = layout
    savePreferences()
  }
  
  /**
   * @description 设置每页显示数量
   */
  function setPageSize(size) {
    preferences.value.pageSize = size
    savePreferences()
  }
  
  /**
   * @description 设置字体大小
   */
  function setFontSize(size) {
    preferences.value.fontSize = size
    savePreferences()
    
    // 应用字体大小到页面
    const root = document.documentElement
    if (size === 'small') {
      root.style.fontSize = '14px'
    } else if (size === 'large') {
      root.style.fontSize = '18px'
    } else {
      root.style.fontSize = '16px'
    }
  }
  
  /**
   * @description 切换阅读进度条显示
   */
  function toggleReadingProgress() {
    preferences.value.showReadingProgress = !preferences.value.showReadingProgress
    savePreferences()
  }
  
  return {
    // 状态
    userInfo,
    isLoggedIn,
    preferences,
    
    // 计算属性
    displayName,
    avatarUrl,
    
    // 方法
    initUserData,
    updateUserInfo,
    updateUserStats,
    login,
    logout,
    updatePreferences,
    savePreferences,
    loadPreferences,
    setArticleLayout,
    setPageSize,
    setFontSize,
    toggleReadingProgress
  }
})
