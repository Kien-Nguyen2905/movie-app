<template>
  <div class="sticky p-6 bg-gray-900 rounded-lg top-4">
    <h3 class="mb-6 text-xl font-bold">Filters</h3>

    <div class="mb-6">
      <label class="block mb-3 text-sm font-semibold">Media Type</label>
      <div class="flex gap-2">
        <button
          @click="updateMediaType('movie')"
          :class="[
            'flex-1 py-2 px-4 rounded-lg font-medium transition-colors',
            mediaType === 'movie'
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700',
          ]"
        >
          Movies
        </button>
        <button
          @click="updateMediaType('tv')"
          :class="[
            'flex-1 py-2 px-4 rounded-lg font-medium transition-colors',
            mediaType === 'tv'
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700',
          ]"
        >
          TV Shows
        </button>
      </div>
    </div>

    <div class="mb-6">
      <label class="block mb-3 text-sm font-semibold">Genres</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="genre in genresList"
          :key="genre.id"
          @click="toggleGenre(genre.id)"
          :class="[
            'py-1.5 px-3 rounded-full text-sm font-medium transition-colors',
            genres.includes(genre.id)
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700',
          ]"
        >
          {{ genre.name }}
        </button>
      </div>
    </div>

    <div class="mb-6">
      <label class="block mb-3 text-sm font-semibold">Rating</label>
      <select
        :value="rating"
        @change="updateRating(($event.target as HTMLSelectElement).value)"
        class="w-full px-3 py-2 text-white bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
      >
        <option value="All">All Ratings</option>
        <option value="0 - 40">0 - 4.0</option>
        <option value="40 - 60">4.0 - 6.0</option>
        <option value="60 - 80">6.0 - 8.0</option>
        <option value="80 - 100">8.0 - 10.0</option>
      </select>
    </div>

    <button
      @click="resetFilters"
      class="w-full py-3 mt-2 font-semibold text-gray-400 transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
    >
      Reset Filters
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  mediaType: 'movie' | 'tv'
  genres: number[]
  rating: string
}

interface Emits {
  (e: 'update:mediaType', value: 'movie' | 'tv'): void
  (e: 'update:genres', value: number[]): void
  (e: 'update:rating', value: string): void
  (e: 'search'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const genresList = ref([
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
])

const updateMediaType = (type: 'movie' | 'tv') => {
  emit('update:mediaType', type)
}

const toggleGenre = (genreId: number) => {
  const newGenres = props.genres.includes(genreId)
    ? props.genres.filter((id) => id !== genreId)
    : [...props.genres, genreId]
  emit('update:genres', newGenres)
}

const updateRating = (value: string) => {
  emit('update:rating', value)
}

const resetFilters = () => {
  emit('update:mediaType', 'movie')
  emit('update:genres', [])
  emit('update:rating', 'All')
  emit('search')
}
</script>
