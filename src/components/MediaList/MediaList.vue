<template>
  <div class="bg-black px-8 py-10 text-[1.2vw] text-white">
    <div class="flex items-center gap-4 mb-6">
      <p class="text-[2vw] font-bold">{{ props.title }}</p>

      <ul class="flex border border-white rounded">
        <li
          v-for="tab in props.tab"
          :key="tab.id"
          :class="[
            'cursor-pointer rounded px-2 py-1',
            tab.id === activeTabId ? 'bg-white text-black' : '',
          ]"
          @click="activeTabId = tab.id"
        >
          {{ tab.label }}
          {{ tab.id }}
        </li>
      </ul>
    </div>

    <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
      <MovieCard
        v-for="media in mediaList"
        :key="media.id"
        :title="media.title || media.name"
        :release-date="media.release_date || media.first_air_date"
        :poster="media.poster_path"
        :point="media.vote_average"
        :media-type="media.media_type"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import MovieCard from '@/components/MediaList/MovieCard.vue'
import { ref, watch } from 'vue'

const props = defineProps<{
  title: string
  tab: {
    id: string
    label: string
    fetcher: () => Promise<any>
  }[]
}>()

const activeTabId = ref()
const mediaList = ref<any[]>([])

watch(activeTabId, async (newId) => {
  if (newId) {
    const tab = props.tab.find((t) => t.id === newId)
    if (!tab) return
    const response = await tab.fetcher()
    mediaList.value = response.data.results
  }
})

watch(
  () => props.tab,
  (newTabs) => {
    if (newTabs.length) {
      activeTabId.value = newTabs[0].id
    }
  },
  { immediate: true },
)
</script>
