<template>
  <div class="relative overflow-hidden text-white">
    <ImagePriority
      class="absolute inset-0 brightness-[.2] object-cover w-full h-full -z-10"
      :src="backdropUrl"
      width="1310"
      height="720"
    />

    <div class="relative flex max-w-screen-xl gap-6 px-6 py-10 mx-auto lg:gap-8">
      <div class="flex-1">
        <ImagePriority :src="posterUrl" width="600" height="900" />
      </div>

      <div class="flex-[2] text-[1.2vw]">
        <p class="mb-2 text-[2vw] font-bold">
          {{ props.title }}
        </p>

        <div class="flex items-center gap-4">
          <span class="p-1 text-gray-400 border border-gray-400">
            {{ certification }}
          </span>
          <p>{{ props.release_date }}</p>
          <p>
            {{ (props.genres || []).map((g) => g.name).join(', ') }}
          </p>
        </div>

        <div class="flex items-center gap-4 mt-4">
          <div class="flex items-center gap-2">
            <CircularProgressBar
              :percent="Math.round(props.vote_average * 10)"
              :size="3.5"
              :stroke-width="0.3"
            />
            Rating
          </div>

          <button>
            <FontAwesomeIcon :icon="faPlay" class="mr-1" />
            Trailer
          </button>
        </div>

        <div class="mt-4">
          <p class="mb-2 text-[1.3vw] font-bold">Overview</p>
          <p>{{ props.overview }}</p>
        </div>

        <div class="grid grid-cols-2 gap-2 mt-4">
          <div v-for="job in Object.keys(groupedCrews)" :key="job">
            <p class="font-bold">{{ job }}</p>
            <p>
              {{ groupedCrews[job].map((c) => c.name).join(', ') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { groupBy } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import CircularProgressBar from '@/components/CircularProgressBar.vue'
import ImagePriority from '@/components/ImagePriority.vue'

type Crew = {
  id: number
  job: string
  name: string
}

const props = defineProps<{
  backdrop_path: string
  poster_path: string
  title: string
  release_date: string
  genres: { id: number; name: string }[]
  vote_average: number
  overview: string
  release_dates?: any
  credits: any
}>()

const backdropUrl = `https://image.tmdb.org/t/p/w1280${props.backdrop_path}`
const posterUrl = `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${props.poster_path}`

const certification = computed(() => {
  const results = props.release_dates?.results || []
  const us = results.find((r: any) => r.iso_3166_1 === 'US')
  return us?.release_dates?.find((r: any) => r.certification)?.certification
})

const crews = computed<Crew[]>(() =>
  (props.credits?.crew || [])
    .filter((c: any) => ['Director', 'Screenplay', 'Writer'].includes(c.job))
    .map((c: any) => ({
      id: c.id,
      job: c.job,
      name: c.name,
    })),
)

const groupedCrews = computed(() => groupBy(crews.value, 'job'))
</script>

<style scoped></style>
