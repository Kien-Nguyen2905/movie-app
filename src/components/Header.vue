<template>
  <header class="flex items-center justify-between px-8 text-white h-14 lg:h-20 bg-slate-950">
    <div class="flex items-center gap-4">
      <img
        @click="router.push('/')"
        src="../assets/images/netflix.png"
        class="w-16 cursor-pointer sm:w-28"
      />
      <a href="#" class="lg:text-xl">Phim</a>
      <a href="#" class="lg:text-xl">Truyền hình</a>
    </div>
    <div>
      <FontAwesomeIcon :icon="faMagnifyingGlass" class="cursor-pointer" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped></style>
