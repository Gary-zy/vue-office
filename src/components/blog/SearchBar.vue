<template>
  <div class="search-bar">
    <n-input
      v-model:value="searchValue"
      type="text"
      size="large"
      placeholder="搜索文章、标签..."
      clearable
      @keyup.enter="handleSearch"
      @clear="handleClear"
    >
      <template #prefix>
        <n-icon :component="SearchOutline" />
      </template>
      <template #suffix>
        <n-button 
          text
          @click="handleSearch"
        >
          搜索
        </n-button>
      </template>
    </n-input>

    <!-- 搜索历史 -->
    <div 
      v-if="showHistory && searchHistory.length > 0" 
      class="search-history"
    >
      <div class="history-header">
        <span class="history-title">搜索历史</span>
        <n-button 
          text 
          size="tiny"
          @click="clearHistory"
        >
          <template #icon>
            <n-icon :component="TrashOutline" />
          </template>
          清空
        </n-button>
      </div>
      <div class="history-tags">
        <n-tag
          v-for="(keyword, index) in searchHistory.slice(0, 10)"
          :key="index"
          size="small"
          closable
          @click="selectHistory(keyword)"
          @close="removeHistory(index)"
        >
          {{ keyword }}
        </n-tag>
      </div>
    </div>

    <!-- 热门搜索 -->
    <div 
      v-if="showHotSearch && hotSearchKeywords.length > 0" 
      class="hot-search"
    >
      <div class="hot-header">
        <n-icon :component="FlameOutline" color="#ff6b6b" />
        <span class="hot-title">热门搜索</span>
      </div>
      <div class="hot-tags">
        <n-tag
          v-for="(keyword, index) in hotSearchKeywords"
          :key="index"
          size="small"
          :type="index < 3 ? 'error' : 'default'"
          @click="selectHistory(keyword)"
        >
          <span class="hot-index">{{ index + 1 }}</span>
          {{ keyword }}
        </n-tag>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import { SearchOutline, TrashOutline, FlameOutline } from '@vicons/ionicons5'

/**
 * @description 搜索栏组件
 * 支持关键词搜索、搜索历史、热门搜索
 */

const props = defineProps({
  showHistory: {
    type: Boolean,
    default: true
  },
  showHotSearch: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['search'])

const router = useRouter()
const blogStore = useBlogStore()

// 搜索值
const searchValue = ref('')

// 搜索历史
const searchHistory = computed(() => blogStore.searchHistory)

// 热门搜索关键词（基于标签统计）
const hotSearchKeywords = computed(() => {
  const tagStats = blogStore.tagStats
  return Object.entries(tagStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag)
})

/**
 * @description 执行搜索
 */
const handleSearch = () => {
  const keyword = searchValue.value.trim()
  if (!keyword) return

  // 调用 store 的搜索方法
  blogStore.searchArticles(keyword)

  // 触发事件
  emit('search', keyword)

  // 如果当前不在博客首页，跳转到博客首页
  if (router.currentRoute.value.path !== '/blog') {
    router.push('/blog')
  }
}

/**
 * @description 清空搜索
 */
const handleClear = () => {
  searchValue.value = ''
  blogStore.clearSearch()
  emit('search', '')
}

/**
 * @description 选择历史记录
 */
const selectHistory = (keyword) => {
  searchValue.value = keyword
  handleSearch()
}

/**
 * @description 清空搜索历史
 */
const clearHistory = () => {
  blogStore.clearSearchHistory()
}

/**
 * @description 移除单条历史记录
 */
const removeHistory = (index) => {
  blogStore.searchHistory.splice(index, 1)
  blogStore.saveUserData()
}

// 监听 store 的搜索关键词
watch(() => blogStore.searchKeyword, (newVal) => {
  if (newVal !== searchValue.value) {
    searchValue.value = newVal
  }
})
</script>

<style scoped>
.search-bar {
  width: 100%;
}

.search-history,
.hot-search {
  margin-top: 16px;
  padding: 16px;
  background: var(--n-color);
  border-radius: 8px;
  border: 1px solid var(--n-border-color);
}

.history-header,
.hot-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.history-title,
.hot-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--n-text-color);
}

.hot-header {
  display: flex;
  gap: 6px;
  justify-content: flex-start;
}

.history-tags,
.hot-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.history-tags .n-tag,
.hot-tags .n-tag {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.history-tags .n-tag:hover,
.hot-tags .n-tag:hover {
  transform: translateY(-2px);
}

.hot-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  font-size: 12px;
  font-weight: 600;
}
</style>
