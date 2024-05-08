import type { InjectionKey } from 'vue'
import type {
  RuleItem,
  ValidateError,
  ValidateFieldsError
} from 'async-validator'

export interface FormItemRule extends RuleItem {
  trigger?: string
}

export type FormRules = Record<string, FormItemRule[]>

export interface FormProps {
  model?: Record<string, any>
  rules?: FormRules
}

export interface FormItemProps {
  label?: string
  prop?: string
}
// 传递给Form-Item
export interface FormContext extends FormProps {
  addField: (filed: FormItemContext) => void
  removeField: (filed: FormItemContext) => void
}
// 传递给单个表单元素
export interface FormItemContext {
  prop: string
  validate: (trigger?: string) => Promise<any>
  resetField: (props?: string[]) => void
  clearValidate: (props?: string[]) => void
}

// 表单验证失败
export interface FormValidateFailure {
  // 验证失败的信息
  errors: ValidateError[] | null
  // 表示哪些表单字段验证失败以及每个字段的具体验证错误
  fields: ValidateFieldsError
}
// Form实例
export interface FormInstance {
  validate: () => Promise<any>
  resetFields: (props?: string[]) => void
  clearValidates: (props?: string[]) => void
}

export interface ValidateStatusProp {
  state: 'init' | 'success' | 'error'
  errorMsg: string
  loading: boolean
}
// FormItem实例
export interface FormItemInstance {
  validateStatus: ValidateStatusProp
  validate: (trigger?: string) => Promise<any>
  resetField: (props?: string[]) => void
  clearValidate: (props?: string[]) => void
}

export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey')

export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol('formItemContextKey')
