<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <div class="not-found-page">
      <n-result
        status="404"
        title="404 页面未找到"
        description="抱歉，您访问的页面不存在"
        size="huge"
      >
        <template #icon>
          <div class="not-found-icon">
            <span class="icon-text">404</span>
          </div>
        </template>

        <template #footer>
          <n-space justify="center" :size="16">
            <n-button type="primary" size="large" @click="goHome">
              <template #icon>
                <n-icon :component="HomeOutline" />
              </template>
              返回首页
            </n-button>
            <n-button size="large" @click="goBack">
              <template #icon>
                <n-icon :component="ArrowBackOutline" />
              </template>
              返回上一页
            </n-button>
            <n-button size="large" @click="goBlog">
              <template #icon>
                <n-icon :component="BookOutline" />
              </template>
              访问博客
            </n-button>
          </n-space>
        </template>
      </n-result>

      <!-- 建议链接 -->
      <div class="suggestions">
        <n-card title="您可能在寻找">
          <n-list>
            <n-list-item>
              <n-thing>
                <template #avatar>
                  <n-icon :component="DocumentTextOutline" size="24" />
                </template>
                <template #header>
                  <router-link to="/blog" class="suggestion-link">
                    技术博客
                  </router-link>
                </template>
                <template #description>
                  浏览所有技术文章
                </template>
              </n-thing>
            </n-list-item>

            <n-list-item>
              <n-thing>
                <template #avatar>
                  <n-icon :component="FolderOutline" size="24" />
                </template>
                <template #header>
                  <router-link to="/docx-preview" class="suggestion-link">
                    文档预览
                  </router-link>
                </template>
                <template #description>
                  在线预览各种文档格式
                </template>
              </n-thing>
            </n-list-item>

            <n-list-item>
              <n-thing>
                <template #avatar>
                  <n-icon :component="InformationCircleOutline" size="24" />
                </template>
                <template #header>
                  <router-link to="/about" class="suggestion-link">
                    关于我们
                  </router-link>
                </template>
                <template #description>
                  了解更多关于项目的信息
                </template>
              </n-thing>
            </n-list-item>
          </n-list>
        </n-card>
      </div>
    </div>
  </n-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { darkTheme } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import { 
  HomeOutline, 
  ArrowBackOutline, 
  BookOutline,
  DocumentTextOutline,
  FolderOutline,
  InformationCircleOutline
} from '@vicons/ionicons5'

/**
 * @description 404 页面
 * 当用户访问不存在的页面时显示
 */

const router = useRouter()
const themeStore = useThemeStore()

// 主题
const isDark = computed(() => themeStore.isDark)

/**
 * @description 返回首页
 */
const goHome = () => {
  router.push('/')
}

/**
 * @description 返回上一页
 */
const goBack = () => {
  router.back()
}

/**
 * @description 前往博客
 */
const goBlog = () => {
  router.push('/blog')
}
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 24px;
  background: var(--n-color);
}

.not-found-icon {
  margin-bottom: 24px;
}

.icon-text {
  font-size: 120px;
  font-weight: 900;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.suggestions {
  max-width: 600px;
  width: 100%;
  margin-top: 48px;
}

.suggestion-link {
  color: var(--n-text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.suggestion-link:hover {
  color: #18a058;
}

/* 响应式 */
@media (max-width: 768px) {
  .icon-text {
    font-size: 80px;
  }

  .suggestions {
    margin-top: 32px;
  }
}
</style>
