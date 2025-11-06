<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="article-detail">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <n-spin size="large" />
      </div>

      <!-- 文章不存在 -->
      <div v-else-if="!article" class="not-found">
        <n-result
          status="404"
          title="文章不存在"
          description="抱歉，您访问的文章不存在或已被删除"
        >
          <template #footer>
            <n-button @click="$router.push('/blog')">
              返回博客首页
            </n-button>
          </template>
        </n-result>
      </div>

      <!-- 文章内容 -->
      <n-layout v-else>
        <n-layout-content class="article-content">
          <div class="content-container">
            <n-grid :cols="24" :x-gap="24" :y-gap="24" responsive="screen">
              <!-- 左侧：文章内容 -->
              <n-grid-item :span="24" :xl-span="18">
                <!-- 文章头部 -->
                <n-card class="article-header-card">
                  <!-- 分类标签 -->
                  <n-space :size="8" style="margin-bottom: 16px">
                    <n-tag 
                      :color="{ color: categoryColor, textColor: '#fff' }"
                      size="medium"
                    >
                      {{ categoryName }}
                    </n-tag>
                    <n-tag 
                      v-if="article.isTop"
                      type="error"
                      size="medium"
                    >
                      置顶
                    </n-tag>
                  </n-space>

                  <!-- 标题 -->
                  <h1 class="article-title">{{ article.title }}</h1>

                  <!-- 元信息 -->
                  <div class="article-meta">
                    <n-space :size="16">
                      <!-- 作者 -->
                      <div class="meta-item">
                        <n-avatar 
                          :src="article.author.avatar"
                          :size="24"
                          round
                        />
                        <span>{{ article.author.name }}</span>
                      </div>

                      <!-- 发布时间 -->
                      <div class="meta-item">
                        <n-icon :component="TimeOutline" />
                        <span>{{ formatDate(article.publishTime, 'YYYY-MM-DD') }}</span>
                      </div>

                      <!-- 阅读时间 -->
                      <div class="meta-item">
                        <n-icon :component="TimeOutline" />
                        <span>{{ article.readingTime }} 分钟阅读</span>
                      </div>

                      <!-- 浏览量 -->
                      <div class="meta-item">
                        <n-icon :component="EyeOutline" />
                        <span>{{ article.views }} 次浏览</span>
                      </div>
                    </n-space>
                  </div>

                  <!-- 标签 -->
                  <div class="article-tags">
                    <n-space :size="8">
                      <n-tag
                        v-for="tag in article.tags"
                        :key="tag"
                        type="primary"
                        :bordered="false"
                        size="small"
                        @click="goToTag(tag)"
                      >
                        # {{ tag }}
                      </n-tag>
                    </n-space>
                  </div>
                </n-card>

                <!-- 封面图 -->
                <div v-if="article.cover" class="article-cover">
                  <img :src="article.cover" :alt="article.title" />
                </div>

                <!-- 文章内容 -->
                <n-card class="article-body">
                  <div 
                    class="markdown-body"
                    v-html="renderedContent"
                  />
                </n-card>

                <!-- 文章操作栏 -->
                <n-card class="article-actions">
                  <n-space justify="space-between">
                    <n-space :size="16">
                      <n-button
                        :type="isLiked ? 'primary' : 'default'"
                        @click="toggleLike"
                      >
                        <template #icon>
                          <n-icon :component="isLiked ? Heart : HeartOutline" />
                        </template>
                        {{ article.likes }} 点赞
                      </n-button>
                      <n-button
                        :type="isCollected ? 'primary' : 'default'"
                        @click="toggleCollect"
                      >
                        <template #icon>
                          <n-icon :component="isCollected ? Star : StarOutline" />
                        </template>
                        {{ article.collections }} 收藏
                      </n-button>
                    </n-space>

                    <n-space :size="16">
                      <n-button @click="share">
                        <template #icon>
                          <n-icon :component="ShareSocialOutline" />
                        </template>
                        分享
                      </n-button>
                    </n-space>
                  </n-space>
                </n-card>

                <!-- 相关推荐 -->
                <n-card v-if="relatedArticles.length > 0" title="相关推荐">
                  <n-list>
                    <n-list-item
                      v-for="related in relatedArticles"
                      :key="related.id"
                      class="related-item"
                      @click="goToArticle(related.id)"
                    >
                      <n-thing>
                        <template #avatar>
                          <img 
                            :src="related.cover" 
                            :alt="related.title"
                            class="related-cover"
                          />
                        </template>
                        <template #header>
                          {{ related.title }}
                        </template>
                        <template #description>
                          {{ related.summary }}
                        </template>
                      </n-thing>
                    </n-list-item>
                  </n-list>
                </n-card>

                <!-- 评论区 -->
                <Comment :article-id="articleId" />
              </n-grid-item>

              <!-- 右侧：目录 -->
              <n-grid-item :span="24" :xl-span="6">
                <TOC 
                  v-if="article.content"
                  :content="article.content"
                  :is-fixed="true"
                  :show-progress="true"
                />
              </n-grid-item>
            </n-grid>
          </div>
        </n-layout-content>
      </n-layout>
    </div>
  </n-config-provider>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { darkTheme, useMessage } from 'naive-ui'
import { useBlogStore } from '@/stores/blog'
import { useThemeStore } from '@/stores/theme'
import { renderMarkdown } from '@/utils/markdown'
import { formatDate } from '@/utils/date'
import TOC from '@/components/blog/TOC.vue'
import Comment from '@/components/blog/Comment.vue'
import { 
  TimeOutline, 
  EyeOutline, 
  HeartOutline, 
  Heart,
  StarOutline,
  Star,
  ShareSocialOutline
} from '@vicons/ionicons5'

