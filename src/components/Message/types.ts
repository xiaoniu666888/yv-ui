import type { VNode } from 'vue'
export interface MessageProps {
  message?: string | VNode
  type?: string
  icon?: string
  duration?: number
  showClose?: boolean
}
