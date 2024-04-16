<script setup lang="ts">
import { provide } from 'vue'
import { formContextKey } from './types'


import type { FormProps, FormItemContext, FormContext, FormValidateFailure, FormInstance } from './types'
import type { ValidateFieldsError } from 'async-validator'
defineOptions({
    name: 'YvForm'
})
const props = defineProps<FormProps>()
const fields: FormItemContext[] = []
const addField: FormContext['addField'] = (field) => {
    fields.push(field)
}

const removeField: FormContext['removeField'] = (field) => {
    if (field.prop) {
        fields.splice(fields.indexOf(field), 1)
    }
}

const resetFields = (keys: string[] = []) => {
    const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
    filterArr.forEach(field => field.resetField())
}

const clearValidates = (keys: string[] = []) => {
    const filterArr = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields
    filterArr.forEach(field => field.clearValidate())
}

const validate = async () => {
    let validationErrors: ValidateFieldsError = {}
    // console.log(fields)
    for (const field of fields) {
        try {
            await field.validate('')
        } catch (err) {
            const error = err as FormValidateFailure
            validationErrors = {
                ...validationErrors,
                ...error.fields
            }
        }
    }
    if (Object.keys(validationErrors).length === 0) return true

    return Promise.reject(validationErrors)
}
provide(formContextKey, {
    ...props,
    addField,
    removeField
})
defineExpose<FormInstance>({
    validate,
    resetFields,
    clearValidates
})
</script>


<template>
    <form class="yv-form">
        <slot />
    </form>
    <button @click="validate">Validate all</button>
</template>
