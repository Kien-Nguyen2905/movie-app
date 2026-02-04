<template>
  <div>
    <Loading v-if="isLoading" />
    <Banner
      v-if="tvInfo"
      :title="tvInfo.name"
      :backdrop_path="tvInfo.backdrop_path"
      :poster_path="tvInfo.poster_path"
      :release_date="tvInfo.first_air_date"
      :genres="tvInfo.genres"
      :vote_average="tvInfo.vote_average"
      :overview="tvInfo.overview"
      :certification="certification"
      :crews="crews"
      :trailerVideoKey="trailerVideoKey"
    />

    <div class="bg-black text-[1.2vw] text-white">
      <div class="container flex gap-6">
        <div class="flex-[2]">
          <ActorList :actors="actors" />
          <SeasonsList :seasons="(tvInfo?.seasons || []).slice().reverse()" />
          <p class="mb-4 text-[1.4vw] font-bold">More like this</p>
          <RelatedMediaList
            :media-list="relatedTVShow"
            :is-loading="isLoadingRelated"
            title="More like this"
          />
        </div>

        <div class="flex-1">
          <TVShowInformation :tv-info="tvInfo" />
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
import SeasonsList from '@/components/MediaDetail/SeasonsList.vue'
import TVShowInformation from '@/components/MediaDetail/TVShowInformation.vue'
import { tvServices } from '@/services/tv'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isLoading = ref(false)
const isLoadingRelated = ref(false)
const tvInfo = ref()
const relatedTVShow = ref()
const route = useRoute()
const id = route.params.id as string
watch(
  () => id,
  async (newId) => {
    if (!newId) return

    isLoading.value = true
    isLoadingRelated.value = true

    try {
      const response = await tvServices.getTvShowById(newId)
      const responseRelated = await tvServices.getRelatedTvShow(newId)
      tvInfo.value = response.data
      relatedTVShow.value = responseRelated.data.results
    } catch (error) {
      tvInfo.value = null
      relatedTVShow.value = null
    } finally {
      isLoading.value = false
      isLoadingRelated.value = false
    }
  },
  { immediate: true },
)

const certification = computed(() => {
  const results = tvInfo.value?.content_ratings?.results || []
  const us = results.find((r: any) => r.iso_3166_1 === 'US')
  return us?.release_dates?.find((r: any) => r.certification)?.certification
})

const crews = computed(() =>
  (tvInfo.value?.credits?.crew || [])
    .filter((c: any) => ['Director', 'Screenplay', 'Writer'].includes(c.job))
    .map((c: any) => ({
      id: c.id,
      job: c.job,
      name: c.name,
    })),
)

const trailerVideoKey = computed(() => {
  const videos = tvInfo.value?.videos?.results || []
  const trailer = videos.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')
  return trailer ? trailer.key : undefined
})

const actors = computed(() =>
  (tvInfo.value?.aggregate_credits?.cast || []).map((cast: any) => ({
    ...cast,
    character: cast.roles?.[0]?.character,
    episodeCount: cast.roles?.[0]?.episode_count,
  })),
)
</script>

<style scoped></style>
