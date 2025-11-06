<template>
  <div class="loading-container" :class="{ fullscreen }">
    <n-spin :size="size">
      <template #description>
        <span v-if="text">{{ text }}</span>
      </template>
    </n-spin>
  </div>
</template>

<script setup>
/**
 * @description 加载动画组件
 */

defineProps({
  text: {
    type: String,
    default: '加载中...'
  },
  size: {
    type: String,
    default: 'medium'
  },
  fullscreen: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.loading-container.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 9999;
}
</style>

