<script setup lang="ts">
import RenderVnode from '@/common/RenderVnode'
import { ref, onMounted, watch } from 'vue'
import { getLastInstance } from './create'
import Icon from '../Icon/Icon.vue'

import type { MessageProps } from './types'

const props = defineProps<MessageProps>()
const visible = ref<boolean>(false)
const instance = getLastInstance()
console.log("instance=>", instance)
function startTimer() {
    if (props.duration === 0) return

    setTimeout(() => {
        visible.value = false
    }, props.duration)
}
const handleClose = () => {
    visible.value = false
}
onMounted(() => {
    visible.value = true
    startTimer()
})
watch(visible, (newVal) => {
    if (!newVal) {
        props.useDestory()
    }
})
</script>


<template>
    <div class="yv-message" v-show="visible" role="alert" :class="{
        [`vk-message--${type}`]: type,
        'is-close': props.showClose
    }">
        <div class="yv-message__content">
            <slot>
                <RenderVnode :v-node="props.message" v-if="props.message" />
            </slot>
        </div>
        <div class="yv-message__close" v-if="props.showClose">
            <Icon icon="xmark" @click.stop="handleClose"></Icon>
        </div>
    </div>
</template>


<style scoped></style>