import type { VNode, ComponentInternalInstance } from 'vue'
export interface MessageProps {
  message?: string | VNode
  type?: string
  icon?: string
  duration?: number
  showClose?: boolean
  offset?: number
  useDestory: () => void
  id: string
}

export interface MesssageContext {
  id: string
  vnode: VNode
  props: MessageProps
  vm: ComponentInternalInstance
}

export type CreateMessageProps = Omit<MessageProps, 'useDestory' | 'id'>
