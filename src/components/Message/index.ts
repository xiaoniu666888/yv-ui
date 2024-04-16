import type { App } from 'vue'
import Message from '@/components/Message/Message.vue'
import { YvMessage, closeAll } from '@/components/Message/create'
Message.install = (app: App) => {
  app.component(Message.name!, Message)
}

export default Message
export { YvMessage, closeAll }
export * from './types'
