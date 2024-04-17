<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { reactive, ref } from 'vue'
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import Button from '@/components/Button/Button.vue'
const model = reactive({
  email: '',
  password: '',
  confirmPwd: ''
})
const rules = {
  // name: [{ type: 'string', required: true, trigger: 'blur' }, { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },],
  email: [{ type: 'email', required: true, trigger: 'blur' }],
  password: [{ type: 'string', required: true, trigger: 'blur' }, { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' } ],
  confirmPwd: [{ type: 'string', required: true, trigger: 'blur' }, {  validator: (rule, value) => value === model.password, trigger: 'blur', message: '两个密码必须一致' } ],
}
const formRef = ref()
const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('passed!')
  } catch(e) {
    console.log('the promise', e)
  }
}
const reset = () => {
  formRef.value.resetFields()
}
</script>

<template>
<div>
  <Form :model="model" :rules="rules" ref="formRef">
    <!-- <FormItem prop="name" label="enter your name" #default="{ validate }">
      <input v-model="model.name" @blur="validate('blur')" @input="validate('input')"/>
    </FormItem> -->
    <FormItem prop="email" label="the email">
      <Input v-model="model.email" />
    </FormItem>
    <FormItem prop="password" label="the password">
      <Input v-model="model.password" type="password" />
    </FormItem>
    <FormItem prop="confirmPwd" label="confirm password">
      <Input v-model="model.confirmPwd" type="password" />
    </FormItem>
    <FormItem>
      <Button @click.prevent="submit" type="primary">Submit</Button>
      <Button @click.prevent="reset">Reset</Button>
    </FormItem>
  </Form>

  <p>
    form value:
    <pre>{{model}}</pre>
  </p>
</div>
</template>

<style>

</style>
