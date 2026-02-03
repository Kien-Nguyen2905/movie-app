<template>
  <div class="bg-black text-white text-[1.2vw]">
    <div class="container flex gap-8">
      <div class="flex-1">
        <Image
          :src="
            peopleInfo.profile_path &&
            `https://media.themoviedb.org/t/p/w600_and_h900_bestv2${peopleInfo.profile_path}`
          "
          :width="600"
          :height="900"
          className="mb-6"
        />

        <div>
          <p class="mb-6 text-[1.3vw] font-bold">Personal Info</p>
          <div class="space-y-4">
            <div>
              <p class="font-bold">Known For</p>
              <p>{{ peopleInfo.known_for_department }}</p>
            </div>
            <div>
              <p class="font-bold">Gender</p>
              <p>{{ GENDER_MAPPING[peopleInfo.gender as GenderKey] }}</p>
            </div>
            <div>
              <p class="font-bold">Place of Birth</p>
              <p>{{ peopleInfo.place_of_birth }}</p>
            </div>
            <div>
              <p class="font-bold">Birthday</p>
              <p>{{ peopleInfo.birthday }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-[2]">
        <p class="mb-6 text-[2vw] font-bold">{{ peopleInfo.name }}</p>

        <div class="mb-6">
          <p class="mb-4 text-[1.4vw] font-bold">Biography</p>
          <p class="whitespace-pre-line">
            {{ peopleInfo.biography }}
          </p>
        </div>

        <RelatedMediaList
          :mediaList="peopleInfo.combined_credits?.cast || []"
          title="Known For"
          :isLoading="isLoading"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RelatedMediaList from '@/components/MediaDetail/RelatedMediaList.vue'
import { GENDER_MAPPING, type GenderKey } from '../constants/gender'
import Image from '@/components/Image.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { personServices } from '@/services/person'
const peopleInfo = ref()
const route = useRoute()
const isLoading = ref(false)

watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      isLoading.value = true
      try {
        const response = await personServices.getPersonById(newId as string)
        peopleInfo.value = response.data
      } catch (error) {
        console.error('Failed to fetch person data:', error)
      } finally {
        isLoading.value = false
      }
    }
  },
  { immediate: true },
)
</script>
