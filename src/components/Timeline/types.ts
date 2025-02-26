import TimelineItem from './TimeLineItem.vue'

type TimelineItemType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export interface TimelineItemProps {
  // 时间戳
  timestamp?: string
  // 是否隐藏时间戳
  hideTimestamp?: boolean
  // 是否垂直居中
  center?: boolean
  // 时间戳位置
  placement?: 'top' | 'bottom'
  // 节点类型
  type?: TimelineItemType | string
  // 节点颜色
  color?: string
  // 节点大小
  size?: 'normal' | 'large' | string
  // 图标
  icon?: string
  // 是否为空心圆点
  hollow?: boolean
}

export type TimelineItemInstance = InstanceType<typeof TimelineItem>
