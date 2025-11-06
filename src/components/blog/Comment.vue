<template>
  <div class="comment-section">
    <div class="comment-header">
      <h3 class="comment-title">
        <n-icon :component="ChatbubblesOutline" />
        评论 ({{ comments.length }})
      </h3>
    </div>

    <!-- 评论输入框 -->
    <div class="comment-input-wrapper">
      <n-input
        v-model:value="commentInput"
        type="textarea"
        placeholder="写下你的评论..."
        :autosize="{ minRows: 3, maxRows: 8 }"
        :maxlength="500"
        show-count
      />
      <div class="comment-actions">
        <n-button 
          type="primary"
          :disabled="!commentInput.trim()"
          :loading="submitting"
          @click="submitComment"
        >
          发表评论
        </n-button>
      </div>
    </div>

    <!-- 评论列表 -->
    <div v-if="comments.length > 0" class="comment-list">
      <div 
        v-for="comment in displayedComments" 
        :key="comment.id"
        class="comment-item"
      >
        <!-- 头像 -->
        <n-avatar 
          :src="comment.author.avatar" 
          :size="40"
          round
          class="comment-avatar"
        />

        <!-- 评论内容 -->
        <div class="comment-content">
          <!-- 作者信息 -->
          <div class="comment-author-info">
            <span class="author-name">{{ comment.author.name }}</span>
            <span class="comment-time">{{ formatTime(comment.createTime) }}</span>
          </div>

          <!-- 评论文本 -->
          <div class="comment-text">
            {{ comment.content }}
          </div>

          <!-- 评论操作 -->
          <div class="comment-operations">
            <n-button 
              text 
              size="small"
              @click="likeComment(comment.id)"
            >
              <template #icon>
                <n-icon 
                  :component="comment.isLiked ? Heart : HeartOutline" 
                  :color="comment.isLiked ? '#ff6b6b' : undefined"
                />
              </template>
              {{ comment.likes }}
            </n-button>
            <n-button 
              text 
              size="small"
              @click="replyComment(comment.id)"
            >
              <template #icon>
                <n-icon :component="ChatbubbleOutline" />
              </template>
              回复
            </n-button>
          </div>

          <!-- 回复列表 -->
          <div v-if="comment.replies && comment.replies.length > 0" class="replies">
            <div 
              v-for="reply in comment.replies"
              :key="reply.id"
              class="reply-item"
            >
              <n-avatar 
                :src="reply.author.avatar" 
                :size="32"
                round
              />
              <div class="reply-content">
                <div class="reply-author">
                  <span class="author-name">{{ reply.author.name }}</span>
                  <span v-if="reply.replyTo" class="reply-to">
                    回复 <span class="reply-to-name">@{{ reply.replyTo }}</span>
                  </span>
                </div>
                <div class="reply-text">{{ reply.content }}</div>
                <div class="reply-time">{{ formatTime(reply.createTime) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <n-empty 
      v-else
      description="暂无评论，来抢沙发吧~"
      size="large"
    />

    <!-- 加载更多 -->
    <div v-if="hasMore" class="load-more">
      <n-button 
        text
        @click="loadMore"
      >
        加载更多评论
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ChatbubblesOutline, ChatbubbleOutline, HeartOutline, Heart } from '@vicons/ionicons5'
import { formatFriendlyTime } from '@/utils/date'
import { useMessage } from 'naive-ui'

/**
 * @description 评论组件
 * 支持发表评论、点赞、回复等功能（Mock 数据）
 */

const props = defineProps({
  articleId: {
    type: String,
    required: true
  }
})

const message = useMessage()

// 评论输入
const commentInput = ref('')

// 提交中
const submitting = ref(false)

// 显示的评论数量
const displayCount = ref(10)

// Mock 评论数据
const comments = ref([
  {
    id: 'comment_001',
    author: {
      name: '技术爱好者',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User1'
    },
    content: '这篇文章写得非常好，学到了很多东西！特别是关于性能优化的部分，很有启发。',
    createTime: '2024-01-20T10:30:00Z',
    likes: 42,
    isLiked: false,
    replies: [
      {
        id: 'reply_001',
        author: {
          name: '作者',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Author'
        },
        content: '谢谢支持！后续会继续分享更多实用的技术文章。',
        createTime: '2024-01-20T11:00:00Z',
        replyTo: '技术爱好者'
      }
    ]
  },
  {
    id: 'comment_002',
    author: {
      name: '前端开发',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User2'
    },
    content: '代码示例很清晰，跟着敲了一遍，理解更深刻了。希望能多出这样的教程。',
    createTime: '2024-01-21T09:15:00Z',
    likes: 28,
    isLiked: false,
    replies: []
  },
  {
    id: 'comment_003',
    author: {
      name: '学习中',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User3'
    },
    content: '请问有相关的源码仓库吗？想看看完整的实现。',
    createTime: '2024-01-22T14:20:00Z',
    likes: 15,
    isLiked: false,
    replies: []
  }
])

/**
 * @description 显示的评论列表
 */
const displayedComments = computed(() => {
  return comments.value.slice(0, displayCount.value)
})

/**
 * @description 是否有更多评论
 */
const hasMore = computed(() => {
  return comments.value.length > displayCount.value
})

/**
 * @description 格式化时间
 */
const formatTime = (time) => {
  return formatFriendlyTime(time)
}

/**
 * @description 发表评论
 */
const submitComment = () => {
  if (!commentInput.value.trim()) return

  submitting.value = true

  // 模拟提交延迟
  setTimeout(() => {
    const newComment = {
      id: `comment_${Date.now()}`,
      author: {
        name: '当前用户',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser'
      },
      content: commentInput.value,
      createTime: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      replies: []
    }

    comments.value.unshift(newComment)
    commentInput.value = ''
    submitting.value = false

    message.success('评论发表成功！')
  }, 500)
}

/**
 * @description 点赞评论
 */
const likeComment = (commentId) => {
  const comment = comments.value.find(c => c.id === commentId)
  if (comment) {
    if (comment.isLiked) {
      comment.likes--
      comment.isLiked = false
    } else {
      comment.likes++
      comment.isLiked = true
    }
  }
}

/**
 * @description 回复评论
 */
const replyComment = (commentId) => {
  message.info('回复功能开发中...')
}

/**
 * @description 加载更多评论
 */
const loadMore = () => {
  displayCount.value += 10
}
</script>

<style scoped>
.comment-section {
  width: 100%;
  margin-top: 48px;
}

.comment-header {
  margin-bottom: 24px;
}

.comment-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: var(--n-title-text-color);
}

