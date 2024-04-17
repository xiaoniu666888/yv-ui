<script setup>
import { YvMessage, closeAll } from '@/components/Message/create'
import Button from '@/components/Button/Button.vue'
const open = () => {
  YvMessage({ message: 'hello world1', duration: 0 })
  YvMessage({ message: 'hello world2', duration: 0 })
  YvMessage({ message: 'hello world3', duration: 0 })
}
const close = () => {
  closeAll()
}
</script>
<template>
  <div class="basic block">
    <Button @click="open"> 创建三条消息 </Button>
    <Button @click="close"> 全部关闭 </Button>
  </div>
</template>
