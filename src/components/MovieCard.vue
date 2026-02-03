<template>
  <RouterLink
    :to="{
      name: props.mediaType === 'tv' ? 'tv-detail' : 'movie-detail',
      params: { id: props.id },
    }"
    class="border rounded-lg border-slate-800"
  >
    <div class="relative">
      <p
        v-if="props.mediaType === 'tv'"
        class="absolute p-1 text-sm text-white bg-black rounded shadow-md right-1 top-1"
      >
        TV Show
      </p>

      <Image
        class="w-full rounded-lg"
        width="210"
        height="300"
        :src="`https://image.tmdb.org/t/p/w500${props.poster}`"
      />

      <div class="relative -top-[1.5vw] px-4">
        <CircularProgressBar
          :percent="Math.round(props.point * 10)"
          :stroke-color="props.point >= 7 ? 'green' : props.point >= 5 ? 'orange' : 'red'"
        />

        <p class="mt-2 font-bold">
          {{ props.title }}
        </p>

        <p class="text-slate-300">
          {{ props.releaseDate }}
        </p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CircularProgressBar from './CircularProgressBar.vue'
import Image from '@/components/Image.vue'

const props = defineProps<{
  id: number | string
  title: string
  releaseDate: string
  poster: string
  point: number
  mediaType?: string
}>()
</script>

<style scoped></style>
