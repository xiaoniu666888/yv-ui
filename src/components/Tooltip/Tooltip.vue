<script setup lang="ts">
import { ref, watch, reactive, onMounted, computed } from 'vue';
import { createPopper } from '@popperjs/core'
import useCilckOutside from '@/hooks/utilTooltip'
import { debounce } from 'lodash-es';
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import type { Instance } from '@popperjs/core'
// props属性
const props = withDefaults(defineProps<TooltipProps>(), {
    placement: 'bottom',
    trigger: 'hover',
    transition: 'fade',
    openDelay: 0,
    closeDelay: 0
})
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const isOpen = ref<boolean>(false)
const popperContainNode = ref<HTMLElement>()
// popper实例
let popperInstance: null | Instance = null
const emits = defineEmits<TooltipEmits>()


let counter = 0
// 打开提示框
const tooltipOpen = () => {
    counter++
    console.log('open', counter)
    isOpen.value = true
    emits('visable-change', true)
}
// 关闭提示框
const tooltipClose = () => {
    counter++
    console.log('close', counter)
    isOpen.value = false
    emits('visable-change', false)
}

// 防抖
const openTooltip = debounce(tooltipOpen, props.openDelay)
const closeTooltip = debounce(tooltipClose, props.closeDelay)

// 点击
const handlePopper = () => {
    if (isOpen.value) {
        close()
    } else {
        open()
    }
}

// 最终暴露的打开函数
const open = () => {
    closeTooltip.cancel()
    openTooltip()
}
// 最终暴露的关闭函数
const close = () => {
    openTooltip.cancel()
    closeTooltip()
}
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
const popperOptions = computed(() => {
    return {
        placement: props.placement,
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 9],
                },
            }
        ],
        ...props.popperOptions
    }
})
const attachEvents = () => {
    if (props.trigger === 'hover') {
        events['mouseenter'] = open
        outerEvents['mouseleave'] = close
    } else {
        events['click'] = handlePopper
    }
}
if (!props.manual) {
    attachEvents()
}
// 监听弹框是否关闭
watch(isOpen, (newVal) => {
    if (newVal) {
        if (triggerNode.value && popperNode.value) {
            popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
        } else {
            popperInstance?.destroy()
        }
    }
}, { flush: 'post' })
// 监听触发方式
watch(() => props.trigger, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        events = {}
        outerEvents = {}
        attachEvents()
    }
})
// 监听是否手动
watch(() => props.manual, (isManual) => {
    if (isManual) {
        events = {}
        outerEvents = {}
    } else {
        attachEvents()
    }
})
// 点击组件外部也会关闭提示框
useCilckOutside(popperContainNode, () => {
    if (props.trigger && isOpen.value && !props.manual) {
        close()
    }
})
onMounted(() => {
    popperInstance?.destroy()
})
defineExpose<TooltipInstance>({
    'show': open,
    'hide': close
})
</script>

<template>
    <div class="yv-tooltip" ref="popperContainNode" v-on="outerEvents">
        <!-- 触发节点 -->
        <div class="yv-tooltip__trigger" v-on="events" ref="triggerNode">
            <slot></slot>
        </div>
        <Transition :name="transition">
            <!-- 显示提示框 -->
            <div v-if="isOpen" class="yv-tooltip__popper" ref="popperNode">
                <slot name="content">{{ content }}</slot>
                <div id="arrow" data-popper-arrow></div>
            </div>
        </Transition>


    </div>
</template>


<style scoped></style>