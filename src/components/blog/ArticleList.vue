<template>
  <div class="article-list">
    <!-- 筛选条件显示 -->
    <div v-if="hasFilters" class="filter-tags">
      <n-tag
        v-if="currentCategory"
        closable
        type="info"
        @close="clearCategory"
      >
        分类: {{ getCategoryName(currentCategory) }}
      </n-tag>
      <n-tag
        v-for="tag in currentTags"
        :key="tag"
        closable
        type="success"
        @close="removeTag(tag)"
      >
        标签: {{ tag }}
      </n-tag>
      <n-tag
        v-if="searchKeyword"
        closable
        type="warning"
        @close="clearSearch"
      >
        搜索: {{ searchKeyword }}
      </n-tag>
      <n-button 
        text 
        size="small"
        type="error"
        @click="clearAllFilters"
      >
        清空筛选
      </n-button>
    </div>

    <!-- 列表头部 -->
    <div class="list-header">
      <div class="list-info">
        <span class="result-count">
          找到 <strong>{{ articles.length }}</strong> 篇文章
        </span>
      </div>
      <div class="list-actions">
        <!-- 布局切换 -->
        <n-button-group size="small">
          <n-button 
            :type="layout === 'grid' ? 'primary' : 'default'"
            @click="changeLayout('grid')"
          >
            <template #icon>
              <n-icon :component="GridOutline" />
            </template>
          </n-button>
          <n-button 
            :type="layout === 'list' ? 'primary' : 'default'"
            @click="changeLayout('list')"
          >
            <template #icon>
              <n-icon :component="ListOutline" />
            </template>
          </n-button>
        </n-button-group>

        <!-- 排序 -->
        <n-select
          v-model:value="sortType"
          :options="sortOptions"
          size="small"
          style="width: 120px"
          @update:value="handleSortChange"
        />
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <n-spin size="large" />
    </div>

    <!-- 文章列表 -->
    <div v-else-if="articles.length > 0" :class="['articles-container', layout]">
      <ArticleCard
        v-for="article in displayedArticles"
        :key="article.id"
        :article="article"
      />
    </div>

    <!-- 空状态 -->
    <n-empty 
      v-else
      size="large"
      description="暂无文章"
    >
      <template #extra>
        <n-button @click="clearAllFilters">
          清空筛选条件
        </n-button>
      </template>
    </n-empty>

    <!-- 分页 -->
    <div v-if="articles.length > pageSize" class="pagination-container">
      <n-pagination
        v-model:page="currentPage"
        :page-count="totalPages"
        :page-size="pageSize"
        show-size-picker
        :page-sizes="[10, 20, 30, 50]"
        @update:page="handlePageChange"
        @update:page-size="handlePageSizeChange"
      >
        <template #prefix="{ itemCount }">
          共 {{ itemCount }} 条
        </template>
      </n-pagination>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useBlogStore } from '@/stores/blog'
import ArticleCard from './ArticleCard.vue'
import { GridOutline, ListOutline } from '@vicons/ionicons5'

/**
 * @description 文章列表组件
 * 支持网格/列表布局切换、排序、分页
 */

const props = defineProps({
  // 初始文章列表
  initialArticles: {
    type: Array,
    default: () => []
  },
  // 是否显示加载状态
  loading: {
    type: Boolean,
    default: false
  }
})

const blogStore = useBlogStore()

// 布局模式: 'grid' | 'list'
const layout = ref('grid')

// 排序类型
const sortType = ref('latest')

// 排序选项
const sortOptions = [
  { label: '最新发布', value: 'latest' },
  { label: '最热门', value: 'popular' },
  { label: '最多点赞', value: 'likes' }
]

// 当前页码
const currentPage = ref(1)

// 每页数量
const pageSize = ref(10)

/**
 * @description 文章列表（使用筛选后的结果）
 */
const articles = computed(() => {
  if (props.initialArticles.length > 0) {
    return props.initialArticles
  }
  return blogStore.filteredArticles
})

/**
 * @description 排序后的文章
 */
const sortedArticles = computed(() => {
  const list = [...articles.value]
  
  switch (sortType.value) {
    case 'latest':
      return list.sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime))
    case 'popular':
      return list.sort((a, b) => b.views - a.views)
    case 'likes':
      return list.sort((a, b) => b.likes - a.likes)
    default:
      return list
  }
})

/**
 * @description 当前页显示的文章
 */
const displayedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return sortedArticles.value.slice(start, end)
})

/**
 * @description 总页数
 */
const totalPages = computed(() => {
  return Math.ceil(articles.value.length / pageSize.value)
})

/**
 * @description 是否有筛选条件
 */
const hasFilters = computed(() => {
  return currentCategory.value || 
         currentTags.value.length > 0 || 
         searchKeyword.value
})

// Store 中的筛选条件
const currentCategory = computed(() => blogStore.currentCategory)
const currentTags = computed(() => blogStore.currentTags)
const searchKeyword = computed(() => blogStore.searchKeyword)

/**
 * @description 获取分类名称
 */
const getCategoryName = (categoryId) => {
  const category = blogStore.categories.find(c => c.id === categoryId)
  return category?.name || categoryId
}

/**
 * @description 切换布局
 */
const changeLayout = (newLayout) => {
  layout.value = newLayout
}

/**
 * @description 排序变化
 */
const handleSortChange = () => {
  currentPage.value = 1
}

/**
 * @description 页码变化
 */
const handlePageChange = (page) => {
  currentPage.value = page
  // 滚动到顶部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * @description 每页数量变化
 */
const handlePageSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
}

/**
 * @description 清空分类筛选
 */
const clearCategory = () => {
  blogStore.setCategory(null)
}

/**
 * @description 移除标签筛选
 */
const removeTag = (tag) => {
  blogStore.removeTag(tag)
}

/**
 * @description 清空搜索
 */
const clearSearch = () => {
  blogStore.clearSearch()
}

/**
 * @description 清空所有筛选
 */
const clearAllFilters = () => {
  blogStore.clearFilters()
}

// 监听文章列表变化，重置页码
watch(() => articles.value.length, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1
  }
})
</script>

<style scoped>
.article-list {
  width: 100%;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
  padding: 16px;
  background: var(--n-color);
  border-radius: 8px;
  border: 1px solid var(--n-border-color);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px;
  background: var(--n-color);
  border-radius: 8px;
}

.list-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.result-count {
  font-size: 14px;
  color: var(--n-text-color);
}

.result-count strong {
  color: #18a058;
  font-size: 16px;
}

.list-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.articles-container {
  display: grid;
  gap: 24px;
  margin-bottom: 32px;
}

.articles-container.grid {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.articles-container.list {
  grid-template-columns: 1fr;
}

.pagination-container {
  display: flex;
  justify-content: center;
  padding: 24px 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .list-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .list-actions {
    flex-direction: column;
    gap: 12px;
  }

  .articles-container.grid {
    grid-template-columns: 1fr;
  }
}
</style>
