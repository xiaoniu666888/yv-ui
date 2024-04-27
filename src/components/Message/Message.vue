<script setup lang="ts">
import RenderVnode from '@/common/RenderVnode'
import { ref, onMounted, computed } from 'vue';
// import { watch, nextTick } from 'vue';
import { getLastBottomOffset } from './create'
import Icon from '../Icon/Icon.vue'
import useEventListener from '../../hooks/useEventListener';

import type { MessageProps } from './types'
defineOptions({
    name: 'YvMessage'
})
// const instance = getCurrentInstance()
// console.log(instance)
const props = withDefaults(defineProps<MessageProps>(), {
    type: 'info',
    duration: 3000,
    offset: 20,
    transitionName: 'fade-up'
})
const visible = ref<boolean>(false)
// const instance = getLastInstance()
// console.log("instance=>", instance)

const messageRef = ref<HTMLDivElement>()
// 计算偏移高度
const height = ref(0)
// 上一个实例的最下面的坐标数字,第一个是0
const lastOffset = computed(() => getLastBottomOffset(props.id))
// 当前元素应该使用的top
const topOffset = computed(() => props.offset + lastOffset.value)
// 该元素为下一个元素预留的offset, 也就是它最低端bottom的值
const bottomOffset = computed(() => height.value + topOffset.value)
const cssStyle = computed(() => ({
    top: topOffset.value + 'px',
    zIndex: props.zIndex
}))
let timer: any;
const startTimer = () => {
    if (props.duration === 0) return

    timer = setTimeout(() => {
        visible.value = false
    }, props.duration)
    // console.log("mouseleave")
}

const clearTimer = () => {
    // console.log('mouseenter')
    clearTimeout(timer)
    // console.log(timer)

}
const handleClose = () => {
    visible.value = false
}
onMounted(async () => {
    visible.value = true
    startTimer()
    // await nextTick()
    // height.value = messageRef.value!.getBoundingClientRect().height
})
function keydown(e: Event) {
    const event = e as KeyboardEvent
    if (event.code === 'Escape') {
        visible.value = false
    }
}
useEventListener(document, 'keydown', keydown)

function destroyComponent() {
    props.useDestroy()
}
function updateHeight() {
    height.value = messageRef.value!.getBoundingClientRect().height
}
defineExpose({
    bottomOffset,
    visible
})
</script>

<template>
    <Transition :name="props.transitionName" @after-leave="destroyComponent" @enter="updateHeight">
        <div class="yv-message" v-show="visible" role="alert" :class="{
            [`yv-message--${type}`]: type,
            'is-close': props.showClose
        }" ref="messageRef" :style="cssStyle" @mouseenter="clearTimer" @mouseleave="startTimer">
            <div class="yv-message__content">
                <slot>
                    <RenderVnode :v-node="props.message" v-if="props.message" />
                </slot>
            </div>
            <div class="yv-message__close" v-if="props.showClose">
                <Icon icon="xmark" @click.stop="handleClose"></Icon>
            </div>
        </div>
    </Transition>
</template>