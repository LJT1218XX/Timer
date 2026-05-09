<script setup lang="ts">
    import { ref } from 'vue';
    import { Edit } from '@element-plus/icons-vue';

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
        dialogVisible.value = true
    }

    function save(){
        emit('save', tempWork.value, tempBreak.value)
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