<script setup lang="ts">
import Button from './components/Button/Button.vue'
import { ref, onMounted, h } from 'vue';
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icon/Icon.vue';
import Tooltip from './components/Tooltip/Tooltip.vue';
import Dropdown from './components/Dropdown/Dropdown.vue';
// import Message from './components/Message/Message.vue';
import { YvMessage } from './components/Message/create'
import Input from './components/Input/Input.vue';
import Select from './components/Select/Select.vue';



import type { ButtonInstance } from './components/Button/types';
import type { TooltipInstance } from './components/Tooltip/types';
import type { Options } from '@popperjs/core';
import type { MenuOption } from './components/Dropdown/types';
import Switch from './components/Switch/Switch.vue';
const buttonRef = ref<ButtonInstance | null>(null)
const toolTipRef = ref<TooltipInstance | null>(null)
const DropdownRef = ref<TooltipInstance | null>(null)
const options: Partial<Options> = { placement: 'top', strategy: 'fixed' }
onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref)
  }

  setTimeout(() => {
    openValue.value.push('b')
    // trigger.value = 'click'
    intance.destroy()
  }, 2000);
  YvMessage({
    type: 'info',
    message: 'createMessage1',
    duration: 0,
    showClose: true
  })
  YvMessage({
    type: 'danger',
    message: 'createMessage2',
    duration: 2000,
    showClose: true
  })
  YvMessage({
    type: 'warning',
    message: 'createMessage2',
    duration: 2000,
    showClose: true
  })
  const intance = YvMessage({
    type: 'success',
    message: 'createMessage3',
    duration: 0,
    showClose: true
  })

})
const handleClick = () => {
  console.log("button")
  alert("button")
}
const openValue = ref(['a'])
const trigger = ref<any>('hover')

const handleClickOpen = () => {
  toolTipRef.value?.show()
  DropdownRef.value?.show()
}
const handleClickClose = () => {
  toolTipRef.value?.hide()
  DropdownRef.value?.hide()
}

const optionsDrown: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]


const handleClickDrop = (e: any) => {
  console.log('handleClickDrop=>', e)
}
const handleClickVisible = (e: any) => {
  console.log("handleClickVisible=>", e)
}
const createMessage = () => {
  // console.log('666')
  // YvMessage({
  //   type: 'info',
  //   message: 'createMessage',
  //   duration: 0,
  //   showClose: true
  // })
}
const inputModel = ref('')

const switchValue = ref('')
const selectOptions = [
  { label: 'hello', value: '1' },
  { label: 'xyz', value: '2' },
  { label: 'testing', value: '3' },
  { label: 'check', value: '4', disabled: true }
]
const selectTest = ref('0')


const customRender = (option: any) => {
  return h('div', { className: 'xyz' }, [h('b', option.label), h('span', option.value)])
}
</script>

<template>
  <!-- <Message message="Hello Message" :duration="0" show-close /> -->
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
    </div>
  </header>

  <main>
    <div>
      <div class="button">
        <Button @click="handleClick()">default</Button>
        <Button type="primary">primary</Button>
        <Button type="success">success</Button>
        <Button type="danger">danger</Button>
        <Button type="warning">warning</Button>
        <Button type="info">info</Button>
      </div>
      <hr>
      <div class="button">
        <Button type="primary" plain>primary</Button>
        <Button type="success" plain>success</Button>
        <Button type="danger" plain>danger</Button>
        <Button type="warning" plain>warning</Button>
        <Button type="info" plain>info</Button>
      </div>
      <hr>
      <div class="button">
        <Button size="large">Large</Button>
        <Button size="small">Small</Button>
        <Button type="info" round> circle </Button>
        <Button type="success" circle>cilcle</Button>
      </div>
      <hr>
      <div class="button">
        <Button size="large" loading>Loading</Button>
        <Button size="large" icon="arrow-down">Icon</Button>
      </div>
    </div>
    <hr>
    <div class="collapse">

      <Collapse v-model="openValue" accordion>
        <CollapseItem name="a" title="Title A">
          <h1>headline title</h1>
          <div>this is content </div>
        </CollapseItem>

        <CollapseItem name="b" title="Title B">
          <div>this is content b</div>
        </CollapseItem>

        <CollapseItem name="c" title="Disabled Title" disabled>
          <div>this is content c</div>
        </CollapseItem>

      </Collapse>
      {{ openValue }}
    </div>
    <hr>
    <div class="icon">
      <Icon icon="user" type="warning" size="2xl" />
      <Icon icon="arrow-up" type="success" size="2xl" />
      <Icon icon="arrow-down" type="primary" size="2xl" />
      <Icon icon="arrow-left" type="danger" size="2xl" />
      <Icon icon="arrow-right" type="info" size="2xl" />
    </div>

    <hr>
    <h1>hover或click处理</h1>
    <Tooltip ref="toolTipRef" content="Tooltip" placement="right" :trigger="trigger" :open-delay="1000"
      :close-delay="1000">
      Tooltip
    </Tooltip>
    <hr>

    <h1>手动处理</h1>
    <Tooltip ref="toolTipRef" content="Tooltip" placement="top" :trigger="trigger" manual :popper-options="options">
      Tooltip
    </Tooltip>

    <hr>

    <Button size="small" @click="handleClickOpen()">open Tooltip</Button>
    <Button size="small" @click="handleClickClose()">close Tooltip</Button>

    <hr>



    <h1>点击</h1>
    <Dropdown :menu-options="optionsDrown" placement="bottom" trigger="click" @select="handleClickDrop"
      @visible-change="handleClickVisible" ref="DropdownRef">
      Tooltip
    </Dropdown>
    <hr>
    <Button @click="createMessage">createMessage</Button>
    <hr>
    <hr>
    <Input type="password" show-password v-model="inputModel" />
    {{ inputModel }}
    <!-- <Input type="text" clearable v-model="inputModel" placeholder="输入字符以后可以点击清空" /> -->

    <hr>

    <Switch v-model="switchValue" active-value="ture" inactive-value="false">
    </Switch>---
    <span>{{ switchValue }}</span>
    <hr>
    <Switch v-model="switchValue" size="large" active-text="on" inactive-text="off">
    </Switch>
    <hr>
    <!-- <Select v-model="selectTest" :options="selectOptions" clearable placeholder="请选择"></Select>
    {{ selectTest }} -->


    <hr>

    <Select filterable v-model="selectTest" :options="selectOptions" clearable placeholder="请选择"
      :render-label="customRender"></Select>
    {{ selectTest }}
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.button {
  width: 600px;
  display: flex;
  justify-content: space-around;
}
</style>
