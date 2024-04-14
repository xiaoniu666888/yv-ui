<script setup lang="ts">
import { ref, watch, computed, useAttrs, nextTick } from 'vue';
import Icon from '../Icon/Icon.vue'
import type { InputProps, InputEmits } from './types'
import type { Ref } from 'vue';

defineOptions({
    name: 'YvInput',
    inheritAttrs: false
})
const props = withDefaults(defineProps<InputProps>(), { type: 'text', autocomplete: 'off' })
const emits = defineEmits<InputEmits>()
const attrs = useAttrs()
const innerValue = ref(props.modelValue)
const isFocus = ref(false)
const passwordVisible = ref(false)
const inputRef = ref() as Ref<HTMLInputElement>


// 展示清除图标
const showClear = computed(() => props.clearable && !props.disabled && !!innerValue.value && isFocus.value)
// 当输入框为密码框时
const showPasswordArea = computed(() => props.showPassword && !props.disabled && !!innerValue.value)

const togglePasswordVislble = () => {
    passwordVisible.value = !passwordVisible.value
}
const NOOP = () => { }

const keepFocus = async () => {
    await nextTick()
    inputRef.value.focus()
}

const handleInput = () => {
    // console.log('input')
    emits('update:modelValue', innerValue.value)
    emits('input', innerValue.value)
}

const handleChange = () => {
    // console.log('change')
    emits('change', innerValue.value)
}

const handleFocus = (event: FocusEvent) => {
    isFocus.value = true
    emits('focus', event)
    // console.log('focus')
}
const handleBlur = (event: FocusEvent) => {
    isFocus.value = false
    emits('blur', event)
    // console.log('blur')
}
const clearValue = () => {
    innerValue.value = ''
    // console.log('clear')
    emits('update:modelValue', '')
    emits('clear')
    emits('input', '')
    emits('change', '')
}


watch(() => props.modelValue, (newVal) => {
    innerValue.value = newVal
})
defineExpose({
    ref: inputRef
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
            <!-- 输入框 -->
            <div class="yv-input__wrapper">
                <!-- 输入框头部内容，只对非 type="textarea" 有效 -->
                <span v-if="$slots.prefix" class="yv-input__prefix">
                    <slot name="prefix"></slot>
                </span>

                <input ref="inputRef" v-bind="attrs" class="yv-input__inner"
                    :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" :disabled="disabled"
                    :readonly="readonly" :autocomplete="autocomplete" :placeholder="placeholder" :autofocus="autofocus"
                    :form="form" v-model="innerValue" @input="handleInput" @change="handleChange" @focus="handleFocus"
                    @blur="handleBlur" />

                <!-- 输入框尾部内容，只对非 type="textarea" 有效 -->
                <span v-if="$slots.suffix || showClear || showPasswordArea" class="yv-input__suffix" @click="keepFocus">
                    <slot name="suffix"></slot>

                    <Icon @click="clearValue" v-if="showClear" icon="circle-xmark" class="yv-input__clear"
                        @mousedown.prevent="NOOP" />

                    <Icon v-if="showPasswordArea && passwordVisible" icon="eye" @click="togglePasswordVislble"
                        class="yv-input__password" />

                    <Icon v-if="showPasswordArea && !passwordVisible" icon="eye-slash" @click="togglePasswordVislble"
                        class="yv-input__password" />
                </span>
            </div>
            <!-- 输入框后置内容，只对非 type="textarea" 有效 -->
            <div v-if="$slots.append" class="yv-input__append">
                <slot name="append"></slot>
            </div>
        </template>

        <!-- textarea形式 -->
        <template>
            <textarea ref="inputRef" v-bind="attrs" class="yv-textarea__wrapper" :disabled="disabled"
                :readonly="readonly" :autocomplete="autocomplete" :placeholder="placeholder" :autofocus="autofocus"
                :form="form" v-model="innerValue" @input="handleInput" @change="handleChange" @focus="handleFocus"
                @blur="handleBlur" />
        </template>

    </div>
</template>