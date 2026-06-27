<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ContactModal from './../../components/sections/ContactSection.vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const links = [
  { label: 'Início', href: '#hero' },
  // { label: 'Sobre', href: '#about' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Skills', href: '#skills' },
]

function onScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const getScrollOffset = () => {
  const offset = getComputedStyle(document.documentElement)
    .getPropertyValue('--scroll-offset')
    .trim()

  return Number.parseFloat(offset) || 96
}

const easeInOutCubic = (progress: number) =>
  progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2

const scrollToPosition = (targetPosition: number) => {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    window.scrollTo({ top: targetPosition })
    return
  }

  const startPosition = window.scrollY
  const distance = targetPosition - startPosition
  const duration = 700
  let startTime: number | null = null

  const animateScroll = (currentTime: number) => {
    startTime ??= currentTime

    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    window.scrollTo(0, startPosition + distance * easeInOutCubic(progress))

    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
}

const scrollTo = (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement | null

  if (element) {
    isMenuOpen.value = false

    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - getScrollOffset()

    scrollToPosition(offsetPosition)
  }
}

const modalOpen = ref(false)
</script>
<template>
  <header
    :class="[
      'fixed top-4 left-1/2 -translate-x-1/2 z-50 h-14 w-[calc(100%-2rem)] max-w-7xl px-6 flex items-center justify-between rounded-full transition-all duration-300 backdrop-blur-md',
      isScrolled
        ? 'bg-bg-darker/40 border border-purple-light/20 shadow-lg shadow-purple-light/5'
        : 'bg-black/10 border border-white/5',
    ]"
  >
    <div class="container mx-auto flex items-center justify-between h-14 w-full">
      <a
        href="#hero"
        class="flex items-center gap-2 no-underline text-white"
        @click.prevent="scrollTo('#hero')"
      >
        <span class="text-purple-dark text-lg animate-spin" style="animation-duration: 8s">✦</span>
        <span class="text-sm font-medium text-white tracking-wide">
          <span>dev. </span><span class="text-purple-light font-bold">shell</span>
        </span>
      </a>

      <nav class="hidden sm:flex items-center gap-1">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="text-xs text-slate-400 px-3 py-2 rounded-md hover:text-white hover:bg-purple-light/10 transition-all duration-200 hover:underline hover:decoration-dotted decoration-purple-900 hover:underline-offset-4"
          @click.prevent="scrollTo(link.href)"
        >
          {{ link.label }}
        </a>
        <!-- href="#contact" -->
        <!-- @click.prevent="scrollTo('#contact')" -->
        <a
          @click="modalOpen = true"
          class="text-xs cursor-pointer text-white bg-purple-dark hover:bg-transparent hover:text-purple-light hover:text-bold hover:animate-neonPulse px-4 py-2 rounded-md ml-2 border border-purple/50 transition-all duration-200"
        >
          Contato
        </a>
      </nav>

      <button
        class="flex sm:hidden flex-col gap-1 p-1 cursor-pointer bg-transparent border-none"
        aria-label="Abrir menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span
          class="block w-5 h-px bg-slate-400 rounded transition-all duration-300"
          :class="{ 'rotate-45 translate-y-[5px]': isMenuOpen }"
        />
        <span
          class="block w-5 h-px bg-slate-400 rounded transition-all duration-300"
          :class="{ 'opacity-0': isMenuOpen }"
        />
        <span
          class="block w-5 h-px bg-slate-400 rounded transition-all duration-300"
          :class="{ '-rotate-45 -translate-y-[5px]': isMenuOpen }"
        />
      </button>
    </div>
  </header>

  <Transition name="slide">
    <div
      v-if="isMenuOpen"
      class="fixed top-20 left-4 right-4 z-40 bg-bg-dark/95 backdrop-blur-md rounded-2xl border border-purple-light/20 flex flex-col p-4 gap-1 md:hidden shadow-2xl shadow-black"
    >
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        class="text-sm text-slate-400 py-3 border-b border-blue/10 hover:text-purple-light transition-colors"
        @click.prevent="scrollTo(link.href)"
      >
        {{ link.label }}
      </a>
    </div>
  </Transition>
  <ContactModal
    :is-open="modalOpen"
    phone="5554999999999"
    message="Olá! Vim pelo seu portfolio"
    @close="modalOpen = false"
  />
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
</style>
