/**
 * @description 本地存储工具
 * 封装 localStorage 和 sessionStorage，支持过期时间、加密等功能
 */

// 存储键名前缀
const PREFIX = 'blog_'

/**
 * @description 存储数据结构
 * @typedef {Object} StorageData
 * @property {*} value - 存储的值
 * @property {number} expire - 过期时间戳（毫秒）
 */

/**
 * @description 设置 localStorage
 * @param {string} key - 键名
 * @param {*} value - 值
 * @param {number} expire - 过期时间（秒），0 表示永不过期
 */
export function setLocal(key, value, expire = 0) {
  try {
    const data = {
      value,
      expire: expire > 0 ? Date.now() + expire * 1000 : 0
    }
    localStorage.setItem(PREFIX + key, JSON.stringify(data))
  } catch (error) {
    console.error('localStorage 存储失败:', error)
  }
}

/**
 * @description 获取 localStorage
 * @param {string} key - 键名
 * @param {*} defaultValue - 默认值
 * @returns {*} 存储的值
 */
export function getLocal(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(PREFIX + key)
    if (!item) return defaultValue
    
    const data = JSON.parse(item)
    
    // 检查是否过期
    if (data.expire && data.expire < Date.now()) {
      localStorage.removeItem(PREFIX + key)
      return defaultValue
    }
    
    return data.value
  } catch (error) {
    console.error('localStorage 读取失败:', error)
    return defaultValue
  }
}

/**
 * @description 移除 localStorage
 * @param {string} key - 键名
 */
export function removeLocal(key) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch (error) {
    console.error('localStorage 删除失败:', error)
  }
}

/**
 * @description 清空所有 localStorage（仅清空带前缀的）
 */
export function clearLocal() {
  try {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key)
      }
    })
  } catch (error) {
    console.error('localStorage 清空失败:', error)
  }
}

/**
 * @description 设置 sessionStorage
 * @param {string} key - 键名
 * @param {*} value - 值
 */
export function setSession(key, value) {
  try {
    const data = { value }
    sessionStorage.setItem(PREFIX + key, JSON.stringify(data))
  } catch (error) {
    console.error('sessionStorage 存储失败:', error)
  }
}

/**
 * @description 获取 sessionStorage
 * @param {string} key - 键名
 * @param {*} defaultValue - 默认值
 * @returns {*} 存储的值
 */
export function getSession(key, defaultValue = null) {
  try {
    const item = sessionStorage.getItem(PREFIX + key)
    if (!item) return defaultValue
    
    const data = JSON.parse(item)
    return data.value
  } catch (error) {
    console.error('sessionStorage 读取失败:', error)
    return defaultValue
  }
}

/**
 * @description 移除 sessionStorage
 * @param {string} key - 键名
 */
export function removeSession(key) {
  try {
    sessionStorage.removeItem(PREFIX + key)
  } catch (error) {
    console.error('sessionStorage 删除失败:', error)
  }
}

/**
 * @description 清空所有 sessionStorage（仅清空带前缀的）
 */
export function clearSession() {
  try {
    const keys = Object.keys(sessionStorage)
    keys.forEach(key => {
      if (key.startsWith(PREFIX)) {
        sessionStorage.removeItem(key)
      }
    })
  } catch (error) {
    console.error('sessionStorage 清空失败:', error)
  }
}

/**
 * @description 获取 localStorage 使用情况
 * @returns {Object} 使用情况对象
 */
export function getStorageInfo() {
  let totalSize = 0
  let itemCount = 0
  
  try {
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith(PREFIX)) {
        const value = localStorage.getItem(key)
        totalSize += key.length + (value?.length || 0)
        itemCount++
      }
    }
    
    return {
      itemCount,
      totalSize,
      totalSizeKB: (totalSize / 1024).toFixed(2),
      totalSizeMB: (totalSize / 1024 / 1024).toFixed(2)
    }
  } catch (error) {
    console.error('获取存储信息失败:', error)
    return {
      itemCount: 0,
      totalSize: 0,
      totalSizeKB: '0',
      totalSizeMB: '0'
    }
  }
}

