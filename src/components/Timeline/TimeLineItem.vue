<script setup lang="ts">
import { defineOptions, withDefaults, defineProps } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { TimelineItemProps } from './types'
defineOptions({
  name: 'YvTimelineItem'
})

withDefaults(defineProps<TimelineItemProps>(), {
  timestamp: '',
  hideTimestamp: false,
  center: false,
  placement: 'bottom',
  size: 'normal',
  hollow: false
})
</script>

<template>
  <li class="yv-timeline-item" :class="{ 'yv-timeline-item-center': center }">
    <div class="yv-timeline-item-tail"></div>
    <div
      v-if="!$slots.dot"
      class="yv-timeline-item-node"
      :class="{
        [`yv-timeline-item-node--${size}`]: size,
        [`yv-timeline-item-node--${type}`]: type,
        ['yv-timeline-item-node--hollow']: hollow
      }"
      :style="{
        backgroundColor: color
      }"
    >
      <!-- 时间轴节点icon -->
      <Icon v-if="icon" class="yv-timeline-item-icon" :icon="icon"></Icon>
    </div>
    <!-- 时间轴节点内容 -->
    <div v-if="$slots.dot" class="yv-timeline-dot">
      <slot name="dot" />
    </div>
    <!-- 时间轴内容 -->
    <div class="yv-timeline-item-wrapper">
      <!-- 时间上 -->
      <div
        v-if="!hideTimestamp && placement === 'top'"
        class="yv-timeline-item-timestamp yv-timeline-item-timestamp-top"
      >
        {{ timestamp }}
      </div>
      <!-- 文本内容 -->
      <div class="yv-timeline-item-content">
        <slot />
      </div>
      <!-- 时间下-->
      <div
        v-if="!hideTimestamp && placement === 'bottom'"
        class="yv-timeline-item-timestamp yv-timeline-item-timestamp-bottom"
      >
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>
