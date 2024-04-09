<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { createPopper } from '@popperjs/core'
import type { TooltipProps, TooltipEmits } from './types';
import type { Instance } from '@popperjs/core'

const props = withDefaults(defineProps<TooltipProps>(), {
    placement: 'bottom',
    trigger: 'hover'
})
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const isOpen = ref<boolean>(false)
// popper实例
let popperInstance: null | Instance = null
const emits = defineEmits<TooltipEmits>()
// 点击
const handlePopper = () => {
    isOpen.value = !isOpen.value
    // console.log(triggerNode.value, popperNode.value)
    emits('visable-change', isOpen.value)
}
const hoverOpen = () => {
    isOpen.value = true
    emits('visable-change', true)
}

const hoverClose = () => {
    isOpen.value = false
    emits('visable-change', false)
}
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
const attachEvents = () => {
    if (props.trigger === 'hover') {
        events['mouseenter'] = hoverOpen
        outerEvents['mouseleave'] = hoverClose
    } else {
        events['click'] = handlePopper
    }
}
attachEvents()

watch(isOpen, (newVal) => {
    if (newVal) {
        if (triggerNode.value && popperNode.value) {
            popperInstance = createPopper(triggerNode.value, popperNode.value, { placement: props.placement })
        } else {
            popperInstance?.destroy()
        }
    }
}, { flush: 'post' })
watch(() => props.trigger, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        events = {}
        outerEvents = {}
        attachEvents()
    }
})
// watch()
</script>

<template>
    <div class="yv-tooltip" v-on="outerEvents" style="border: 1px solid red;">
        <!-- 触发节点 -->
        <div class="yv-tooltip__trigger" v-on="events" ref="triggerNode">
            <slot></slot>

        </div>
        <!-- 显示提示框 -->
        <div v-if="isOpen" class="yv-tooltip__popper" style="border: 1px solid red;" ref="popperNode">
            <slot name="content">{{ content }}</slot>
        </div>

    </div>
</template>


<style scoped></style>