import type { VNode } from 'vue'
export interface MessageProps {
  message?: string | VNode
  type?: string
  icon?: string
  duration?: number
  showClose?: boolean
  useDestory: () => void
}

export interface MesssageContext {
  id: string
  vnode: VNode
  props: MessageProps
}

export type CreateMessageProps = Omit<MessageProps, 'useDestory'>
