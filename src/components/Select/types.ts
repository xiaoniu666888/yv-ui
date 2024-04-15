import type { VNode } from 'vue'

export type RenderLabelFunc = (option: SelectOption) => VNode
export type CustomFilterFunc = (value: string) => SelectOption[]
export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOption[]>
export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectsProps {
  // v-model
  modelValue: string
  // 选项
  options?: SelectOption[]
  //   表单属性
  placeholder: string
  disabled?: boolean
  clearable?: boolean
  // 自定义渲染节点
  renderLabel?: RenderLabelFunc
  filterable?: boolean
  filterMethod?: CustomFilterFunc
  // 是否开启远程搜索
  remote?: boolean
  remoteMethod?: CustomFilterRemoteFunc
}

export interface SelectState {
  inputValue: string
  selectedOption: null | SelectOption
  mouseHover: boolean
  loading: boolean
}

export interface SelectEmits {
  (e: 'change', value: string): void
  (e: 'update:modelValue', value: string): void
  (e: 'visible-change', value: boolean): void
  (e: 'clear'): void
}
