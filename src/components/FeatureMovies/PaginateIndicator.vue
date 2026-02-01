<template>
  <div class="absolute bottom-[10%] right-8">
    <ul class="flex gap-1">
      <li
        v-for="movie in movies"
        :key="movie.id"
        :class="[
          'h-1 w-6 cursor-pointer',
          movie.id === activeMovieId ? 'bg-slate-100' : 'bg-slate-600',
        ]"
        @click="onClickIndicator(movie.id)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  movies: { id: number }[]
  activeMovieId: number
}>()

const emit = defineEmits<{
  (e: 'update:activeMovieId', id: number): void
}>()

const onClickIndicator = (id: number) => {
  emit('update:activeMovieId', id)
}
</script>

<style scoped></style>
