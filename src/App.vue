<script setup lang="ts">
import Button from './components/Button/Button.vue'
import { ref, onMounted } from 'vue';
import type { ButtonInstance } from './components/Button/types';
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';

const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref)
  }

  setTimeout(() => {
    openValue.value.push('b')
  }, 2000);
})
const handleClick = () => {
  console.log("button")
  alert("button")
}
const openValue = ref(['a'])
</script>

<template>
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
