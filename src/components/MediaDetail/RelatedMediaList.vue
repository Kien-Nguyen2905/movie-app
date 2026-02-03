<template>
  <div class="mt-6">
    <p class="mb-4 text-[1.4vw] font-bold">More like this</p>

    <Loading v-if="props.isLoading" />

    <div v-else class="grid grid-cols-3 gap-4 sm:grid-cols-4">
      <MovieCard
        v-for="media in props.mediaList"
        :key="media.id"
        :id="media.id"
        :title="media.title"
        :release-date="media.release_date"
        :poster="media.poster_path"
        :point="media.vote_average"
        :media-type="media.media_type"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import MovieCard from '@/components/MovieCard.vue'

const props = defineProps<{
  mediaList?: {
    id: number
    title: string
    release_date: string
    poster_path: string
    vote_average: number
    media_type: 'movie' | 'tv'
  }[]
  isLoading: boolean
}>()
</script>

<style scoped></style>
