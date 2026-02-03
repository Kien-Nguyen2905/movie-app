<template>
  <div class="mt-8 text-[1.3vw]">
    <p class="mb-4 text-[1.4vw] font-bold">Seasons</p>

    <div class="space-y-4">
      <div
        v-for="season in props.seasons"
        :key="season.id"
        class="flex gap-4 p-3 border rounded-lg shadow-md border-slate-200"
      >
        <Image
          :width="130"
          :height="195"
          class-name="w-1/4 rounded-lg"
          :src="
            season.poster_path ? `https://media.themoviedb.org/t/p/w300${season.poster_path}` : ''
          "
        />

        <div class="space-y-1">
          <p class="text-[1.4vw] font-bold">
            {{ season.name }}
          </p>

          <div class="flex items-center gap-2">
            <p class="font-bold">Rating</p>
            <CircularProgressBar
              :percent="Math.round(season.vote_average * 10)"
              :size="2.5"
              :stroke-width="0.2"
            />
          </div>

          <p>
            <span class="font-bold">Release Date:</span>
            {{ season.air_date }}
          </p>

          <p>{{ season.episode_count }} Episodes</p>
          <p>{{ season.overview }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CircularProgressBar from '@/components/CircularProgressBar.vue'
import Image from '@/components/Image.vue'

const props = defineProps<{
  seasons: {
    id: number
    name: string
    poster_path?: string | null
    vote_average: number
    air_date: string
    episode_count: number
    overview: string
  }[]
}>()
</script>

<style scoped></style>
