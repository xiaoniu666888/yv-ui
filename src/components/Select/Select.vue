<script setup lang="ts">
import { ref } from 'vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import Input from '../Input/Input.vue';


import type { SelectsProps, SelectEmits, SelectOption } from './types'


const props = defineProps<SelectsProps>()
const emits = defineEmits<SelectEmits>()
const innerValue = ref('')
</script>


<template>
    <div class="yv-select" :class="{
        'is-disabled': disabled

    }">
        <Tooltip placement="bottom-start" manual>
            <Input v-model="innerValue" :disabled="disabled" :placeholder="placeholder" />
            <template #content>
                <ul class="yv-select__menu">
                    <template v-for="(item, index) in options" :key="index">
                        <li class="yv-select__menu-item" :class="{ 'is-disabled': item.disabled }"
                            :id="`select-item-${item.value}`">
                            {{ item.label }}
                        </li>
                    </template>
                </ul>
            </template>
        </Tooltip>
    </div>
</template>


<style scoped></style>