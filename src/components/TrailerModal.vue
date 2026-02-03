<template>
  <iframe
    :src="`https://www.youtube.com/embed/${videoKey}`"
    class="aspect-video w-[50vw]"
    allowfullscreen
  />
</template>
<script setup lang="ts">
const props = defineProps<{
  videoKey: string
}>()
</script>
