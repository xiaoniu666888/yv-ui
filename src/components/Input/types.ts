export interface InputProps {
  type: string
  modelValue: string
  size?: 'large' | 'small'
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
}

export interface InputEmits {
  (e: 'update:modelValue', value: string): void
}
