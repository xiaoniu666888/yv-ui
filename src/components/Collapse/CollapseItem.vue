<script setup lang="ts">
import { inject, computed } from 'vue';
import { collapseContextKey } from './types';
import type { CollapseItemProps } from './types';
import Icon from '../Icon/Icon.vue';

defineOptions({
    name: "YvCollapseItem"
})
const props = defineProps<CollapseItemProps>()
// 接受祖先组件传递过来的参数
const collapseContext = inject(collapseContextKey, undefined)
// 根据是否被添加到数据进行显示/隐藏处理
const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name))

const handleClick = () => {
    if (props.disabled) { return }
    collapseContext?.handleItemClick(props.name)
    // console.log(isActive.value)
}

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
    beforeEnter(el) {
        el.style.height = '0px'
        el.style.overflow = 'hidden'
    },
    enter(el) {
        el.style.height = `${el.scrollHeight}px`
    },
    afterEnter(el) {
        el.style.height = ''
        el.style.overflow = ''
    },
    beforeLeave(el) {
        el.style.height = `${el.scrollHeight}px`
        el.style.overflow = 'hidden'
    },
    leave(el) {
        el.style.height = '0px'
    },
    afterLeave(el) {
        el.style.height = ''
        el.style.overflow = ''
    }
}
</script>


<template>
    <div class="yv-collapse-item" :class="{
        'is-disabled': props.disabled
    }">
        <div class="yv-collapse-item__header" :class="{
            'is-disabled': disabled,
            'is-active': isActive

        }" :id="`item-header-${props.name}`" @click="handleClick">
            <slot name="title">{{ title }}</slot>
            <Icon icon="angle-right" class="header-angle"></Icon>
        </div>
        <Transition name="slide" v-on="transitionEvents">
            <div class="yv-collapse-item__wrapper" v-show="isActive">
                <div class="yv-collapse-item__content" :id="`item-content-${props.name}`">
                    <slot></slot>
                </div>
            </div>
        </Transition>


    </div>
</template>


<style scoped></style>