import Collapse from '../Collapse.vue'
// import CollapseItem from '../CollapseItem.vue'

import { test, describe } from 'vitest'
import { mount } from '@vue/test-utils'

describe('Collaspe.vue', () => {
  test('basic collapse', () => {
    const colEl = mount(Collapse, {
      psops: {
        modelValue: ['a']
      },
      global: {
        stubs: ['CollapseItem']
      }
    })
    console.log(colEl.html())
  })
})
