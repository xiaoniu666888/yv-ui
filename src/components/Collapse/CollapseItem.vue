<script setup lang="ts">
import { inject, computed } from 'vue';
import { collapseContextKey } from './types';
import type { CollapseItemProps } from './types';

defineOptions({
    name: "YvCollapseItem"
})
const props = defineProps<CollapseItemProps>()
// 接受祖先组件传递过来的参数
const collapseContext = inject(collapseContextKey)
// 根据是否被添加到数据进行显示/隐藏处理
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name))

const handleClick = () => {
    if (props.disabled) { return }
    collapseContext?.handleItemClick(props.name)
    // console.log(isActive.value)
}
</script>


<template>
    <div class="yv-collapse-item" :class="{
        'is-disabled': props.disabled
    }">
        <div class="yv-collapse-item_header" :id="`item-header-${props.name}`" @click="handleClick">
            <slot name="title">{{ title }}</slot>
        </div>
        <div class="yv-collapse-item_content" :id="`item-content-${props.name}`" v-if="isActive">
            <slot></slot>
        </div>

    </div>
</template>


<style scoped></style>