/**
 * @description 文章详情页
 * 展示文章完整内容、评论、相关推荐等
 */

const route = useRoute()
const router = useRouter()
const message = useMessage()
const blogStore = useBlogStore()
const themeStore = useThemeStore()

// 加载状态
const loading = ref(true)

// 文章ID
const articleId = computed(() => route.params.id)

// 文章数据
const article = ref(null)

// 主题
const isDark = computed(() => themeStore.isDark)

// 渲染后的Markdown内容
const renderedContent = computed(() => {
  if (!article.value?.content) return ''
  return renderMarkdown(article.value.content)
})

// 分类信息
const categoryName = computed(() => {
  if (!article.value) return ''
  const category = blogStore.categories.find(c => c.id === article.value.category)
  return category?.name || ''
})

const categoryColor = computed(() => {
  if (!article.value) return '#1890ff'
  const category = blogStore.categories.find(c => c.id === article.value.category)
  return category?.color || '#1890ff'
})

// 是否点赞
const isLiked = computed(() => {
  if (!article.value) return false
  return blogStore.likedArticles.includes(article.value.id)
})

// 是否收藏
const isCollected = computed(() => {
  if (!article.value) return false
  return blogStore.collectedArticles.includes(article.value.id)
})

// 相关文章
const relatedArticles = computed(() => {
  if (!article.value) return []
  return blogStore.getRelatedArticles(article.value.id, 5)
})

/**
 * @description 加载文章
 */
const loadArticle = () => {
  loading.value = true
  
  setTimeout(() => {
    article.value = blogStore.getArticleById(articleId.value)
    loading.value = false

    // 如果文章存在，更新页面标题
    if (article.value) {
      document.title = `${article.value.title} - 技术博客`
    }
  }, 300)
}

/**
 * @description 切换点赞
 */
const toggleLike = () => {
  blogStore.likeArticle(articleId.value)
  message.success(isLiked.value ? '已点赞' : '取消点赞')
}

/**
 * @description 切换收藏
 */
const toggleCollect = () => {
  blogStore.collectArticle(articleId.value)
  message.success(isCollected.value ? '已收藏' : '取消收藏')
}

/**
 * @description 分享文章
 */
const share = () => {
  // 复制链接到剪贴板
  const url = window.location.href
  navigator.clipboard.writeText(url).then(() => {
    message.success('链接已复制到剪贴板')
  }).catch(() => {
    message.error('复制失败')
  })
}

/**
 * @description 跳转到标签页
 */
const goToTag = (tag) => {
  blogStore.addTag(tag)
  router.push('/blog')
}

/**
 * @description 跳转到文章
 */
const goToArticle = (id) => {
  router.push(`/blog/article/${id}`)
}

// 监听路由变化
watch(() => route.params.id, () => {
  if (route.name === 'ArticleDetail') {
    loadArticle()
    window.scrollTo(0, 0)
  }
})

// 初始化
onMounted(() => {
  loadArticle()
})
</script>

<style scoped>
.article-detail {
  min-height: 100vh;
  background: var(--n-color);
}

.loading-container,
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.article-content {
  padding: 40px 0;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.article-header-card {
  margin-bottom: 24px;
}

.article-title {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.4;
  margin: 16px 0;
  color: var(--n-title-text-color);
}

.article-meta {
  margin: 16px 0;
  padding: 16px 0;
  border-top: 1px solid var(--n-border-color);
  border-bottom: 1px solid var(--n-border-color);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--n-text-color);
  opacity: 0.8;
}

.article-tags {
  margin-top: 16px;
}

.article-tags .n-tag {
  cursor: pointer;
}

.article-cover {
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
  max-height: 500px;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-body {
  margin-bottom: 24px;
}

.markdown-body {
  font-size: 16px;
  line-height: 1.8;
  color: var(--n-text-color);
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  margin: 24px 0 16px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--n-title-text-color);
}

.markdown-body :deep(h1) { font-size: 28px; }
.markdown-body :deep(h2) { font-size: 24px; }
.markdown-body :deep(h3) { font-size: 20px; }

.markdown-body :deep(p) {
  margin: 16px 0;
}

.markdown-body :deep(pre) {
  margin: 16px 0;
  border-radius: 8px;
  overflow: hidden;
}

.markdown-body :deep(code) {
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.markdown-body :deep(li) {
  margin: 8px 0;
}

.markdown-body :deep(blockquote) {
  margin: 16px 0;
  padding: 12px 16px;
  border-left: 4px solid #18a058;
  background: var(--n-color-hover);
  border-radius: 4px;
}

.markdown-body :deep(a) {
  color: #18a058;
  text-decoration: none;
}

.markdown-body :deep(a:hover) {
  text-decoration: underline;
}

.markdown-body :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 16px 0;
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid var(--n-border-color);
  padding: 8px 12px;
}

.markdown-body :deep(th) {
  background: var(--n-color-hover);
  font-weight: 600;
}

.article-actions {
  margin-bottom: 24px;
}

.related-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.related-item:hover {
  background: var(--n-color-hover);
}

.related-cover {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

/* 响应式 */
@media (max-width: 768px) {
  .article-title {
    font-size: 24px;
  }

  .markdown-body {
    font-size: 15px;
  }
}
</style>
