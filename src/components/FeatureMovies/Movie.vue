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
          <button class="px-4 py-2 mr-2 text-black bg-white rounded lg:text-lg">
            <FontAwesomeIcon :icon="faPlay" />
            Trailer
          </button>

          <button class="px-4 py-2 rounded bg-slate-300/35 lg:text-lg">View Detail</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import ImagePriority from '@/components/ImagePriority.vue'

const props = defineProps<{
  backdrop_path: string
  title: string
  release_date: string
  overview: string
}>()
</script>

<style scoped></style>
