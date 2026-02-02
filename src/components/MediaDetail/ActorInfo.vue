<template>
  <div class="bg-black border rounded-lg shadow-sm border-slate-300">
    <Image
      class="rounded-lg"
      :src="
        profilePath
          ? `https://media.themoviedb.org/t/p/w276_and_h350_face${profilePath}`
          : '/ActorNoImage.svg'
      "
      width="276"
      height="350"
    />

    <div class="p-3">
      <p class="font-bold">{{ name }}</p>
      <p>{{ character }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Image from '@/components/Image.vue'

defineProps<{
  id: number
  name: string
  character: string
  profilePath?: string | null
}>()
</script>

<style scoped></style>
