<script setup lang="ts">
import { ref, provide, watch } from 'vue';
import { collapseContextKey } from './types';
import type { NameType, CollapseProps, CollaspeEmits } from './types';

defineOptions({
    name: 'YvCollapse'
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollaspeEmits>()
const activeNames = ref<NameType[]>(props.modelValue)
watch(() => props.modelValue, () => {
    activeNames.value = props.modelValue
})
const handleItemClick = (item: NameType) => {
    // console.log(item)
    // let _activeNames = [...activeNames.value]
    const index = activeNames.value.indexOf(item)
    // 手风琴效果
    if (props.accordion) {
        // 如果点击的是展开项，那就清空激活数组，否则替换，这样就保证了只有一项被激活
        activeNames.value = [activeNames.value[0] === item ? '' : item]
    } else {
        if (index > -1) {
            // 存在, 删除相应的一项
            activeNames.value.splice(index, 1)
        } else {
            // 不存在, 插入相应的一项
            activeNames.value.push(item)
        }
        // console.log(activeNames.value)
    }
    emits('update:modelValue', activeNames.value)
    emits('change', activeNames.value)

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