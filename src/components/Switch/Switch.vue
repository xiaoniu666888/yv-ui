<script setup lang="ts">
import type { SwitchProps, SwitchEmits } from './types'
import { ref, computed } from 'vue';
const props = defineProps<SwitchProps>()
const emits = defineEmits<SwitchEmits>()

const innerValue = ref(props.modelValue)
// 是否被选中
const checked = computed(() => innerValue.value)
const switchValue = () => {
    if (props.disabled) return

    innerValue.value = !innerValue.value

    emits("update:modelValue", innerValue.value)
    emits("change", innerValue.value)

}
</script>


<template>
    <div class="yv-switch" :class="{

        [`vk-switch--${size}`]: size,
        'is-disabled': disabled,
        'is-checked': checked
    }" @click="switchValue">
        <input class="yv-switch__input" type="checkbox" role="switch" :name="name" :disabled="disabled" />

        <div class="yv-switch__core">
            <div class="yv-switch__core-action"></div>
        </div>
    </div>
</template>