import RootLayout from '@/layout/RootLayout.vue'
import HomPage from '@/pages/HomPage.vue'
import MovieDetailPage from '@/pages/MovieDetailPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: RootLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomPage,
        },
        {
          path: '/movie/:id',
          name: 'movie-detail',
          component: MovieDetailPage,
        },
      ],
    },
  ],
})

export default router
