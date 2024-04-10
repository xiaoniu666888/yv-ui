import { Fragment, computed, defineComponent, ref } from 'vue';
import type { PropType } from 'vue'
import type { Placement, Options } from '@popperjs/core'
import type { MenuOption } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types';

export default defineComponent({
  name: 'YVDropdown',
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover'
    },
    transition: {
      type: String,
      default: 'fade'
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0,
    },
    popperOptions: {
      type: Object as PropType<Options>,
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true
    },
    afterClickItem: {
      type: Boolean,
      default: true
    },
    manual: {
      type: Boolean
    }
  },
  emits: ['visible-change', 'select'],
  setup(props,{ slots,emit,expose }){
    // 可以拿到tooltip实例
    const tooltipRef = ref<TooltipInstance | null>(null)
    // 点击菜单某一项
    const itemClick = (item:MenuOption)=>{
        if(item.disabled) {
              return
        }
        emit('select',item)
        if(props.afterClickItem) {
            tooltipRef.value?.hide()
        }
    }
    const visibleChange = (e: boolean) => {
        emit('visible-change', e)
    }
    // 菜单列表
    const option = computed(()=>{
        return props.menuOptions.map(item=>{
            return (
            <Fragment key={item.key}>

                { item.divided ? <li role="separator" class="divided-placeholder"/> : '' }
                {
                
                <li class={{"yv-dropdown__item":true,'is-disabled':item.disabled,'is-divided':item.divided}} 
                onClick={() => itemClick(item)} 
                id={`dropdown-item-${item.key}`}
                >
                    { item.label }
                </li> 
                }
            </Fragment>
            )
        })
    })
    // 暴露方法
    expose({
         // 通过闭包的形式，直接赋值会拿收不到对应的节点,因为是在setup函数中，此时实例还未被挂载
        show: ()=> tooltipRef.value?.show(),
        hide:()=> tooltipRef.value?.hide()
    })
    return ()=>(
        <div class="yv-dropdown">
                <Tooltip
                trigger={props.trigger}
                placement={props.placement}
                popperOptions={props.popperOptions}
                manual={props.manual}
                openDelay={props.openDelay}
                closeDelay={props.closeDelay}
                onVisible-change={visibleChange}
                ref={tooltipRef}
                >
                    {{ default:()=> slots.default && slots.default(),

                        content:()=>(
                            <ul class="yv-dropdown__menu">
                                {option.value}
                            </ul>
                        )
                    }}
            </Tooltip>
        </div>
    )
  }
})