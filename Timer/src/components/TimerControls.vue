<script setup lang="ts">
    defineProps<{ isRunning: boolean; secondLeft: number; workTime: number; breakTime: number; status: 'work' | 'break' }>()
    const emit = defineEmits<{ toggle: []; reset: [] }>()
</script>

<template>
  <div class="controls">
        <el-button type="primary" @click="emit('toggle')">
            {{ isRunning ? '暂停' : secondLeft === (status === 'work' ? workTime : breakTime) ? '开始' : '继续' }}
        </el-button>
        <el-button @click="emit('reset')">重置</el-button>
  </div>
</template>

<style scoped>
.controls {
  margin: 20px;
  display: flex;
  justify-content: center;
  gap:12px
}
</style>
