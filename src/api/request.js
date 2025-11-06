import axios from 'axios'
import NProgress from 'nprogress'

/**
 * @description Axios 请求封装
 * 配置请求/响应拦截器、错误处理等
 */

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 显示进度条
    NProgress.start()
    
    // 可以在这里添加 token
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    // 请求错误处理
    console.error('请求错误:', error)
    NProgress.done()
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 隐藏进度条
    NProgress.done()
    
    // 根据业务需要处理响应数据
    const { data } = response
    
    // 如果是文件下载，直接返回
    if (response.config.responseType === 'blob') {
      return response
    }
    
    // 统一的响应数据格式处理
    if (data.code !== undefined) {
      if (data.code === 200 || data.code === 0) {
        return data.data
      } else {
        // 业务错误处理
        console.error('业务错误:', data.message)
        return Promise.reject(new Error(data.message || '请求失败'))
      }
    }
    
    // 如果没有统一格式，直接返回data
    return data
  },
  (error) => {
    // 隐藏进度条
    NProgress.done()
    
    // HTTP 错误处理
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 400:
          console.error('请求参数错误')
          break
        case 401:
          console.error('未授权，请重新登录')
          // 可以在这里处理登录过期
          localStorage.removeItem('access_token')
          // window.location.href = '/login'
          break
        case 403:
          console.error('拒绝访问')
          break
        case 404:
          console.error('请求资源不存在')
          break
        case 500:
          console.error('服务器错误')
          break
        case 502:
          console.error('网关错误')
          break
        case 503:
          console.error('服务不可用')
          break
        case 504:
          console.error('网关超时')
          break
        default:
          console.error(`请求失败: ${status}`)
      }
      
      return Promise.reject(error)
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('网络错误，请检查网络连接')
      return Promise.reject(new Error('网络错误'))
    } else {
      // 其他错误
      console.error('请求配置错误:', error.message)
      return Promise.reject(error)
    }
  }
)

/**
 * @description GET 请求封装
 * @param {string} url - 请求地址
 * @param {object} params - 请求参数
 * @param {object} config - axios 配置
 */
export function get(url, params = {}, config = {}) {
  return request({
    method: 'get',
    url,
    params,
    ...config
  })
}

/**
 * @description POST 请求封装
 * @param {string} url - 请求地址
 * @param {object} data - 请求数据
 * @param {object} config - axios 配置
 */
export function post(url, data = {}, config = {}) {
  return request({
    method: 'post',
    url,
    data,
    ...config
  })
}

/**
 * @description PUT 请求封装
 * @param {string} url - 请求地址
 * @param {object} data - 请求数据
 * @param {object} config - axios 配置
 */
export function put(url, data = {}, config = {}) {
  return request({
    method: 'put',
    url,
    data,
    ...config
  })
}

/**
 * @description DELETE 请求封装
 * @param {string} url - 请求地址
 * @param {object} params - 请求参数
 * @param {object} config - axios 配置
 */
export function del(url, params = {}, config = {}) {
  return request({
    method: 'delete',
    url,
    params,
    ...config
  })
}

/**
 * @description 文件上传
 * @param {string} url - 上传地址
 * @param {FormData} formData - 表单数据
 * @param {function} onProgress - 上传进度回调
 */
export function upload(url, formData, onProgress) {
  return request({
    method: 'post',
    url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress(percentCompleted)
      }
    }
  })
}

/**
 * @description 文件下载
 * @param {string} url - 下载地址
 * @param {string} filename - 文件名
 * @param {object} params - 请求参数
 */
export function download(url, filename, params = {}) {
  return request({
    method: 'get',
    url,
    params,
    responseType: 'blob'
  }).then((response) => {
    const blob = new Blob([response.data])
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    link.click()
    window.URL.revokeObjectURL(link.href)
  })
}

export default request
