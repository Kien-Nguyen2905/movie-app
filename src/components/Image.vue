<template>
  <img
    :src="currentSrc"
    :width="width"
    :height="height"
    :class="currentSrc === src ? className : `${className} blur-md`"
    loading="lazy"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  src: string
  width: number | string
  height: number | string
  className?: string
}>()

const currentSrc = ref(`https://placehold.co/${props.width}x${props.height}?text=Image`)

watch(
  () => props.src,
  (newSrc) => {
    const img = new Image()
    img.src = newSrc
    img.onload = () => {
      currentSrc.value = newSrc
    }
  },
  { immediate: true },
)
</script>

<style scoped></style>
