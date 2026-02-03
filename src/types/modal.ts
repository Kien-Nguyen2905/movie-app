import type { Component, InjectionKey, VNode } from 'vue'

export interface ModalContext {
  openPopup: (component: VNode | Component) => void
  closePopup: () => void
}

export const ModalKey: InjectionKey<ModalContext> = Symbol('modal')
