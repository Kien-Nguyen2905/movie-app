<script setup lang="ts">
import FeatureMovies from '@/components/FeatureMovies/FeatureMovies.vue'
import Header from '@/components/Header.vue'
import MediaList from '@/components/MediaList/MediaList.vue'
import { TAB_CONFIG } from './constants/tab' // or the correct path to your TAB_CONFIG export
</script>

<template>
  <div>
    <Header />
    <FeatureMovies />
    <MediaList :title="TAB_CONFIG.TRENDING.label" :tab="TAB_CONFIG.TRENDING.items" />
    <MediaList :title="TAB_CONFIG.TOP_RATED.label" :tab="TAB_CONFIG.TOP_RATED.items" />
  </div>
</template>

<style scoped></style>
