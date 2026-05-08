<script setup lang="ts">
  import { ref } from 'vue';
  import TimerDisplay from './components/TimerDisplay.vue'
  import TimerStatus from './components/TimerStatus.vue';

  const WORK_TIME = 20
  const BREAK_TIME = 3000


  const secondLeft = ref(WORK_TIME)
  const isRunning = ref(false)
  const status = ref<'work' | 'break'> ('work')

  let timerId: ReturnType<typeof setInterval> | null = null


  function start(){
    if (isRunning.value) return
    else{
      isRunning.value = true
      timerId = setInterval(() => {
        secondLeft.value--
        if (secondLeft.value <= 0){
          secondLeft.value = 0
          clearInterval(timerId!)
          isRunning.value = false
          
          window.ipcRenderer.send('show-notification', {
          title: status.value === 'work' ? '🎉 工作完成！' : '☕ 休息结束！',
          body: status.value === 'work' ? '该休息一下了' : '继续工作吧'
          })

          switchPhase()
        }
    }, 100)}
  }

  function pause() {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
      isRunning.value = false
    }
  }

  function reset(){
    pause()
    secondLeft.value = WORK_TIME
    status.value = 'work'
    isRunning.value = false
  }

  function toggleTimer() {
    if (isRunning.value) {
      pause()
    } else {
      start()
    }
  }

  function switchPhase() {
    if (status.value === 'work') {
      status.value = 'break'
      secondLeft.value = BREAK_TIME
    } else {
      status.value = 'work'
      secondLeft.value = WORK_TIME
    }
  }

</script>

<template>
  <div class="app">
    <h1>🍅Timer</h1>
    <TimerStatus :status="status"/>
    <TimerDisplay :seconds="secondLeft"/>
    <div class="controls">
     <el-button type = "primary" \
     @click = "toggleTimer">{{ isRunning ? '暂停' : secondLeft === (status === 'work' ? WORK_TIME : BREAK_TIME) ? '开始' : '继续' }}
    </el-button>
     <el-button @click = reset>重置</el-button>
    </div>
  </div>
  
</template>

<style scoped>
.app {
  text-align: center;
  padding-top: 40px;
}
.controls {
  margin: 20px;
  display: flex;
  justify-content: center;
  gap:12px
}
</style>