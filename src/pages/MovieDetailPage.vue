<template>
  <div>
    <Loading v-if="isLoading" />
    <Banner
      v-if="movieInfo"
      :title="movieInfo.title"
      :backdrop_path="movieInfo.backdrop_path"
      :poster_path="movieInfo.poster_path"
      :release_date="movieInfo.release_date"
      :genres="movieInfo.genres"
      :vote_average="movieInfo.vote_average"
      :overview="movieInfo.overview"
      :certification="certification"
      :crews="crews"
      :trailerVideoKey="trailerVideoKey"
    />
    <div class="bg-black text-white text-[1.2vw]">
      <div class="flex max-w-screen-xl gap-6 px-6 py-10 mx-auto">
        <div class="flex-[2]">
          <ActorList :actors="movieInfo?.credits?.cast || []" />
          <p class="mb-4 text-[1.4vw] font-bold">More like this</p>
          <RelatedMediaList :media-list="relatedMovies || []" :is-loading="isLoadingRelated" />
        </div>
        <div class="flex-1">
          <p class="mb-4 text-[1.4vw] font-bold">Information</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Banner from '@/components/Banner.vue'
import Loading from '@/components/Loading.vue'
import ActorList from '@/components/MediaDetail/ActorList.vue'
import RelatedMediaList from '@/components/MediaDetail/RelatedMediaList.vue'
import { movieServices } from '@/services/movie'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isLoading = ref(false)
const isLoadingRelated = ref(false)
const movieInfo = ref()
const relatedMovies = ref()
const route = useRoute()

watch(
  () => route.params.id,
  async (newId) => {
    if (!newId) return

    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })

    isLoading.value = true
    isLoadingRelated.value = true

    try {
      const [movieResponse, relatedResponse] = await Promise.all([
        movieServices.getMovieById(newId as string),
        movieServices.getRelatedMovies(newId as string),
      ])
      movieInfo.value = movieResponse.data
      relatedMovies.value = relatedResponse.data.results
    } catch (error) {
      console.error('Failed to fetch movie data:', error)
    } finally {
      isLoading.value = false
      isLoadingRelated.value = false
    }
  },
  { immediate: true },
)

const certification = computed(() => {
  const results = movieInfo.value?.release_dates?.results || []
  const us = results.find((r: any) => r.iso_3166_1 === 'US')
  return us?.release_dates?.find((r: any) => r.certification)?.certification
})

const crews = computed(() =>
  (movieInfo.value?.credits?.crew || [])
    .filter((c: any) => ['Director', 'Screenplay', 'Writer'].includes(c.job))
    .map((c: any) => ({
      id: c.id,
      job: c.job,
      name: c.name,
    })),
)

const trailerVideoKey = computed(() => {
  const videos = movieInfo.value?.videos?.results || []
  const trailer = videos.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')
  return trailer ? trailer.key : undefined
})
</script>
