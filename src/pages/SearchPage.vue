<template>
  <div class="w-full px-8 py-8 pt-2 text-white bg-black">
    <div class="flex justify-end gap-6">
      <div class="flex-1 mt-6">
        <SearchSidebar
          v-model:mediaType="searchParams.mediaType"
          v-model:genres="searchParams.genres"
          v-model:rating="searchParams.rating"
          @search="handleSearch"
        />
      </div>
      <div class="flex-[3]">
        <div v-if="loading && page === 1" class="py-10 text-center">
          <p>Loading...</p>
        </div>
        <div v-else-if="error" class="py-10 text-center text-red-500">
          <p>{{ error }}</p>
        </div>
        <div v-else-if="results.length === 0" class="py-10 text-center">
          <p>No results found</p>
        </div>
        <div v-else>
          <RelatedMediaList :mediaList="results" />

          <div v-if="loading && page > 1" class="py-6 text-center">
            <p class="text-gray-400">Loading more...</p>
          </div>

          <div v-if="!hasMore && results.length > 0" class="py-6 text-center">
            <p class="text-gray-500">No more results</p>
          </div>

          <div ref="triggerRef" class="h-10"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import RelatedMediaList from '@/components/MediaDetail/RelatedMediaList.vue'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import SearchSidebar from '@/components/SearchSidebar.vue'
import { movieServices } from '@/services/movie'

interface SearchParams {
  mediaType: 'movie' | 'tv'
  genres: number[]
  rating: string
}

interface MediaItem {
  id: number
  title: string
  release_date: string
  poster_path: string
  vote_average: number
  media_type: 'movie' | 'tv'
}

const router = useRouter()
const route = useRoute()

// Initialize từ URL params
const initializeFromURL = (): SearchParams => {
  const mediaType = (route.query.mediaType as string) || 'movie'
  const genres = route.query.genres ? String(route.query.genres).split(',').map(Number) : []
  const rating = (route.query.rating as string) || 'All'

  return {
    mediaType: mediaType as 'movie' | 'tv',
    genres,
    rating,
  }
}

const searchParams = ref<SearchParams>(initializeFromURL())

// Sync params to URL
const syncParamsToURL = () => {
  const query: any = {
    mediaType: searchParams.value.mediaType,
    rating: searchParams.value.rating,
  }

  if (searchParams.value.genres.length > 0) {
    query.genres = searchParams.value.genres.join(',')
  }

  router.replace({
    query,
  })
}

const buildQueryString = (currentPage: number) => {
  const [minRating, maxRating] =
    searchParams.value.rating === 'All'
      ? [0, 100]
      : searchParams.value.rating.split(' - ').map(Number)

  const params = new URLSearchParams({
    sort_by: 'popularity.desc',
    'vote_average.gte': String(minRating || 0 / 10),
    'vote_average.lte': String(maxRating || 0 / 10),
    page: String(currentPage),
  })

  if (searchParams.value.genres.length > 0) {
    params.append('with_genres', searchParams.value.genres.join(','))
  }

  return params.toString()
}

const { results, page, loading, error, hasMore, triggerRef, reset, setupObserver, cleanup } =
  useInfiniteScroll<MediaItem>({
    fetchFn: async (currentPage) => {
      const query = `${searchParams.value.mediaType}?${buildQueryString(currentPage)}`
      const response = await movieServices.getMovieBySearch(query)
      return {
        results: response.data.results,
        total_pages: response.data.total_pages,
      }
    },
  })

const handleSearch = () => {
  syncParamsToURL()
  reset()
}

// Watch for filter changes and sync to URL
watch(
  () => [searchParams.value.mediaType, searchParams.value.genres, searchParams.value.rating],
  () => {
    syncParamsToURL()
    reset()
  },
  { deep: true },
)

onMounted(() => {
  reset()
  setTimeout(() => {
    setupObserver()
  }, 100)
})

watch(results, () => {
  cleanup()
  setTimeout(() => {
    setupObserver()
  }, 100)
})
</script>
