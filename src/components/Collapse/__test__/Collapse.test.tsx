import Collapse from '../Collapse.vue'
import CollapseItem from '../CollapseItem.vue'

import { test, describe, expect } from 'vitest'
import { mount } from '@vue/test-utils'

describe('Collaspe.vue', () => {
  test('basic collapse', () => {
    const colElWrapper = mount(Collapse, {
      props: {
        'modelValue': ['a']
      },
      slots: {
        default: 
        (<>
          <CollapseItem name="a" title="title a">
            content a
          </CollapseItem>
          <CollapseItem name="b" title="title b">
            content b
          </CollapseItem>
          <CollapseItem name="c" title="title c" disabled>
            content c
          </CollapseItem>
        </>)
      },
      global: {
        stubs: ['Icon']
      }
    })
    console.log(colElWrapper.html())
    const CollapseItemEl  =  colElWrapper.findComponent(CollapseItem)
    expect(CollapseItemEl.exists()).toBeTruthy()
  })
})
