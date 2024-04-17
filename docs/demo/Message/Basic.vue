<script setup>
import { h } from 'vue'
import { YvMessage } from '@/components/Message/create'
import Button from '@/components/Button/Button.vue'
const open = () => {
  YvMessage({ message: 'hello world' })
}
const open2 = () => {
  YvMessage({ message: h('b', 'this is bold') })
}
</script>
<template>
  <div class="basic block">
    <Button type="primary" @click="open"> 创建一条消息 </Button>
    <Button @click="open2"> 创建支持 VNode 的消息 </Button>
  </div>
</template>