.comment-title .n-icon {
  font-size: 24px;
}

.comment-input-wrapper {
  margin-bottom: 32px;
  padding: 20px;
  background: var(--n-color);
  border-radius: 12px;
  border: 1px solid var(--n-border-color);
}

.comment-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.comment-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: var(--n-color);
  border-radius: 12px;
  border: 1px solid var(--n-border-color);
  transition: all 0.3s ease;
}

.comment-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.comment-avatar {
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
  min-width: 0;
}

.comment-author-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.author-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--n-text-color);
}

.comment-time {
  font-size: 13px;
  color: var(--n-text-color);
  opacity: 0.6;
}

.comment-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--n-text-color);
  margin-bottom: 12px;
  word-break: break-word;
}

.comment-operations {
  display: flex;
  gap: 16px;
}

.replies {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--n-border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reply-item {
  display: flex;
  gap: 12px;
}

.reply-content {
  flex: 1;
}

.reply-author {
  font-size: 13px;
  margin-bottom: 6px;
}

.reply-to {
  color: var(--n-text-color);
  opacity: 0.6;
}

.reply-to-name {
  color: #18a058;
  font-weight: 500;
}

.reply-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--n-text-color);
  margin-bottom: 6px;
}

.reply-time {
  font-size: 12px;
  color: var(--n-text-color);
  opacity: 0.5;
}

.load-more {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

/* 响应式 */
@media (max-width: 768px) {
  .comment-item {
    flex-direction: column;
  }

  .comment-operations {
    flex-wrap: wrap;
  }
}
</style>
