<template>
  <div class="category-nav">
    <div class="category-nav-header">
      <h3 class="category-nav-title">
        <n-icon :component="GridOutline" />
        文章分类
      </h3>
    </div>

    <div class="category-list">
      <!-- 全部分类 -->
      <div 
        :class="['category-item', { 'active': !currentCategory }]"
        @click="handleCategoryClick(null)"
      >
        <div class="category-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
          📚
        </div>
        <div class="category-info">
          <div class="category-name">全部文章</div>
          <div class="category-count">{{ totalArticles }} 篇</div>
        </div>
        <n-icon 
          v-if="!currentCategory"
          :component="CheckmarkOutline" 
          class="check-icon"
          color="#18a058"
        />
      </div>

      <!-- 具体分类 -->
      <div
        v-for="category in categories"
        :key="category.id"
        :class="['category-item', { 'active': currentCategory === category.id }]"
        @click="handleCategoryClick(category.id)"
      >
        <div 
          class="category-icon"
          :style="{ background: category.color }"
        >
          {{ category.icon }}
        </div>
        <div class="category-info">
          <div class="category-name">{{ category.name }}</div>
          <div class="category-count">{{ categoryStats[category.id] || 0 }} 篇</div>
        </div>
        <n-icon 
          v-if="currentCategory === category.id"
          :component="CheckmarkOutline" 
          class="check-icon"
          color="#18a058"
        />
      </div>
    </div>

    <!-- 空状态 -->
    <n-empty 
      v-if="categories.length === 0"
      description="暂无分类"
      size="small"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import { GridOutline, CheckmarkOutline } from '@vicons/ionicons5'

/**
 * @description 分类导航组件
 * 展示所有文章分类，支持点击切换分类筛选
 */

const emit = defineEmits(['category-change'])

const router = useRouter()
const blogStore = useBlogStore()

// 分类列表
const categories = computed(() => blogStore.categories)

// 当前选中的分类
const currentCategory = computed(() => blogStore.currentCategory)

// 分类统计
const categoryStats = computed(() => blogStore.categoryStats)

// 总文章数
const totalArticles = computed(() => blogStore.articles.length)

/**
 * @description 点击分类
 */
const handleCategoryClick = (categoryId) => {
  // 设置分类筛选
  blogStore.setCategory(categoryId)
  
  // 触发事件
  emit('category-change', categoryId)
  
  // 跳转到博客首页（如果不在）
  if (router.currentRoute.value.path !== '/blog') {
    router.push('/blog')
  }
}
</script>

<style scoped>
.category-nav {
  width: 100%;
}

.category-nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.category-nav-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--n-title-text-color);
}

.category-nav-title .n-icon {
  font-size: 20px;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: var(--n-color);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.category-item:hover {
  background: var(--n-color-hover);
  transform: translateX(4px);
}

.category-item.active {
  border-color: #18a058;
  background: var(--n-color-hover);
}

.category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  font-size: 20px;
  flex-shrink: 0;
}

.category-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.category-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--n-text-color);
}

.category-count {
  font-size: 12px;
  color: var(--n-text-color);
  opacity: 0.6;
}

.check-icon {
  font-size: 20px;
  flex-shrink: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .category-item {
    padding: 10px;
  }

  .category-icon {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
}
</style>
