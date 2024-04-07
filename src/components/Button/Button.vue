<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from './types';
defineOptions({
    name: "YButton"
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
    <div>
        <button ref="_ref" class="yv-button" :class="{
            [`yv-button--${type}`]: type,
            [`yv-button--${size}`]: size,
            'is-plain': plain,
            'is-round': round,
            'is-circle': circle,
            'is-disabled': disabled
        }" :disabled="disabled" :autofocus="autofocus" :type="nativeType">
            <span>
                <slot></slot>
            </span>
        </button>
    </div>
</template>


<style scoped></style>