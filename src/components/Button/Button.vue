<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from './types';
import Icon from '../Icon/Icon.vue'
defineOptions({
    name: 'YvButton'
})
withDefaults(defineProps<ButtonProps>(), {
    nativeType: 'button'
})
const _ref = ref<HTMLButtonElement>()
defineExpose({
    ref: _ref
})
</script>

<template>
    <button ref="_ref" class="yv-button" :class="{
        [`yv-button--${type}`]: type,
        [`yv-button--${size}`]: size,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled
    }" :disabled="disabled || loading" :autofocus="autofocus" :type="nativeType">
        <Icon :icon="icon" v-if="icon"></Icon>
        <Icon icon="spinner" spin v-if="loading"></Icon>
        <span>
            <slot></slot>
        </span>
    </button>
</template>