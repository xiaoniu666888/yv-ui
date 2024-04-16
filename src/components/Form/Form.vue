<script setup lang="ts">
import { provide } from 'vue'
import { formContextKey } from './types'

import type { FormProps, FormItemContext, FormContext } from './types'
defineOptions({
    name: 'YvFrom'
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
const validate = () => {
    console.log(fields)
}
provide(formContextKey, {
    ...props,
    addField,
    removeField
})

</script>


<template>
    <form class="yv-form">
        <slot />
    </form>
    <button @click="validate">Validate all</button>
</template>


<style scoped></style>