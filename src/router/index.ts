import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/RootLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/pages/HomPage.vue'),
        },
        {
          path: '/movie/:id',
          name: 'movie-detail',
          component: () => import('@/pages/MovieDetailPage.vue'),
        },
        {
          path: '/tv/:id',
          name: 'tv-detail',
          component: () => import('@/pages/TVShowDetailPage.vue'),
        },
        {
          path: '/people/:id',
          name: 'people-detail',
          component: () => import('@/pages/PeoplePage.vue'),
        },
      ],
    },
  ],
})

export default router
