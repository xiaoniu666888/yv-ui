<script setup lang="ts">
import { inject, computed, reactive, provide, onMounted, onUnmounted } from 'vue';
import { formContextKey, formItemContextKey } from './types';
import { isNil } from 'lodash-es'
import Schema from 'async-validator'

import type { FormItemProps, FormValidateFailure, FormItemContext, ValidateStatusProp, FormItemInstance } from './types'
const props = defineProps<FormItemProps>()
const formContext = inject(formContextKey)

// 关于校验的信息
const validateStatus: ValidateStatusProp = reactive({
    state: 'init',
    errorMsg: '',
    loading: false
})
// 传递model
const innerValue = computed(() => {
    const model = formContext?.model
    if (model && props.prop && !isNil(model[props.prop])) {
        return model[props.prop]
    } else {
        return null
    }
})

let initialValue: any = null

// 传递rules
const itemRlues = computed(() => {
    const rules = formContext?.rules
    if (rules && props.prop && rules[props.prop]) {
        return rules[props.prop]
    } else {
        return []
    }
})
// 是否为必填项
const isRequired = computed(() => {
    return itemRlues.value?.some(rule => rule.required)
})
const getTriggeredRules = (trigger?: string) => {
    const rules = itemRlues.value
    if (rules) {
        return rules.filter(rule => {
            if (!rule.trigger || !trigger) return true

            return rule.trigger && rule.trigger === trigger
        })
    } else {
        return []
    }
}
// 借助第三方库完成校验
const validate = async (trigger?: string) => {
    const modelName = props.prop
    const triggeredRules = getTriggeredRules(trigger)
    if (triggeredRules.length === 0) {
        return true
    }
    if (modelName) {
        const validator = new Schema({
            [modelName]: triggeredRules
        })
        validateStatus.loading = true
        return validator.validate({ [modelName]: innerValue.value })
            .then(() => {
                validateStatus.state = 'success'
            })
            .catch((err: FormValidateFailure) => {
                const { errors } = err
                validateStatus.state = 'error'
                validateStatus.errorMsg = (errors && errors.length > 0) ? errors[0].message || '' : ''
                return Promise.reject(err)

            }).finally(() => {
                validateStatus.loading = false
            })
    }
}
// clear validate
const clearValidate = () => {
    validateStatus.state = 'init'
    validateStatus.errorMsg = ''
    validateStatus.loading = false
}

const resetField = () => {
    const model = formContext?.model
    clearValidate()
    if (model && props.prop && model[props.prop]) {
        model[props.prop] = initialValue
    }
}

const context: FormItemContext = {
    validate,
    prop: props.prop || '',
    clearValidate,
    resetField
}
provide(formItemContextKey, context)

onMounted(() => {
    if (props.prop) {
        formContext?.addField(context)
        initialValue = innerValue.value
    }
})

onUnmounted(() => {
    formContext?.removeField(context)
})
defineExpose<FormItemInstance>({
    validateStatus,
    validate,
    resetField,
    clearValidate
})
</script>


<template>
    <div class="yv-form-item" :class="{
        'is-error': validateStatus.state === 'error',
        'is-success': validateStatus.state === 'success',
        'is-loading': validateStatus.loading,
        'is-required': isRequired
    }">
        <label class="yv-form-item__label">
            <slot name="label" :label="label">
                {{ label }}</slot>
        </label>
        <div class="yv-form-item__content">
            <slot :validate="validate"></slot>
            <div v-if="validateStatus.state === 'error'" class="yv-form-item__error-msg">
                {{ validateStatus.errorMsg }}
            </div>
        </div>
    </div>
</template>