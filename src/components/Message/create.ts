import { render, h } from 'vue'
import Message from './Message.vue'

import type { CreateMessageProps, MesssageContext } from './types'

let seed = 1
// 存储当前创建的实例
const instances: MesssageContext[] = []

export function YvMessage(props: CreateMessageProps) {
  const id = `message_${seed++}`
  const container = document.createElement('div')
  // 卸载组件
  const destoryMesssage = () => {
    const index = instances.findIndex((instance) => instance.id === id)
    if (index === -1) return
    instances.splice(index, 1)
    render(null, container)
  }
  const newProps = {
    useDestory: destoryMesssage,
    ...props
  }
  const vnode = h(Message, newProps)
  render(vnode, container)

  //   ! => 非空判断言符
  document.body.appendChild(container.firstElementChild!)

  const instance = {
    id,
    vnode,
    props: newProps
  }
  instances.push(instance)

  return instance
}

export const getLastInstance = () => {
  return instances.at(-1)
}
