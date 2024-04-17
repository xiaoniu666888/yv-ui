<script setup>
import { YvMessage } from '@/components/Message/create'
import Button from '@/components/Button/Button.vue'
const open = () => {
  YvMessage({ message: 'hello world', showClose: true, duration: 0 })
}
</script>
<template>
  <div class="basic block">
    <Button @click="open"> 可关闭消息 </Button>
  </div>
</template>
