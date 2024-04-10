import type { Placement, Options } from '@popperjs/core'

export interface TooltipProps {
  // 显示内容
  content?: string
  //   触发方式
  trigger?: 'hover' | 'click'
  // 显示方式
  placement?: Placement
  manual?: boolean
  // 丰富popper配置项
  popperOptions?: Partial<Options>
  // 设置动画
  transition?: string
  // 打开和延迟时间
  openDelay?: number
  closeDelay?: number
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void
}

// 让用户可以手动打开或关闭弹框
export interface TooltipInstance {
  show: () => void
  hide: () => void
}
