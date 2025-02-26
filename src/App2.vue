<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/Button/Button.vue'
import type { ButtonInstance } from './components/Button/types.ts'
// import TimeLine from './components/Timeline/timeline'\
import TimeLine from './components/Timeline/TimeLine.vue'
import TimeLineItem from './components/Timeline/TimeLineItem.vue'

const buttonRef = ref<ButtonInstance | null>(null)

const testRef = () => {
  if (buttonRef.value) {
    console.log('buttonRef', buttonRef.value.ref)
  }
}
const activities = [
  {
    content: 'Custom icon',
    timestamp: '2023-01-01 13:14',
    size: 'normal',
    type: 'primary',
    icon: 'arrow-down'
    // center: true
  },
  {
    content: 'Custom color',
    timestamp: '2023-01-01 13:14',
    color: '#0bbd87',
    icon: 'arrow-up'
  },
  {
    content: 'Custom size',
    timestamp: '2023-01-02 13:14',
    size: 'large',
    icon: 'star'
  },
  {
    content: 'Custom hollow',
    timestamp: '2023-01-03 13:14',
    type: 'danger',
    size: 'normal',
    icon: 'star'
  },
  {
    content: 'Default node',
    timestamp: '2023-01-04 13:14',
    icon: 'circle-user',
    hollow: false,
    type: 'primary'
    // center: true
  }
]
</script>

<template>
  <div class="app2">
    <Button ref="buttonRef" @click="testRef">Test Button</Button>
    <hr />
    <h2>不居中</h2>
    <TimeLine>
      <TimeLineItem
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :hollow="activity.hollow"
        :timestamp="activity.timestamp"
        placement="top"
      >
        {{ activity.content }}
      </TimeLineItem>
    </TimeLine>
    <hr />
    <h2>居中</h2>
    <TimeLine>
      <TimeLineItem
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :hollow="activity.hollow"
        :timestamp="activity.timestamp"
        placement="bottom"
        :center="true"
      >
        {{ activity.content }}
      </TimeLineItem>
    </TimeLine>
    <hr />
  </div>
</template>
<style>
.app2 {
  h2 {
    text-align: center;
  }
}
</style>
