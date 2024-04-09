import type { Placement } from '@popperjs/core'

export interface TooltipProps {
  // 显示内容
  content?: string
  //   触发方式
  trigger?: 'hover' | 'click'
  // 显示方式
  placement?: Placement
}

export interface TooltipEmits {
  (e: 'visable-change', value: boolean): void
}
