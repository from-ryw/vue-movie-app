import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/movie',
      name: 'movie',
      component: () => import('@/views/Movie.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/notFound',
      name: 'notFound',
      component: () => import('@/views/NotFound.vue')
    },{
      path: '/:pathMatch(.*)*',
      redirect: "/notFound"
    }
  ]
})

export default router
