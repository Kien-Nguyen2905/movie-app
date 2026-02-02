<template>
  <RouterLink :to="`/movie/${id}`" class="border rounded-lg border-slate-800">
    <div class="relative">
      <p
        v-if="mediaType === 'tv'"
        class="absolute p-1 text-sm text-white bg-black rounded shadow-md right-1 top-1"
      >
        TV Show
      </p>

      <Image
        class="w-full rounded-lg"
        width="210"
        height="300"
        :src="`https://image.tmdb.org/t/p/w500${poster}`"
      />

      <div class="relative -top-[1.5vw] px-4">
        <CircularProgressBar
          :percent="Math.round(point * 10)"
          :stroke-color="point >= 7 ? 'green' : point >= 5 ? 'orange' : 'red'"
        />

        <p class="mt-2 font-bold">
          {{ title }}
        </p>

        <p class="text-slate-300">
          {{ releaseDate }}
        </p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CircularProgressBar from './CircularProgressBar.vue'
import Image from '@/components/Image.vue'

defineProps<{
  id: number | string
  title: string
  releaseDate: string
  poster: string
  point: number
  mediaType?: 'movie' | 'tv'
}>()
</script>

<style scoped></style>
