<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { IconProps } from './types'
import { omit } from 'lodash-es'
import { computed } from 'vue';
defineOptions({
    name: 'YvIcon',
    inheritAttrs: false
})
const props = defineProps<IconProps>()
const filterProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
    return props.color ? { color: props.color } : {}
})
</script>

<template>
    <i class="yv-icon" :class="{ [`yv-icon--${type}`]: type }" :style="customStyles" v-bind="$attrs">
        <font-awesome-icon v-bind="filterProps" />
    </i>
</template>