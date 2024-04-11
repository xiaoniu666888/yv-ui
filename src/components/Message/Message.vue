<script setup lang="ts">
import RenderVnode from '@/common/RenderVnode'
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import { getLastBottomOffset } from './create'
import Icon from '../Icon/Icon.vue'

import type { MessageProps } from './types'
// const instance = getCurrentInstance()
// console.log(instance)
const props = withDefaults(defineProps<MessageProps>(), {
    type: 'info',
    duration: 3000,
    offset: 20,
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

function startTimer() {
    if (props.duration === 0) return

    setTimeout(() => {
        visible.value = false
    }, props.duration)
}
const handleClose = () => {
    visible.value = false
}
onMounted(async () => {
    visible.value = true
    startTimer()
    await nextTick()
    height.value = messageRef.value!.getBoundingClientRect().height
})
watch(visible, (newVal) => {
    if (!newVal) {
        props.useDestory()
    }
})
defineExpose({
    bottomOffset
})
</script>


<template>
    <div class="yv-message" v-show="visible" role="alert" :class="{
        [`vk-message--${type}`]: type,
        'is-close': props.showClose
    }" ref="messageRef">
        <div class="yv-message__content">
            <slot>
                {{ offset }} - {{ topOffset }} - {{ height }} - {{ bottomOffset }}
                <RenderVnode :v-node="props.message" v-if="props.message" />
            </slot>
        </div>
        <div class="yv-message__close" v-if="props.showClose">
            <Icon icon="xmark" @click.stop="handleClose"></Icon>
        </div>
    </div>
</template>


<style scoped></style>