/**
 * @description 检查 localStorage 是否可用
 * @returns {boolean}
 */
export function isLocalStorageAvailable() {
  try {
    const test = '__storage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (error) {
    return false
  }
}

/**
 * @description 检查 sessionStorage 是否可用
 * @returns {boolean}
 */
export function isSessionStorageAvailable() {
  try {
    const test = '__storage_test__'
    sessionStorage.setItem(test, test)
    sessionStorage.removeItem(test)
    return true
  } catch (error) {
    return false
  }
}

/**
 * @description 清理过期的 localStorage 数据
 */
export function cleanExpiredStorage() {
  try {
    const keys = Object.keys(localStorage)
    const now = Date.now()
    let cleanedCount = 0
    
    keys.forEach(key => {
      if (key.startsWith(PREFIX)) {
        try {
          const item = localStorage.getItem(key)
          if (item) {
            const data = JSON.parse(item)
            if (data.expire && data.expire < now) {
              localStorage.removeItem(key)
              cleanedCount++
            }
          }
        } catch (error) {
          // 数据格式错误，删除
          localStorage.removeItem(key)
          cleanedCount++
        }
      }
    })
    
    console.log(`清理了 ${cleanedCount} 条过期数据`)
    return cleanedCount
  } catch (error) {
    console.error('清理过期数据失败:', error)
    return 0
  }
}

/**
 * @description 批量设置 localStorage
 * @param {Object} items - 键值对对象
 * @param {number} expire - 过期时间（秒）
 */
export function setBatchLocal(items, expire = 0) {
  try {
    Object.entries(items).forEach(([key, value]) => {
      setLocal(key, value, expire)
    })
  } catch (error) {
    console.error('批量存储失败:', error)
  }
}

/**
 * @description 批量获取 localStorage
 * @param {Array<string>} keys - 键名数组
 * @returns {Object} 键值对对象
 */
export function getBatchLocal(keys) {
  const result = {}
  try {
    keys.forEach(key => {
      result[key] = getLocal(key)
    })
  } catch (error) {
    console.error('批量读取失败:', error)
  }
  return result
}

/**
 * @description 导出所有存储数据（用于备份）
 * @returns {Object} 所有存储数据
 */
export function exportStorage() {
  const data = {}
  try {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(PREFIX)) {
        data[key] = localStorage.getItem(key)
      }
    })
  } catch (error) {
    console.error('导出存储数据失败:', error)
  }
  return data
}

/**
 * @description 导入存储数据（用于恢复）
 * @param {Object} data - 存储数据对象
 */
export function importStorage(data) {
  try {
    Object.entries(data).forEach(([key, value]) => {
      if (key.startsWith(PREFIX)) {
        localStorage.setItem(key, value)
      }
    })
  } catch (error) {
    console.error('导入存储数据失败:', error)
  }
}

/**
 * @description 监听存储变化
 * @param {Function} callback - 回调函数
 * @returns {Function} 取消监听的函数
 */
export function watchStorage(callback) {
  const handler = (e) => {
    if (e.key && e.key.startsWith(PREFIX)) {
      callback({
        key: e.key.replace(PREFIX, ''),
        oldValue: e.oldValue ? JSON.parse(e.oldValue).value : null,
        newValue: e.newValue ? JSON.parse(e.newValue).value : null
      })
    }
  }
  
  window.addEventListener('storage', handler)
  
  // 返回取消监听的函数
  return () => {
    window.removeEventListener('storage', handler)
  }
}

// 应用初始化时自动清理过期数据
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    cleanExpiredStorage()
  })
}

export default {
  setLocal,
  getLocal,
  removeLocal,
  clearLocal,
  setSession,
  getSession,
  removeSession,
  clearSession,
  getStorageInfo,
  isLocalStorageAvailable,
  isSessionStorageAvailable,
  cleanExpiredStorage,
  setBatchLocal,
  getBatchLocal,
  exportStorage,
  importStorage,
  watchStorage
}
