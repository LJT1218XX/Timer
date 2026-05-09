<script setup lang="ts">
    import { ref } from 'vue';
    import { Edit } from '@element-plus/icons-vue';

    const closeAction = ref(localStorage.getItem('closeAction') || 'ask')
    const dialogVisible = ref (false)
    const emit = defineEmits<{
        save: [workTime: number, breakTime: number]
    }>()

    const props = defineProps<{
        workTime: number
        breakTime: number
    }>()

    const tempWork = ref(25)
    const tempBreak = ref(5)


    function showDialog(){
        tempWork.value = props.workTime
        tempBreak.value = props.breakTime
        closeAction.value = localStorage.getItem('closeAction') || 'ask'
        dialogVisible.value = true
    }

    function save(){
        emit('save', tempWork.value, tempBreak.value)
        localStorage.setItem('closeAction', closeAction.value)
        dialogVisible.value = false
    }
</script>

<template>
    <div class="settings">
        <el-button type="primary" :icon="Edit" @click=showDialog></el-button>
    </div>
    <el-dialog v-model="dialogVisible" title="设置">
        <p>工作时间：<el-input-number v-model="tempWork" :min="1" :max="120"/></p>
        <p>休息时间：<el-input-number v-model="tempBreak" :min="1" :max="60"/></p>
        <p>关闭窗口时：</p>
        <el-radio-group v-model="closeAction">
            <el-radio value="ask">每次都询问</el-radio>
            <el-radio value="hide">最小化到托盘</el-radio>
            <el-radio value="quit">直接退出</el-radio>
        </el-radio-group>
        <template #footer>
            <el-button @click="save" type="primary">保存</el-button>
        </template>
    </el-dialog>
</template>

<style scoped>
.settings {
    position: fixed;
    font-size: 10px;
    top: 42px;
    right: 10px;
    z-index: 10;
    
}
</style>