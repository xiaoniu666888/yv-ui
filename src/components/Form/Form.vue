<script setup lang="ts">
import { provide } from 'vue'
import { formContextKey } from './types'

import type { FormProps } from './types'

const props = defineProps<FormProps>()
defineOptions({
    name: 'YvFrom'
})
provide(formContextKey, props)

</script>


<template>
    <form class="yv-form">
        <slot />
    </form>
</template>


<style scoped></style>