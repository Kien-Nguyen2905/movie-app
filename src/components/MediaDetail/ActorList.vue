<template>
  <div>
    <p class="mb-4 text-[1.4vw] font-bold">Actors</p>

    <div class="grid grid-cols-3 gap-4 sm:grid-cols-4">
      <ActorInfo
        v-for="actor in currentActors"
        :key="actor.id"
        :id="actor.id"
        :name="actor.name"
        :character="actor.character"
        :profile-path="actor.profile_path"
      />
    </div>

    <p class="mt-1 cursor-pointer" @click="isShowMore = !isShowMore">
      {{ isShowMore ? 'Show Less' : 'Show More' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ActorInfo from './ActorInfo.vue'

type Actor = {
  id: number
  name: string
  character: string
  profile_path?: string | null
}

const props = defineProps<{
  actors?: Actor[]
}>()

const isShowMore = ref(false)

const currentActors = computed(() =>
  isShowMore.value ? (props.actors || []).slice(0, 32) : (props.actors || []).slice(0, 4),
)
</script>

<style scoped></style>
