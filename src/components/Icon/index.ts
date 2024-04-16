import type { App } from 'vue'
import Icon from '@/components/Icon/Icon.vue'

Icon.install = (app: App) => {
  app.component(Icon.name!, Icon)
}

export default Icon

export * from './types'
