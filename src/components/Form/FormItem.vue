<script setup lang="ts">
import { inject, computed, reactive, provide } from 'vue';
import { formContextKey, formItemContextKey } from './types';
import { isNil } from 'lodash-es'
import Schema from 'async-validator'

import type { FormItemProps, FormValidateFailure, FormItemContext } from './types'
const props = defineProps<FormItemProps>()
const formContext = inject(formContextKey)

// 关于校验的信息
const validateStatus = reactive({
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

// 传递rules
const itemRlues = computed(() => {
    const rules = formContext?.rules
    if (rules && props.prop && rules[props.prop]) {
        return rules[props.prop]
    } else {
        return []
    }
})

// 借助第三方库完成校验
const validate = () => {
    const modelName = props.prop
    if (modelName) {
        const validator = new Schema({
            [modelName]: itemRlues.value
        })
        validateStatus.loading = true
        validator.validate({ [modelName]: innerValue.value })
            .then(() => {
                validateStatus.state = 'success'
            })
            .catch((err: FormValidateFailure) => {
                const { errors } = err
                validateStatus.state = 'error'
                validateStatus.errorMsg = (errors && errors.length > 0) ? errors[0].message || '' : ''

            }).finally(() => {
                validateStatus.loading = false
            })
    }
}

const context: FormItemContext = {
    validate
}
provide(formItemContextKey, context)
</script>


<template>
    <div class="yv-form-item" :class="{
        'is-error': validateStatus.state === 'error',
        'is-success': validateStatus.state === 'success',
        'is-loading': validateStatus.loading
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
        <button @click.prevent="validate">Validate</button>
    </div>

</template>