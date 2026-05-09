<script setup lang="ts">
  import TimerDisplay from './components/TimerDisplay.vue'
  import TimerStatus from './components/TimerStatus.vue';
  import SettingsDialog from './components/SettingsDialog.vue';
  import TimerControls from './components/TimerControls.vue';
  import TitleBar from './components/TitleBar.vue';
  import { useTimer } from './composables/useTimer';


  const { WORK_TIME, BREAK_TIME, secondLeft, isRunning, status, reset, toggleTimer, updateTimes } = useTimer()

</script>

<template>
  <div class="app">
    <TitleBar/>
    <SettingsDialog 
      :work-time="Math.floor(WORK_TIME / 600)"
      :break-time="Math.floor(BREAK_TIME / 600)"
      @save="(w, b) => updateTimes(w * 600, b * 600)" />
    <TimerStatus :status="status" :is-running="isRunning"/>
    <TimerDisplay :seconds="secondLeft"/>

    <TimerControls
      :is-running = "isRunning"
      :second-left="secondLeft"
      :work-time="WORK_TIME"
      :break-time="BREAK_TIME"
      :status="status"
      @toggle="toggleTimer"
      @reset="reset"
    />
  </div>
  
</template>

<style scoped>
.app {
  text-align: center;
  padding-top: 60px;
  position: relative;
}
</style>