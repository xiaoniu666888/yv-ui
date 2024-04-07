<script setup lang="ts">
import { ref, provide } from 'vue';
import { collapseContextKey } from './types';
import type { NameType } from './types';
defineOptions({
    name: 'YvCollapse'
})

const activeNames = ref<NameType[]>([])
const handleItemClick = (item: NameType) => {
    // console.log(item)
    const index = activeNames.value.indexOf(item)

    if (index > -1) {
        // 存在, 删除相应的一项
        activeNames.value.splice(index, 1)
    } else {
        // 不存在, 插入相应的一项
        activeNames.value.push(item)
    }
    // console.log(activeNames.value)
}
provide(collapseContextKey, {
    activeNames,
    handleItemClick
})
</script>


<template>
    <div class="yv-collapse">
        <slot></slot>
    </div>
</template>


<style scoped></style>