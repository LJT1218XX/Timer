<script setup lang="ts">
    defineProps<{
        status: 'work' | 'break'
        isRunning: boolean
    }>()
</script>

<template>
    <div class="status">
        {{ status === 'work' ? (isRunning ? '🍅 工作中' : '🍅开始工作吧！') : (isRunning ? '☕ 休息中' : '☕开始休息吧') }}
    </div>
</template>

<style scoped>
.status {
    font-size: 24px;
    margin-top: 10px;
    color: #666
}
</style>