<template>
  <div class="relative text-white">
    <Movie
      v-for="movie in popularList.filter((m) => m.id === activeMovieId)"
      :key="movie.id"
      v-bind="movie"
    />
    <PaginateIndicator :movies="popularList" v-model:activeMovieId="activeMovieId" />
  </div>
</template>

<script setup lang="ts">
import Movie from '@/components/FeatureMovies/Movie.vue'
import PaginateIndicator from '@/components/FeatureMovies/PaginateIndicator.vue'
import { movieServices } from '@/services/movie'
import { onMounted, ref } from 'vue'

const popularList = ref([])
const activeMovieId = ref()

const fetch = async () => {
  const response = await movieServices.getPopularMovies()
  popularList.value = response.data.results.slice(0, 4)
  activeMovieId.value = popularList.value[0].id
}

onMounted(fetch)
</script>

<style scoped></style>
