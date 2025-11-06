import { get, post, put, del } from './request'

/**
 * @description 博客相关 API 接口
 * 注意：当前项目使用 Mock 数据，这些接口主要用于展示和未来扩展
 */

/**
 * @description 获取文章列表
 * @param {object} params - 查询参数
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 * @param {string} params.category - 分类ID
 * @param {string} params.tag - 标签
 * @param {string} params.keyword - 搜索关键词
 * @param {string} params.sort - 排序方式：'latest' | 'popular' | 'trending'
 */
export function getArticleList(params) {
  return get('/articles', params)
}

/**
 * @description 获取文章详情
 * @param {string} id - 文章ID
 */
export function getArticleDetail(id) {
  return get(`/articles/${id}`)
}

/**
 * @description 获取推荐文章
 * @param {number} limit - 数量限制
 */
export function getRecommendedArticles(limit = 5) {
  return get('/articles/recommended', { limit })
}

/**
 * @description 获取热门文章
 * @param {number} limit - 数量限制
 */
export function getPopularArticles(limit = 10) {
  return get('/articles/popular', { limit })
}

/**
 * @description 获取最新文章
 * @param {number} limit - 数量限制
 */
export function getLatestArticles(limit = 10) {
  return get('/articles/latest', { limit })
}

/**
 * @description 获取相关文章
 * @param {string} id - 文章ID
 * @param {number} limit - 数量限制
 */
export function getRelatedArticles(id, limit = 5) {
  return get(`/articles/${id}/related`, { limit })
}

/**
 * @description 搜索文章
 * @param {string} keyword - 搜索关键词
 * @param {object} params - 其他参数
 */
export function searchArticles(keyword, params = {}) {
  return get('/articles/search', { keyword, ...params })
}

/**
 * @description 获取分类列表
 */
export function getCategoryList() {
  return get('/categories')
}

/**
 * @description 获取分类详情（包含文章列表）
 * @param {string} id - 分类ID
 * @param {object} params - 查询参数
 */
export function getCategoryDetail(id, params = {}) {
  return get(`/categories/${id}`, params)
}

/**
 * @description 获取标签列表
 */
export function getTagList() {
  return get('/tags')
}

/**
 * @description 获取标签详情（包含文章列表）
 * @param {string} name - 标签名称
 * @param {object} params - 查询参数
 */
export function getTagDetail(name, params = {}) {
  return get(`/tags/${name}`, params)
}

/**
 * @description 获取标签云数据
 */
export function getTagCloud() {
  return get('/tags/cloud')
}

/**
 * @description 点赞文章
 * @param {string} id - 文章ID
 */
export function likeArticle(id) {
  return post(`/articles/${id}/like`)
}

/**
 * @description 取消点赞
 * @param {string} id - 文章ID
 */
export function unlikeArticle(id) {
  return del(`/articles/${id}/like`)
}

/**
 * @description 收藏文章
 * @param {string} id - 文章ID
 */
export function collectArticle(id) {
  return post(`/articles/${id}/collect`)
}

/**
 * @description 取消收藏
 * @param {string} id - 文章ID
 */
export function uncollectArticle(id) {
  return del(`/articles/${id}/collect`)
}

/**
 * @description 增加文章浏览量
 * @param {string} id - 文章ID
 */
export function increaseArticleViews(id) {
  return post(`/articles/${id}/views`)
}

/**
 * @description 获取文章评论列表
 * @param {string} articleId - 文章ID
 * @param {object} params - 查询参数
 */
export function getCommentList(articleId, params = {}) {
  return get(`/articles/${articleId}/comments`, params)
}

/**
 * @description 发表评论
 * @param {string} articleId - 文章ID
 * @param {object} data - 评论数据
 * @param {string} data.content - 评论内容
 * @param {string} data.parentId - 父评论ID（回复时使用）
 */
export function createComment(articleId, data) {
  return post(`/articles/${articleId}/comments`, data)
}

/**
 * @description 删除评论
 * @param {string} articleId - 文章ID
 * @param {string} commentId - 评论ID
 */
export function deleteComment(articleId, commentId) {
  return del(`/articles/${articleId}/comments/${commentId}`)
}

/**
 * @description 点赞评论
 * @param {string} articleId - 文章ID
 * @param {string} commentId - 评论ID
 */
export function likeComment(articleId, commentId) {
  return post(`/articles/${articleId}/comments/${commentId}/like`)
}

/**
 * @description 获取归档数据
 * @param {string} type - 归档类型：'year' | 'month'
 */
export function getArchiveData(type = 'month') {
  return get('/articles/archive', { type })
}

/**
 * @description 获取网站统计数据
 */
export function getSiteStats() {
  return get('/stats')
}

/**
 * @description 获取作者信息
 */
export function getAuthorInfo() {
  return get('/author')
}

/**
 * @description Mock 数据加载（本地 JSON 文件）
 * 由于使用本地 Mock 数据，这些函数直接返回导入的数据
 */

/**
 * @description 加载文章 Mock 数据
 */
export async function loadArticlesMock() {
  try {
    const data = await import('@/assets/mock/articles.json')
    return data.default || data
  } catch (error) {
    console.error('加载文章数据失败:', error)
    return []
  }
}

/**
 * @description 加载分类 Mock 数据
 */
export async function loadCategoriesMock() {
  try {
    const data = await import('@/assets/mock/categories.json')
    return data.default || data
  } catch (error) {
    console.error('加载分类数据失败:', error)
    return []
  }
}

/**
 * @description 加载标签 Mock 数据
 */
export async function loadTagsMock() {
  try {
    const data = await import('@/assets/mock/tags.json')
    return data.default || data
  } catch (error) {
    console.error('加载标签数据失败:', error)
    return []
  }
}
