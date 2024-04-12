import type { VNode, ComponentInternalInstance } from 'vue'
export interface MessageProps {
  message?: string | VNode
  type?: string
  icon?: string
  duration?: number
  showClose?: boolean
  offset?: number
  // 添加z-index
  zIndex: number
  useDestroy: () => void
  id: string
  transitionName?: string
}

export interface MesssageContext {
  id: string
  vnode: VNode
  props: MessageProps
  vm: ComponentInternalInstance
  destroy: () => void
}

export type CreateMessageProps = Omit<
  MessageProps,
  'useDestroy' | 'id' | 'zIndex'
>
