<script setup>
import { h, ref } from 'vue'
import Dropdown from '@/components/Dropdown/Dropdown.vue'
import Button from '@/components/Button/Button.vue'
const options = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]
const tooltipRef = ref()
const open = () => {
  tooltipRef.value?.show()
}
const close = () => {
  tooltipRef.value?.hide()
}
</script>
<template>
<div class="basic block">
  <Dropdown 
    placement="bottom" 
    :menu-options="options"
    trigger="click"
    manual
    ref="tooltipRef"
  >
    <Button> 菜单容器 </Button>
  </Dropdown>
  <br/><br/>
  <Button type="primary" @click="open"> 点击手动触发显示 </Button>
  <Button type="danger" @click="close"> 点击手动触发隐藏 </Button>
</div>
</template>