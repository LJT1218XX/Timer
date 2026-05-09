<script setup lang="ts">

import { ref, onMounted, onUnmounted } from 'vue'

const isMaximized = ref (false)

function handleWindowState(_event: any, maximized: boolean){
    isMaximized.value = maximized
}

onMounted(()=> {
    window.ipcRenderer.on('window-state-changed', handleWindowState)
})

onUnmounted(()=> window.ipcRenderer.off('window-state-changed', handleWindowState))

function minimize(){
    window.ipcRenderer.send('window-minimize')
}

function maximize(){
    window.ipcRenderer.send('window-maximize')
}

function closeWin(){
    window.ipcRenderer.send('window-close')
}

</script>

<template>
    <div class="title-bar">
    <div class="drag-region">🍅 Timer</div>
    <div class="window-controls">
        <el-button @click="minimize" text>─</el-button>
    <el-button @click="maximize" text>{{ isMaximized ? '❐' : '□' }}</el-button>
    <el-button @click="closeWin" text>✕</el-button>
    </div>
    </div>
</template>

<style scoped>
.title-bar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    -webkit-app-region: drag;
    background: #f5f5f5;
    z-index: 100;
}
.drag-region {
    padding-left: 12px;
    font-size: 14px;
    user-select: none;
}
.window-controls {
    -webkit-app-region: no-drag;
    display: flex;
    gap: 1px;
    padding-right: 1px;
}
</style>