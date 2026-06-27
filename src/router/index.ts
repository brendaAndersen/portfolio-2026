import './../assets/main.css'
import { createRouter, createWebHistory } from 'vue-router'
import Earth from '@/views/Earth.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 96,
        behavior: 'smooth',
      }
    }

    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      component: Earth,
    },
    {
      path: '/projects/:slug',
      component: ProjectDetail,
    },
  ],
})

export default router
