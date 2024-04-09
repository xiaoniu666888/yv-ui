import type { Placement } from '@popperjs/core'

export interface TooltipProps {
  // 显示内容
  content?: string
  //   触发方式
  trigger?: 'hover' | 'click'
  // 显示方式
  placement?: Placement
  manual?: boolean
}

export interface TooltipEmits {
  (e: 'visable-change', value: boolean): void
}

// 让用户可以手动打开或关闭弹框
export interface TooltipInstance {
  show: () => void
  hide: () => void
}