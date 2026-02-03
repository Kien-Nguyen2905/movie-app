<template>
  <div>
    <ImagePriority
      :src="`https://image.tmdb.org/t/p/original${props.backdrop_path}`"
      class="w-full aspect-video brightness-50"
      :width="1300"
      :height="720"
    />

    <div class="absolute bottom-[10%] left-8 w-1/2 sm:w-1/3">
      <p class="mb-2 font-bold sm:text-[2vw]">
        {{ props.title }}
      </p>

      <div>
        <p class="text-[1.2vw]">
          {{ props.release_date }}
        </p>
      </div>

      <div>
        <div class="mt-4 hidden text-[1.2vw] sm:block">
          <p class="mb-2 font-bold">Overview</p>
          <p>{{ props.overview }}</p>
        </div>

        <div class="mt-4">
          <button
            @click="openTrailer"
            class="px-4 py-2 mr-2 text-black bg-white rounded lg:text-lg"
          >
            <FontAwesomeIcon :icon="faPlay" />
            Trailer
          </button>

          <button
            @click="router.push(`movie/${props.id}`)"
            class="px-4 py-2 rounded bg-slate-300/35 lg:text-lg"
          >
            View Detail
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import ImagePriority from '@/components/ImagePriority.vue'
import TrailerModal from '@/components/TrailerModal.vue'
import { h, inject } from 'vue'
import { useRouter } from 'vue-router'
import { ModalKey } from '@/types/modal'

const props = defineProps<{
  id: number
  backdrop_path: string
  title: string
  release_date: string
  overview: string
  trailerVideoKey?: string
}>()
const router = useRouter()
const modal = inject(ModalKey)

const openTrailer = () => {
  if (modal && props.trailerVideoKey) {
    modal.openPopup(h(TrailerModal, { videoKey: props.trailerVideoKey }))
  }
}
</script>

<style scoped></style>
