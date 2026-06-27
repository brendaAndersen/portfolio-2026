<script setup lang="ts">
import SkillsBelt from './../SkillsBelt.vue'
import { Autoplay, Pagination } from 'swiper/modules'

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
<template>
  <section v-scroll-animate id="skills" class="py-10">
    <SkillsBelt />
  </section>
</template>
