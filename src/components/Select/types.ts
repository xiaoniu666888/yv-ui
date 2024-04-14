export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectsProps {
  // v-model
  modelValue: string
  // 选项
  options: SelectOption[]
  //   表单属性
  placeholder: string
  disabled?: boolean
  clearable?: boolean
}

export interface SelectState {
  inputValue: string
  selectedOption: null | SelectOption
  mouseHover: boolean
}

export interface SelectEmits {
  (e: 'change', value: string): void
  (e: 'update:modelValue', value: string): void
  (e: 'visible-change', value: boolean): void
  (e: 'clear'): void
}
