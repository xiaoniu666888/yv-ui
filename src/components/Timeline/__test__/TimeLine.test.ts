import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import YvTimelineItem from '../TimelineItem.vue'
import Icon from '../../Icon/Icon.vue'

describe('时间轴条目组件测试', () => {
  test('应该渲染组件', () => {
    const wrapper = mount(YvTimelineItem)
    expect(wrapper.find('.yv-timeline-item')).toBeTruthy()
  })

  test('应该包含默认属性', () => {
    const wrapper = mount(YvTimelineItem)
    expect(wrapper.props('timestamp')).toEqual('')
    expect(wrapper.props('hideTimestamp')).toEqual(false)
    expect(wrapper.props('center')).toEqual(false)
    expect(wrapper.props('placement')).toEqual('bottom')
    expect(wrapper.props('size')).toEqual('normal')
    expect(wrapper.props('hollow')).toEqual(false)
  })

  test('当不隐藏时间戳且位置在顶部时应该显示时间戳', () => {
    const wrapper = mount(YvTimelineItem, {
      propsData: {
        timestamp: '测试时间',
        placement: 'top'
      }
    })
    expect(wrapper.find('.yv-timeline-item-timestamp-top').text()).toEqual(
      '测试时间'
    )
  })

  test('当不隐藏时间戳且位置在底部时应该显示时间戳', () => {
    const wrapper = mount(YvTimelineItem, {
      propsData: {
        timestamp: '测试时间',
        placement: 'bottom'
      }
    })
    expect(wrapper.find('.yv-timeline-item-timestamp-bottom').text()).toEqual(
      '测试时间'
    )
  })

  test('当提供dot插槽时应该渲染自定义内容', () => {
    const wrapper = mount(YvTimelineItem, {
      slots: {
        dot: '<div>测试圆点</div>'
      }
    })
    expect(wrapper.find('.yv-timeline-dot').html()).toContain(
      '<div>测试圆点</div>'
    )
  })

  test('当提供图标属性时应该显示图标', () => {
    const wrapper = mount(YvTimelineItem, {
      propsData: {
        icon: '测试图标'
      },
      global: {
        stubs: ['Icon']
      }
    })
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()

    expect(wrapper.find('.yv-timeline-item-icon')).toBeTruthy()
  })
})
