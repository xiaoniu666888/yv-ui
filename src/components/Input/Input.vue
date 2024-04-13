<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { InputProps, InputEmits } from './types'

defineOptions({
    name: 'YvInput'
})
const props = withDefaults(defineProps<InputProps>(), { type: 'text' })
const emits = defineEmits<InputEmits>()
const innerValue = ref(props.modelValue)
const isFocus = ref(false)

const showClear = computed(() => props.clearable && !props.disabled && !!innerValue.value && isFocus.value)

const handleInput = () => {
    emits('update:modelValue', innerValue.value)
}
const handleFocus = () => {
    isFocus.value = true
    // console.log(innerValue.value)
}
const handleBlur = () => {
    isFocus.value = false
    // console.log(innerValue.value)
}
const clearValue = () => {
    innerValue.value = ''
    console.log(111)
    emits('update:modelValue', '')
}
watch(() => props.modelValue, (newVal) => {
    innerValue.value = newVal
})


</script>


<template>
    <div class="yv-input" :class="{
        [`yv-input--${type}`]: props.type,
        [`yv-input--${size}`]: props.size,
        'is-disabled': props.disabled,
        'is-prepend': $slots.prepend,
        'is-append': $slots.append,
        'is-prefix': $slots.prefix,
        'is-suffix': $slots.suffix,
        'is-focus': isFocus
    }">

        <!-- input形式 -->
        <template v-if="type !== 'textarea'">
            <!-- 输入框前置内容，只对非 type="textarea" 有效 -->
            <div v-if="$slots.prepend" class="yv-input__prepend">
                <slot name="prepend"></slot>
            </div>
            <!-- 输入框头部内容，只对非 type="textarea" 有效 -->
            <div class="yv-input__wrapper">
                <span v-if="$slots.prefix" class="yv-input__prefix">
                    <slot name="prefix"></slot>
                </span>
            </div>

            <input class="yv-input__inner" :type="props.type" :disabled="props.disabled" v-model="innerValue"
                @input="handleInput" @focus="handleFocus" @blur="handleBlur" />

            <!-- 输入框尾部内容，只对非 type="textarea" 有效 -->
            <div class="yv-input__wrapper">
                <span v-if="$slots.suffix || showClear" class="yv-input__suffix">
                    <slot name="suffix"></slot>

                    <Icon @click="clearValue" v-if="showClear" icon="circle-xmark" class="yv-input__clear" />

                </span>
            </div>
            <!-- 输入框后置内容，只对非 type="textarea" 有效 -->
            <div v-if="$slots.append" class="yv-input__append">
                <slot name="append"></slot>
            </div>
        </template>

        <!-- textarea形式 -->
        <template>
            <textarea class="yv-textarea__wrapper" :disabled="props.disabled" v-model="innerValue" @input="handleInput"
                @focus="handleFocus" @blur="handleBlur"></textarea>
        </template>

    </div>
</template>