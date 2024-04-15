<script setup lang="ts">
import { ref, reactive, computed, nextTick, watch } from 'vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import Input from '../Input/Input.vue';
import Icon from '../Icon/Icon.vue';
import RenderVnode from '@/common/RenderVnode';

import type { SelectsProps, SelectEmits, SelectOption, SelectState } from './types'
import type { TooltipInstance } from '../Tooltip/types';
import type { Ref } from 'vue';
import type { InputInstance } from '../Input/types'
import { isFunction } from 'lodash-es';

const findOption = (value: string) => {
    const option = props.options.find(option => option.value === value)
    return option ? option : null
}
const props = defineProps<SelectsProps>()
const emits = defineEmits<SelectEmits>()
const initialOption = findOption(props.modelValue)
const tooltipRef = ref() as Ref<TooltipInstance>
const inputRef = ref() as Ref<InputInstance>
const selectState = reactive<SelectState>({
    inputValue: initialOption ? initialOption.label : '',
    selectedOption: initialOption,
    mouseHover: false
})
const isDropdownShow = ref(false)

// 展示清除图标
const showClearIcon = computed(() => {
    // 展示条件
    // 1. hover上去
    // 2. props.clearable为true
    // 3. 必须要有选择过选项
    // 4. Input的值不能为空
    return props.clearable && selectState.mouseHover && selectState.selectedOption && selectState.inputValue.trim() !== ''
})
// 点击清除图标
const onClear = () => {
    selectState.selectedOption = null
    selectState.inputValue = ''
    emits('change', '')
    emits('clear')
    emits('update:modelValue', '')
}
// 使选项宽度和选择框宽度相同
const popperOptions: any = {
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 9],
            },
        },
        {
            name: "sameWidth",
            enabled: true,
            fn: ({ state }: { state: any }) => {
                state.styles.popper.width = `${state.rects.reference.width}px`;
            },
            phase: "beforeWrite",
            requires: ["computeStyles"],
        }
    ],
}
// 可筛选
const filteredOptions = ref(props.options)
watch(() => props.options, (newVal) => {
    filteredOptions.value = newVal
})
// 定义用于筛选的函数
const generateFilterOptions = (searchValue: string) => {
    if (!props.filterable) return
    if (props.filterMethod && isFunction(props.filterMethod)) {
        filteredOptions.value = props.filterMethod(searchValue)
    } else {
        filteredOptions.value = props.options.filter(option => option.label.includes(searchValue))
    }
}

// 开始筛选，绑定到input事件
const onFilter = () => {
    generateFilterOptions(selectState.inputValue)
}
// 处理placeholder
const filteredPlaceHolder = computed(() => {
    return (props.filterable && selectState.selectedOption && isDropdownShow.value) ? selectState.selectedOption.label : props.placeholder
})
// 处理打开关闭
const controlDropdown = (show: boolean) => {
    if (show) {
        // filter模式
        // 之前选择过的值
        if (props.filterable && selectState.selectedOption) {
            selectState.inputValue = ''
        }
        if (props.filterable) {
            generateFilterOptions(selectState.inputValue)
        }
        tooltipRef.value.show()
    } else {
        tooltipRef.value.hide()
        if (props.filterable) {
            selectState.inputValue = selectState.selectedOption ? selectState.selectedOption.label : ''
        }
    }
    isDropdownShow.value = show
    emits('visible-change', show)
}

const toggleDropdown = () => {
    if (props.disabled) return
    if (isDropdownShow.value) {
        controlDropdown(false)
    } else {
        controlDropdown(true)
    }
}
const NOOP = () => { }
// 处理点击某个选择项
const optionSelect = async (e: SelectOption) => {
    if (e.disabled) return
    selectState.inputValue = e.label
    selectState.selectedOption = e
    emits('change', e.value)
    emits('update:modelValue', e.value)
    controlDropdown(false)
    // 不生效,改用阻止事件冒泡实现
    await nextTick()
    inputRef.value.ref.focus()
}

</script>


<template>
    <div class="yv-select" :class="{
        'is-disabled': disabled

    }" @click="toggleDropdown" @mouseenter="selectState.mouseHover = true"
        @mouseleave="selectState.mouseHover = false">

        <Tooltip ref="tooltipRef" placement="bottom-start" manual :popper-options="popperOptions"
            @click-outside="controlDropdown(false)">

            <Input ref="inputRef" v-model="selectState.inputValue" :disabled="disabled"
                :placeholder="filteredPlaceHolder" :readonly="!filterable || !isDropdownShow" @input="onFilter">

            <template #suffix>
                <!-- 清除图标 -->
                <Icon icon="circle-xmark" v-if="showClearIcon" class="yv-input__clear" @click="onClear"
                    @mousedown.prevent="NOOP">

                </Icon>

                <Icon v-else icon="angle-down" class="header-angle" :class="{ 'is-active': isDropdownShow }"></Icon>
            </template>
            </Input>
            <template #content>
                <ul class="yv-select__menu">
                    <template v-for="(item, index) in filteredOptions" :key="index">
                        <li class="yv-select__menu-item" :class="{
                            'is-disabled': item.disabled,
                            'is-selected': selectState.selectedOption?.value === item.value
                        }" :id="`select-item-${item.value}`" @click.stop="optionSelect(item)"
                            @mousedown.prevent="NOOP">
                            <RenderVnode :v-node="renderLabel ? renderLabel(item) : item.label" />
                        </li>
                    </template>
                </ul>
            </template>
        </Tooltip>
    </div>
</template>