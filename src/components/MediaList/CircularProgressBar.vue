<template>
  <div>
    <svg :width="`${size}vw`" :height="`${size}vw`">
      <!-- background -->
      <circle
        :r="`${radius}vw`"
        :cx="`${size / 2}vw`"
        :cy="`${size / 2}vw`"
        stroke="white"
        :stroke-width="`${strokeWidth}vw`"
        fill="none"
      />

      <!-- progress -->
      <circle
        :r="`${radius}vw`"
        :cx="`${size / 2}vw`"
        :cy="`${size / 2}vw`"
        :stroke="strokeColor"
        fill="none"
        :stroke-width="`${strokeWidth}vw`"
        :stroke-dasharray="`${circumference}vw`"
        :stroke-dashoffset="`${dashOffset}vw`"
        transform="rotate(-90)"
        style="transform-origin: center"
        stroke-linecap="round"
      />

      <!-- text -->
      <text
        :x="`${size / 2}vw`"
        :y="`${size / 2}vw`"
        fill="white"
        font-size="1.2vw"
        alignment-baseline="middle"
        text-anchor="middle"
      >
        {{ percent }}
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  percent?: number
  size?: number
  strokeWidth?: number
  strokeColor?: string
}>()

// Default
const percent = props.percent ?? 0
const size = props.size ?? 3
const strokeWidth = props.strokeWidth ?? 0.25
const strokeColor = props.strokeColor ?? 'green'

// Compute
const radius = computed(() => size / 2 - strokeWidth)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => circumference.value - (percent / 100) * circumference.value)
</script>
