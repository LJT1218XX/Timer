import { ref } from "vue"

export function useTimer() {

    const WORK_TIME = ref(Number(localStorage.getItem('workTime')) || 15000)
    const BREAK_TIME = ref(Number(localStorage.getItem('breakTime')) || 3000)

    const secondLeft = ref(WORK_TIME.value)
    const isRunning = ref(false)
    const status = ref<'work' | 'break'> ('work')

    let timerId: ReturnType<typeof setInterval> | null = null
    let startTimestamp = 0
    let initialSecondLeft = 0


    function start(){
        if (isRunning.value) return
        else{
            isRunning.value = true
            startTimestamp = Date.now()
            initialSecondLeft = secondLeft.value
            timerId = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTimestamp) / 100)
                secondLeft.value = Math.max(0,initialSecondLeft - elapsed)
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
            const elapsed = (Math.floor(Date.now() - startTimestamp) / 100)
            secondLeft.value = Math.max(0, initialSecondLeft - elapsed)
            isRunning.value = false
        }
    }

    function reset(){
        pause()
        secondLeft.value = WORK_TIME.value
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
        secondLeft.value = BREAK_TIME.value
        } else {
        status.value = 'work'
        secondLeft.value = WORK_TIME.value
        }
    }

    function updateTimes(workTime: number, breakTime: number){
        const currentStatus = status.value
        WORK_TIME.value = workTime
        BREAK_TIME.value = breakTime
        localStorage.setItem('workTime', String(workTime))
        localStorage.setItem('breakTime', String(breakTime))

        pause()
        
        if (currentStatus === 'work') {
            secondLeft.value = WORK_TIME.value
            status.value = 'work'
        } else {
            secondLeft.value = BREAK_TIME.value
            status.value = 'break'
        }
    }

    return { WORK_TIME, BREAK_TIME, secondLeft, isRunning, status, start, pause, reset, toggleTimer, updateTimes }
}