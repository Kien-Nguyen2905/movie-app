<template>
  <div>
    <p class="mb-4 text-[1.4vw] font-bold">Information</p>

    <div class="mb-4">
      <p class="font-bold">Original Name</p>
      <p>{{ props.original_name }}</p>
    </div>

    <div class="mb-4">
      <p class="font-bold">Original Country</p>
      <img
        v-for="countryCode in props.origin_country || []"
        :key="countryCode"
        :src="`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`"
        class="mr-1 mt-1 w-[1.4vw]"
      />
    </div>

    <div class="mb-4">
      <p class="font-bold">Status</p>
      <p>{{ props.status }}</p>
    </div>

    <div class="mb-4">
      <p class="font-bold">Network</p>
      <img
        v-for="network in props.networks || []"
        :key="network.id"
        class="invert"
        :src="`https://media.themoviedb.org/t/p/h30${network.logo_path}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  original_name?: string
  origin_country?: string[]
  status?: string
  networks?: {
    id: number
    logo_path?: string | null
  }[]
}>()
</script>

<style scoped></style>
