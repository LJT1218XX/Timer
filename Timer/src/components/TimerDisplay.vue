<script setup lang="ts">
import { computed } from 'vue';

    const props = defineProps<{
        seconds: number
        total: number
    }>()

    const circumference = 2 * Math.PI * 120 // ≈ 754
    const offset = computed(() => { 
        const progress = props.total > 0 ? (props.total - props.seconds) / props.total : 0
        return circumference * (1 - Math.min(progress, 1))
    })

    function formatTime(ds: number): string {
        const totalSeconds = Math.floor(ds / 10)
        const m = Math.floor(totalSeconds / 60)
        const s = totalSeconds % 60
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    }
</script>

<template>
    <div class="display">
        <svg class="ring" viewBox="0 0 300 300">
            <circle cx="150" cy="150" r="120" fill="none" stroke="#eee" stroke-width="12"/>
            <circle
                cx="150" cy="150" r="120" fill="none"
                :stroke="seconds === 0 ? '#eee' : '#ff4757'"
                stroke-width="12"
                stroke-linecap="round"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="offset"
                transform="rotate(-90 150 150)"
                class="progress" 
            />
        </svg>
        <div class="time">{{ formatTime(seconds) }}</div>
    </div>
</template>

<style scoped>
    .display {
        position: relative;
        width: 280px;
        height: 280px;
        margin: 10px auto;
    }
    .ring {
        width: 100%;
        height: 100%;
    }
    .progress {
        transition: stroke-dashoffset 0.1s linear;
    }
    .time {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 52px;
        font-weight: bold;
        font-variant-numeric: tabular-nums;
    }
</style>