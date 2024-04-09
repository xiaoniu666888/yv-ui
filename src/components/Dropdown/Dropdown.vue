<script setup lang="ts">
import { ref } from 'vue'
import Tooltip from '../Tooltip/Tooltip.vue';
import type { DropdownProps, DropdownEmits, MenuOption, DropdownInstance } from './types';
import type { TooltipInstance } from '../Tooltip/types';


const tooltipRef = ref<TooltipInstance | null>(null)
const props = defineProps<DropdownProps>()
const emits = defineEmits<DropdownEmits>()
const visableChange = (e: boolean) => {
    emits('visable-change', e)
}
const itemClick = (e: MenuOption) => {
    if (e.disabled) {
        return
    }
    emits('select', e)
    //   if (props.hideAfterClick) {
    //     tooltipRef.value?.hide()
    //   }
}
defineExpose<DropdownInstance>({
    show: () => tooltipRef.value?.show(),
    hide: () => tooltipRef.value?.hide()
})
</script>


<template>
    <div class="yv-dropdown">
        <Tooltip :trigger="trigger" :placement="placement" :popper-options="popperOptions" :open-delay="openDelay"
            :close-delay="closeDelay" :manual="manual" @visable-change="visableChange" ref="tooltipRef">
            <slot></slot>
            <template #content>
                <ul class="yv-dropdown__menu">
                    <template v-for="item in menuOptions" :key="item.key">
                        <li v-if="item.divided" class="divided-placeholder"></li>
                        <li class="yv-dropdown__item" @click="itemClick(item)" :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }

                            " :id="`dropdown-item-${item.key}`">
                            {{ item.label }}
                        </li>
                    </template>
                </ul>
            </template>
        </Tooltip>
    </div>
</template>


<style scoped></style>