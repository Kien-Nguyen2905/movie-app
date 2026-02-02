<script setup lang="ts">
import { ref, watch } from 'vue'
import { useHead } from '@vueuse/head'

const props = defineProps<{
  src: string
  width: number | string
  height: number | string
  className?: string
}>()

const placeholder = `https://placehold.co/${props.width}x${props.height}?text=Image`
const currentSrc = ref(placeholder)

/**
 * Preload sớm ngay khi src có giá trị
 * (trước khi <img> render src thật)
 */
watch(
  () => props.src,
  (newSrc) => {
    if (!newSrc) return

    useHead({
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: newSrc,
          fetchpriority: 'high',
        },
      ],
    })

    const img = new Image()
    img.src = newSrc
    img.onload = () => {
      currentSrc.value = newSrc
    }
  },
  { immediate: true },
)
</script>

<template>
  <img
    :src="currentSrc"
    :width="width"
    :height="height"
    :class="currentSrc === src ? className : `${className} blur-md`"
    loading="eager"
    decoding="async"
  />
</template>
