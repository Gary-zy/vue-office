import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * @description 博客状态管理 Store
 * 管理文章列表、分类、标签、搜索等博客相关状态
 */
export const useBlogStore = defineStore('blog', () => {
  // ========== 状态 ==========
  
  // 文章列表
  const articles = ref([])
  
  // 分类列表
  const categories = ref([])
  
  // 标签列表
  const tags = ref([])
  
  // 当前文章详情
  const currentArticle = ref(null)
  
  // 搜索关键词
  const searchKeyword = ref('')
  
  // 搜索历史
  const searchHistory = ref([])
  
  // 当前筛选的分类
  const currentCategory = ref(null)
  
  // 当前筛选的标签
  const currentTags = ref([])
  
  // 阅读历史（文章ID数组）
  const readHistory = ref([])
  
  // 点赞的文章ID数组
  const likedArticles = ref([])
  
  // 收藏的文章ID数组
  const collectedArticles = ref([])
  
  // 加载状态
  const loading = ref(false)
  
  // 分页信息
  const pagination = ref({
    page: 1,
    pageSize: 10,
    total: 0
  })
  
  // ========== 计算属性 ==========
  
  /**
   * @description 筛选后的文章列表
   */
  const filteredArticles = computed(() => {
    let result = [...articles.value]
    
    // 搜索关键词过滤
    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase()
      result = result.filter(article => 
        article.title.toLowerCase().includes(keyword) ||
        article.summary.toLowerCase().includes(keyword) ||
        article.tags.some(tag => tag.toLowerCase().includes(keyword)) ||
        article.content.toLowerCase().includes(keyword)
      )
    }
    
    // 分类过滤
    if (currentCategory.value) {
      result = result.filter(article => article.category === currentCategory.value)
    }
    
    // 标签过滤（支持多标签）
    if (currentTags.value.length > 0) {
      result = result.filter(article => 
        currentTags.value.every(tag => article.tags.includes(tag))
      )
    }
    
    return result
  })
  
  /**
   * @description 热门文章（按阅读量排序，取前10）
   */
  const popularArticles = computed(() => {
    return [...articles.value]
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)
  })
  
  /**
   * @description 最新文章（按发布时间排序，取前10）
   */
  const latestArticles = computed(() => {
    return [...articles.value]
      .sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime))
      .slice(0, 10)
  })
  
  /**
   * @description 推荐文章（按点赞数排序，取前5）
   */
  const recommendedArticles = computed(() => {
    return [...articles.value]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 5)
  })
  
  /**
   * @description 分类统计（每个分类的文章数量）
   */
  const categoryStats = computed(() => {
    const stats = {}
    categories.value.forEach(cat => {
      stats[cat.id] = articles.value.filter(article => article.category === cat.id).length
    })
    return stats
  })
  
  /**
   * @description 标签统计（每个标签的文章数量）
   */
  const tagStats = computed(() => {
    const stats = {}
    articles.value.forEach(article => {
      article.tags.forEach(tag => {
        stats[tag] = (stats[tag] || 0) + 1
      })
    })
    return stats
  })
  
  // ========== Actions ==========
  
  /**
   * @description 初始化博客数据（加载文章、分类、标签）
   */
  async function initBlogData() {
    loading.value = true
    try {
      // 动态导入 Mock 数据
      const [articlesData, categoriesData, tagsData] = await Promise.all([
        import('@/assets/mock/articles.json'),
        import('@/assets/mock/categories.json'),
        import('@/assets/mock/tags.json')
      ])
      
      articles.value = articlesData.default || articlesData
      categories.value = categoriesData.default || categoriesData
      tags.value = tagsData.default || tagsData
      
      pagination.value.total = articles.value.length
      
      // 从本地存储加载用户数据
      loadUserData()
    } catch (error) {
      console.error('加载博客数据失败:', error)
    } finally {
      loading.value = false
    }
  }
  
  /**
   * @description 根据ID获取文章详情
   */
  function getArticleById(id) {
    const article = articles.value.find(a => a.id === id)
    if (article) {
      currentArticle.value = article
      // 添加到阅读历史
      addToReadHistory(id)
      // 增加阅读量
      article.views++
    }
    return article
  }
  
  /**
   * @description 搜索文章
   */
  function searchArticles(keyword) {
    searchKeyword.value = keyword
    
    // 保存搜索历史
    if (keyword && !searchHistory.value.includes(keyword)) {
      searchHistory.value.unshift(keyword)
      if (searchHistory.value.length > 10) {
        searchHistory.value = searchHistory.value.slice(0, 10)
      }
      saveUserData()
    }
  }
  
  /**
   * @description 清空搜索
   */
  function clearSearch() {
    searchKeyword.value = ''
  }
  
  /**
   * @description 设置分类筛选
   */
  function setCategory(categoryId) {
    currentCategory.value = categoryId
  }
  
  /**
   * @description 添加标签筛选
   */
  function addTag(tag) {
    if (!currentTags.value.includes(tag)) {
      currentTags.value.push(tag)
    }
  }
  
  /**
   * @description 移除标签筛选
   */
  function removeTag(tag) {
    currentTags.value = currentTags.value.filter(t => t !== tag)
  }
  
  /**
   * @description 清空所有筛选
   */
  function clearFilters() {
    currentCategory.value = null
    currentTags.value = []
    searchKeyword.value = ''
  }
  
  /**
   * @description 点赞文章
   */
  function likeArticle(articleId) {
    const article = articles.value.find(a => a.id === articleId)
    if (article) {
      if (likedArticles.value.includes(articleId)) {
        // 取消点赞
        likedArticles.value = likedArticles.value.filter(id => id !== articleId)
        article.likes--
      } else {
        // 点赞
        likedArticles.value.push(articleId)
        article.likes++
      }
      saveUserData()
    }
  }
  
  /**
   * @description 收藏文章
   */
  function collectArticle(articleId) {
    const article = articles.value.find(a => a.id === articleId)
    if (article) {
      if (collectedArticles.value.includes(articleId)) {
        // 取消收藏
        collectedArticles.value = collectedArticles.value.filter(id => id !== articleId)
        article.collections--
      } else {
        // 收藏
        collectedArticles.value.push(articleId)
        article.collections++
      }
      saveUserData()
    }
  }
  
  /**
   * @description 添加到阅读历史
   */
  function addToReadHistory(articleId) {
    if (!readHistory.value.includes(articleId)) {
      readHistory.value.unshift(articleId)
      if (readHistory.value.length > 50) {
        readHistory.value = readHistory.value.slice(0, 50)
      }
      saveUserData()
    }
  }
  
  /**
   * @description 获取相关文章（相同分类或标签）
   */
  function getRelatedArticles(articleId, limit = 5) {
    const article = articles.value.find(a => a.id === articleId)
    if (!article) return []
    
    return articles.value
      .filter(a => a.id !== articleId)
      .map(a => {
        let score = 0
        // 相同分类加分
        if (a.category === article.category) score += 3
        // 相同标签加分
        const commonTags = a.tags.filter(tag => article.tags.includes(tag))
        score += commonTags.length * 2
        return { ...a, score }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }
  
  /**
   * @description 保存用户数据到本地存储
   */
  function saveUserData() {
    localStorage.setItem('blog_user_data', JSON.stringify({
      searchHistory: searchHistory.value,
      readHistory: readHistory.value,
      likedArticles: likedArticles.value,
      collectedArticles: collectedArticles.value
    }))
  }
  
  /**
   * @description 从本地存储加载用户数据
   */
  function loadUserData() {
    try {
      const data = localStorage.getItem('blog_user_data')
      if (data) {
        const userData = JSON.parse(data)
        searchHistory.value = userData.searchHistory || []
        readHistory.value = userData.readHistory || []
        likedArticles.value = userData.likedArticles || []
        collectedArticles.value = userData.collectedArticles || []
      }
    } catch (error) {
      console.error('加载用户数据失败:', error)
    }
  }
  
  /**
   * @description 清除搜索历史
   */
  function clearSearchHistory() {
    searchHistory.value = []
    saveUserData()
  }
  
  return {
    // 状态
    articles,
    categories,
    tags,
    currentArticle,
    searchKeyword,
    searchHistory,
    currentCategory,
    currentTags,
    readHistory,
    likedArticles,
    collectedArticles,
    loading,
    pagination,
    
    // 计算属性
    filteredArticles,
    popularArticles,
    latestArticles,
    recommendedArticles,
    categoryStats,
    tagStats,
    
    // 方法
    initBlogData,
    getArticleById,
    searchArticles,
    clearSearch,
    setCategory,
    addTag,
    removeTag,
    clearFilters,
    likeArticle,
    collectArticle,
    addToReadHistory,
    getRelatedArticles,
    saveUserData,
    loadUserData,
    clearSearchHistory
  }
})
