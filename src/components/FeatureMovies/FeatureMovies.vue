<template>
  <div class="relative text-white">
    <Movie
      v-if="activeMovie"
      :key="activeMovie.id"
      :trailerVideoKey="trailerVideoKey"
      v-bind="activeMovie"
    />
    <PaginateIndicator :movies="popularList" v-model:activeMovieId="activeMovieId as number" />
  </div>
</template>

<script setup lang="ts">
import Movie from '@/components/FeatureMovies/Movie.vue'
import PaginateIndicator from '@/components/FeatureMovies/PaginateIndicator.vue'
import type { MovieItem, VideoItem } from '@/components/FeatureMovies/type'
import { movieServices } from '@/services/movie'
import { computed, onMounted, ref, watch } from 'vue'

const popularList = ref<MovieItem[]>([])
const activeMovieId = ref<number>()
const videosMovie = ref<VideoItem[]>()

const fetch = async () => {
  try {
    const response = await movieServices.getPopularMovies()
    popularList.value = response.data.results.slice(0, 4)
    activeMovieId.value = popularList.value[0]?.id
  } catch (error) {
    console.error('Failed to fetch movies:', error)
  }
}

onMounted(fetch)

watch(
  () => activeMovieId.value,
  async (newId) => {
    if (!newId) return
    try {
      const response = await movieServices.getVideosMovie(newId)
      videosMovie.value = response.data.results
    } catch (error) {
      console.error('Failed to fetch videos:', error)
    }
  },
  {
    immediate: true,
  },
)

const activeMovie = computed(() => popularList.value.find((m) => m.id === activeMovieId.value))

const trailerVideoKey = computed(() => {
  if (!videosMovie.value?.length) return ''
  const trailer = videosMovie.value.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube',
  )
  return trailer?.key ?? ''
})
</script>

<style scoped></style>
