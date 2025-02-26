import type { App } from 'vue'
import Timeline from '@/components/Timeline/TimeLine.vue'
import TimelineItem from '@/components/Timeline/TimeLineItem.vue'
Timeline.install = (app: App) => {
  app.component(Timeline.name!, Timeline)
}
TimelineItem.install = (app: App) => {
  app.component(TimelineItem.name!, TimelineItem)
}
export default Timeline
export { TimelineItem }
export * from './types'
