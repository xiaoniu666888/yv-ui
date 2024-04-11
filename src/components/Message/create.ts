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
    id,
    useDestory: destoryMesssage,
    ...props
  }
  const vnode = h(Message, newProps)
  //   console.log('vnode', vnode)
  render(vnode, container)

  //   ! => 非空判断言符
  document.body.appendChild(container.firstElementChild!)
  const vm = vnode.component!
  const instance = {
    id,
    vnode,
    props: newProps,
    vm
  }
  instances.push(instance)

  return instance
}

export const getLastInstance = () => {
  return instances.at(-1)
}

// 获取上一个实例的offset
export const getLastBottomOffset = (id: string) => {
  const index = instances.findIndex((instance) => instance.id === id)
  // 如果 index <= 0 说明是第一项
  if (index <= 0) {
    return 0
  } else {
    const prev = instances[index - 1]
    // 拿到上一项的bottomOffset
    console.log(prev)
    return prev.vm.exposed!.bottomOffset.value
  }
}
