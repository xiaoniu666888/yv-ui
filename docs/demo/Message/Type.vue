<script setup>
import { YvMessage } from '@/components/Message/create'
import Button from '@/components/Button/Button.vue'
const open = (type) => {
  YvMessage({ message: 'hello world', type })
}
</script>
<template>
  <div class="basic block">
    <Button @click="open('success')"> Success </Button>
    <Button @click="open('info')"> Info </Button>
    <Button @click="open('warning')"> warning </Button>
    <Button @click="open('danger')"> Danger </Button>
  </div>
</template>
