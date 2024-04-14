<script setup lang="ts">
import type { SwitchProps, SwitchEmits } from './types'
import { ref, computed, onMounted, watch } from 'vue';
const props = withDefaults(defineProps<SwitchProps>(), {
    activeValue: true,
    inactiveValue: false
})
const emits = defineEmits<SwitchEmits>()
const inputRef = ref<HTMLInputElement>()
const innerValue = ref(props.modelValue)
// 是否被选中
const checked = computed(() => innerValue.value === props.activeValue)
const switchValue = () => {
    if (props.disabled) return
    const newValue = checked.value ? props.inactiveValue : props.activeValue
    innerValue.value = newValue
    emits("update:modelValue", newValue)
    emits("change", newValue)
}

onMounted(() => {
    inputRef.value!.checked = checked.value
})

watch(checked, (newVal) => {
    inputRef.value!.checked = newVal
})
watch(() => props.modelValue, (newVal) => {
    innerValue.value = newVal
})
</script>


<template>
    <div class="yv-switch" :class="{

        [`yv-switch--${size}`]: size,
        'is-disabled': disabled,
        'is-checked': checked
    }" @click="switchValue">
        <input ref="inputRef" class="yv-switch__input" type="checkbox" role="switch" :name="name" :disabled="disabled"
            @keydown.enter="switchValue" />

        <div class="yv-switch__core">
            <div class="yv-switch__core-inner">
                <span class="yv-switch__core-inner-text" v-if="activeText || inactiveText" yv-switch__core-inner-text>
                    {{ checked ? activeText : inactiveText }}
                </span>
            </div>
            <div class="yv-switch__core-action"></div>
        </div>
    </div>
</template>