<template>
  <slot />
  <div v-if="isShowing" className="fixed inset-0">
    <div
      className="absolute inset-0 flex items-center justify-center bg-slate-600/60"
      @click="closePopup"
    >
      <component :is="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch, type Component, type VNode } from 'vue'
import { ModalKey, type ModalContext } from '@/types/modal'

const isShowing = ref(false)
const content = ref<VNode | Component | null>(null)

const openPopup = (component: VNode | Component) => {
  content.value = component
  isShowing.value = true
}

const closePopup = () => {
  isShowing.value = false
  content.value = null
}

const modalContext: ModalContext = {
  openPopup,
  closePopup,
}

provide(ModalKey, modalContext)

watch(isShowing, (value) => {
  document.body.style.overflow = value ? 'hidden' : 'scroll'
})
</script>
