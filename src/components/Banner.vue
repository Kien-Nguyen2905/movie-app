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

          <button
            @click="openTrailer"
            class="flex items-center px-3 py-1 font-bold bg-white rounded text-slate-900 hover:bg-gray-200"
          >
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
              {{ groupedCrews[job]?.map((c: CrewMember) => c.name).join(', ') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, h, inject } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import CircularProgressBar from '@/components/CircularProgressBar.vue'
import TrailerModal from '@/components/TrailerModal.vue'
import ImagePriority from '@/components/ImagePriority.vue'
import { ModalKey } from '@/types/modal'
import type { CrewMember } from '@/components/type'

const props = defineProps<{
  backdrop_path: string
  poster_path: string
  title: string
  release_date: string
  genres: { id: number; name: string }[]
  vote_average: number
  overview: string
  certification: any
  crews: CrewMember[]
  trailerVideoKey?: string
}>()

const modal = inject(ModalKey)

const openTrailer = () => {
  if (modal && props.trailerVideoKey) {
    modal.openPopup(h(TrailerModal, { videoKey: props.trailerVideoKey }))
  }
}
const backdropUrl = computed(() => `https://image.tmdb.org/t/p/w1280${props.backdrop_path}`)
const posterUrl = computed(
  () => `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${props.poster_path}`,
)

const groupedCrews = computed<Record<string, CrewMember[]>>(() => {
  if (!props.crews) return {}
  const result = props.crews.reduce((acc: Record<string, CrewMember[]>, { job, ...rest }) => {
    if (!acc[job]) acc[job] = []
    acc[job].push({ job, ...rest } as CrewMember)
    return acc
  }, {})
  return result
})
</script>

<style scoped></style>
