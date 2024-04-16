import type { App } from 'vue'
import Collapse from '@/components/Collapse/Collapse.vue'
import CollapseItem from '@/components/Collapse/CollapseItem.vue'
Collapse.install = (app: App) => {
  app.component(Collapse.name!, Collapse)
}
CollapseItem.install = (app: App) => {
  app.component(CollapseItem.name!, CollapseItem)
}
export default Collapse
export { CollapseItem }
export * from './types'
