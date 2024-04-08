import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Icon from '../../Icon/Icon.vue'
describe('Button.vue', () => {
  // primary
  test('primary button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button'
      }
    })
    console.log(wrapper.html())
    expect(wrapper.classes()).toContain('yv-button--primary')
    // slot
    expect(wrapper.get('button').text()).toBe('button')

    // events
    wrapper.get('button').trigger('click')
    console.log('emitted=>', wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  // disabled
  test('disabled button', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'default_button'
      }
    })
    // 获取属性
    expect(wrapper.attributes('disabled')).toBeDefined()
    // 获取原生DOM节点再获取属性
    expect(wrapper.find('button').element.disabled)
    expect(wrapper.get('button').text()).toBe('default_button')
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('cilck')
  })

  // icon
  test('icon button', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'icon'
      },
      global: {
        stubs: ['FontAwesomeIcon']
      }
    })
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })

  // loading
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
  })
})
