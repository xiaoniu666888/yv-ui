import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Icon from '../../Icon/Icon.vue'
describe('Button.vue', () => {
  // primary
  // test('primary button', () => {
  //   const wrapper = mount(Button, {
  //     props: {
  //       type: 'primary'
  //     },
  //     slots: {
  //       default: 'primary button'
  //     }
  //   })
  //   console.log(wrapper.html())
  //   expect(wrapper.classes()).toContain('yv-button--primary')
  //   // slot
  //   expect(wrapper.get('button').text()).toBe('primary button')
  //   // events
  //   wrapper.get('button').trigger('click')
  //   console.log('emitted=>', wrapper.emitted())
  //   expect(wrapper.emitted()).toHaveProperty('click')
  // })
  // disabled
  // test('disabled button', () => {
  //   const wrapper = mount(Button, {
  //     props: {
  //       disabled: true
  //     },
  //     slots: {
  //       default: 'default_button'
  //     }
  //   })
  //   console.log(wrapper.html())
  //   // 测试时候是否具有 class 类名
  //   expect(wrapper.classes()).toContain('is-disabled')
  //   //  测试属性disabled被添加
  //   expect(wrapper.attributes('disabled')).toBeDefined()
  //   // 获取原生DOM节点之后再获取属性
  //   expect(wrapper.find('button').element.disabled).toBe(true)
  //   // 获取按钮中的文字
  //   expect(wrapper.get('button').text()).toBe('default_button')
  //   // 触发点击事件
  //   wrapper.get('button').trigger('click')
  //   expect(wrapper.emitted()).not.toHaveProperty('cilck')
  // })
  // // icon
  // test('icon button', () => {
  //   const wrapper = mount(Button, {
  //     props: {
  //       icon: 'arrow-up'
  //     },
  //     slots: {
  //       default: 'icon'
  //     },
  //     global: {
  //       // stubs   stubs 是用来替换组件测试中复杂或难以模拟的子组件的
  //       // FontAwesomeIcon 组件被指定为一个 stub。这意味着在测试中，任何 FontAwesomeIcon 组件的实例都会被替换为一个简单的、不包含实际逻辑或渲染的占位符组件。这有助于减少测试的复杂性，因为你不需要关注 FontAwesomeIcon 组件的具体实现细节，而只需要确保它正确地被渲染到了父组件中。
  //       stubs: ['FontAwesomeIcon']
  //     }
  //   })
  //   console.log(wrapper.html())
  //   // 找到  FontAwesomeIcon  组件
  //   const iconElement = wrapper.findComponent(FontAwesomeIcon)
  //   // 组件存在
  //   expect(iconElement.exists()).toBeTruthy()
  //   // 组件具有icon属性且为 arrow-up
  //   // expect(iconElement.attributes('icon')).toBeDefined()
  //   expect(iconElement.attributes('icon')).toBe('arrow-up')
  // })
  // // loading
  test('loading button', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      global: {
        stubs: ['Icon']
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').element.disabled).toBe(true)
    expect(wrapper.attributes('disabled'))
  })
})
