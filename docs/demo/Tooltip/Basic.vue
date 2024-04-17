<script setup>
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import Button from '@/components/Button/Button.vue'
</script>
<template>
<div class="basic block">
  <Tooltip 
    content="hello tooltip"
  >
    <Button> 激活 Tooltip </Button>
  </Tooltip>
</div>
</template>