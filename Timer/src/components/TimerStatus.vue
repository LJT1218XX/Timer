<script setup lang="ts">
defineProps<{
    status: 'work' | 'break'
}>()
</script>

<template>
    <div class="status">
        {{ status === 'work' ? '🍅 工作中' : '☕ 休息中' }}
    </div>
</template>

<style scoped>
.status {
    font-size: 24px;
    margin-top: 10px;
    color: #666
}
</style>