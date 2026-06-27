<template>
  <section
    v-scroll-animate
    id="projects"
    class="relative py-10 bg-bg-darker text-white overflow-hidden"
  >
    <img
      src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200"
      alt="Fundo Binário"
      class="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none"
    />
    <div class="container mx-auto px-6">
      <div class="text-center mb-12">
        <h2
          class="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-eerald-950 to-green-400 bg-clip-text text-transparent"
        >
          Meus Projetos
        </h2>
        <p class="text-gray-400 mt-2">Arraste para o lado para ver mais</p>
      </div>

      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="24"
        :loop="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        :breakpoints="{
          '640': { slidesPerView: 2 },
          '1024': { slidesPerView: 3 },
        }"
        class="pb-12"
      >
        <swiper-slide v-for="project in projects" :key="project.id" class="h-auto">
          <div
            class="bg-bg-darker border border-emerald-500/20 rounded-xl overflow-hidden hover:border-green-400/50 transition-all duration-300 h-full flex flex-col min-h-[420px] hover:shadow-lg hover:shadow-green-500/5"
          >
            <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover" />

            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-xl font-bold text-white mb-2">{{ project.title }}</h3>
              <p class="text-gray-400 text-sm mb-4 flex-grow">{{ project.description }}</p>

              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.techs"
                  :key="tech"
                  class="text-xs bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded"
                >
                  {{ tech }}
                </span>
              </div>

              <RouterLink
                :to="`/projects/${project.slug}`"
                class="text-emerald-400 hover:text-green-300 font-medium text-sm transition-colors mt-auto inline-flex items-center gap-1 group"
              >
                <span
                  class="group-hover:animate-[flicker_1s_ease-in-out_infinite] hover:underline-offset-4 hover:underline"
                >
                  Ver detalhes
                </span>
                <font-awesome-icon
                  icon="fa-solid fa-angles-right"
                  class="group-hover:animate-[nudgeLeft_0.8s_ease-in-out_infinite] ms-2"
                />
              </RouterLink>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import { projects } from '@/data/projects'

import 'swiper/css'
import 'swiper/css/pagination'

const modules = [Autoplay, Pagination]

const vScrollAnimate = {
  mounted: (el: HTMLElement) => {
    el.style.opacity = '0'

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('animate-slide-right')
            observer.unobserve(el)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    )

    observer.observe(el)
  },
}
</script>

<style>
.swiper-pagination-bullet {
  background: #10b981 !important; /* emerald-500 */
  opacity: 0.3;
}
.swiper-pagination-bullet-active {
  background: #34d399 !important; /* emerald-400 */
  opacity: 1;
  width: 20px !important;
  border-radius: 4px !important;
  transition: all 0.3s ease;
  box-shadow: 0 0 8px rgba(52, 211, 153, 0.5); /* Efeito glow sutil na bolinha ativa */
}
</style>
