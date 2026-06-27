import './../assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'
import Earth from '@/views/Earth.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Earth,
    },
  ],
})

export default router
