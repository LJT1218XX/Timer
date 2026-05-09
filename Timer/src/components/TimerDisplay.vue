<script setup lang="ts">
    const props = defineProps<{
        seconds: number
    }>()

    function formatTime(ds: number): string {
        const totalSeconds = Math.floor(ds / 10)
        const m = Math.floor(totalSeconds / 60)
        const s = totalSeconds % 60
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    }
</script>

<template>
    <div class="display">
        {{ formatTime(seconds) }}
    </div>
</template>

<style scoped>
    .display {
        font-size: 96px;
        font-weight: bold;
        font-variant-numeric: tabular-nums;
        margin: 30px 0;
    }
</style>