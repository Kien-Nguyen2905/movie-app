<template>
  <div>
    <Loading v-if="isLoading" />
    <Banner v-if="movieInfo" v-bind="movieInfo" />
    <div class="bg-black text-white text-[1.2vw]">
      <div class="flex max-w-screen-xl gap-6 px-6 py-10 mx-auto">
        <div class="flex-[2]">
          <ActorList :actors="movieInfo?.credits?.cast || []" />
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
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isLoading = ref(false)
const isLoadingRelated = ref(false)
const movieInfo = ref()
const relatedMovies = ref()
const route = useRoute()
const id = route.params.id as string
watch(
  () => id,
  async (newId) => {
    if (!newId) return

    isLoading.value = true
    isLoadingRelated.value = true

    try {
      const response = await movieServices.getMovieById(newId)
      const responseRelated = await movieServices.getRelatedMovies(newId)
      movieInfo.value = response.data
      relatedMovies.value = responseRelated.data.results
    } catch (error) {
      movieInfo.value = null
      relatedMovies.value = null
    } finally {
      isLoading.value = false
      isLoadingRelated.value = false
    }
  },
  { immediate: true },
)
</script>

<style scoped></style>
