import { render, h, shallowReactive } from 'vue'
import Message from './Message.vue'
import useZIndex from '@/hooks/useMessageZIndex'

import type { CreateMessageProps, MesssageContext } from './types'

let seed = 1
// 存储当前创建的实例,并且使用shallowReactive做浅层监听
const instances: MesssageContext[] = shallowReactive([])

export function YvMessage(props: CreateMessageProps) {
  const { nextZIndex } = useZIndex()
  const id = `message_${seed++}`
  const container = document.createElement('div')
  // 卸载组件
  const destoryMesssage = () => {
    // 从实例数组中删除
    const index = instances.findIndex((instance) => instance.id === id)
    if (index === -1) return
    instances.splice(index, 1)
    render(null, container)
  }

  //  手动调用删除, 也就是手动调整组件中的visible值
  //  visible 是通过expose传出来的
  const manualDistory = () => {
    const instance = instances.find((instance) => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    useDestory: destoryMesssage
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
    vm,
    destory: manualDistory
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
  console.log('index', id, index, instances.length)
  // 如果 index <= 0 说明是第一项
  if (index <= 0) {
    return 0
  } else {
    const prev = instances[index - 1]
    // 拿到上一项的bottomOffset
    // console.log('prev=>', prev.vm)
    return prev.vm.exposed!.bottomOffset.value
  }
}
