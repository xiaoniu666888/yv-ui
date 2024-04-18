<script setup lang="ts">
import { ref } from 'vue';
import Button from './components/Button/Button.vue'
import type { ButtonInstance } from './components/Button/types.ts'

const buttonRef = ref < ButtonInstance | null > (null)

const testRef = () => {
    if (buttonRef.value) {
        console.log('buttonRef', buttonRef.value.ref)
    }
} 
</script>



<template>
    <Button ref="buttonRef" @click="testRef">Test Button</Button>
</template>
