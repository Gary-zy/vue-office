<template>
  <div class="empty-container">
    <n-empty
      :description="description"
      :size="size"
    >
      <template v-if="buttonText" #extra>
        <n-button size="small" @click="handleClick">
          {{ buttonText }}
        </n-button>
      </template>
    </n-empty>
  </div>
</template>

<script setup>
/**
 * @description 空状态组件
 */

defineProps({
  description: {
    type: String,
    default: '暂无数据'
  },
  size: {
    type: String,
    default: 'medium'
  },
  buttonText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
</script>

<style scoped>
.empty-container {
  padding: 60px 20px;
}
</style>

