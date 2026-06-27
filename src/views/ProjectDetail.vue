<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getProjectBySlug } from '@/data/projects'

const route = useRoute()
const project = computed(() => getProjectBySlug(String(route.params.slug)))
const hasProjectLink = computed(() => Boolean(project.value?.link && project.value.link !== '#'))

// galeria
const allImages = computed(() => {
  if (!project.value) return []
  const extras = project.value.images ?? []
  return [project.value.image, ...extras]
})

const activeImage = ref<string | null>(null)
const currentImage = computed(() => activeImage.value ?? allImages.value[0] ?? '')
const activeIndex = computed(() => {
  const index = allImages.value.indexOf(currentImage.value)

  return index >= 0 ? index : 0
})

// lightbox
const lightboxOpen = ref(false)

function openLightbox() {
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

function prevImage() {
  if (allImages.value.length === 0) return

  const i = activeIndex.value
  const previousImage = allImages.value[i > 0 ? i - 1 : allImages.value.length - 1]

  if (previousImage) {
    activeImage.value = previousImage
  }
}

function nextImage() {
  if (allImages.value.length === 0) return

  const i = activeIndex.value
  const nextImage = allImages.value[i < allImages.value.length - 1 ? i + 1 : 0]

  if (nextImage) {
    activeImage.value = nextImage
  }
}
</script>

<template>
  <main class="min-h-screen bg-bg-darker pt-28 text-white">
    <section v-if="project" class="container pb-20">

      <RouterLink
        to="/#projects"
        class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-purple-light/60
          transition-all duration-300 hover:text-purple-light hover:gap-3"
      >
        <span class="text-base">←</span> ~/projects
      </RouterLink>

      <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">

        <div>
          <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-light/20 bg-purple/10 px-3 py-1">
            <span class="h-1.5 w-1.5 rounded-full bg-purple-light animate-pulse" />
            <span class="text-xs text-purple-light/70 font-mono">PROJETO // ATIVO</span>
          </div>

          <h1 class="text-4xl font-bold font-orbitron md:text-5xl
            bg-gradient-to-r from-white via-purple-light to-pink bg-clip-text text-transparent">
            {{ project.title }}
          </h1>

          <p class="mt-5 max-w-2xl text-base leading-7 text-slate-400 md:text-lg border-l-2 border-purple-light/30 pl-4">
            {{ project.description }}
          </p>

          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="tech in project.techs"
              :key="tech"
              class="rounded border border-purple-light/20 bg-purple/10 px-3 py-1
                text-xs font-medium text-purple-light font-mono
                transition-all duration-200 hover:border-purple-light/60 hover:bg-purple/20"
            >
              {{ tech }}
            </span>
          </div>

          <a
            v-if="hasProjectLink"
            :href="project.link"
            target="_blank"
            rel="noreferrer"
            class="group relative mt-8 inline-flex items-center gap-2 overflow-hidden
              rounded-lg border border-purple-light/40 bg-purple/20 px-6 py-3
              text-sm font-semibold text-purple-light font-mono
              transition-all duration-300
              hover:border-purple-light hover:text-white
              hover:shadow-[0_0_25px_rgba(125,72,201,0.4)]"
          >
            <span class="absolute inset-0 bg-gradient-to-r from-transparent via-purple/20 to-transparent
              -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span class="relative z-10 flex items-center gap-2">
              <span class="animate-pulse">▸</span> ACESSAR PROJETO
            </span>
          </a>
        </div>

        <div class="flex flex-col gap-3">

          <div class="group relative cursor-zoom-in" @click="openLightbox">
            <div class="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple via-pink to-purple-light
              opacity-30 blur-sm transition-opacity duration-500 group-hover:opacity-60 animate-borderFlow" />

            <div class="absolute inset-0 z-10 rounded-xl overflow-hidden pointer-events-none">
              <div class="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)]" />
            </div>

            <div class="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300
              bg-black/60 rounded-md px-2 py-1 text-xs text-purple-light font-mono border border-purple-light/30">
              ⤢ AMPLIAR
            </div>

            <img
              :src="currentImage"
              :alt="project.title"
              class="relative aspect-video w-full rounded-xl object-cover
                shadow-2xl shadow-purple-dark/40
                transition-all duration-500
                group-hover:scale-[1.02] group-hover:shadow-[0_0_40px_rgba(125,72,201,0.3)]"
            />

            <div class="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-purple-light/60 rounded-tl" />
            <div class="absolute top-3 right-10 w-4 h-4 border-t-2 border-r-2 border-purple-light/60 rounded-tr" />
            <div class="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-purple-light/60 rounded-bl" />
            <div class="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-purple-light/60 rounded-br" />
          </div>

          <div v-if="allImages.length > 1" class="flex gap-2 overflow-x-auto pb-1">
            <button
              v-for="(img, i) in allImages"
              :key="i"
              class="relative flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-all duration-200 cursor-pointer"
              :class="currentImage === img
                ? 'border-purple-light shadow-[0_0_10px_rgba(125,72,201,0.5)]'
                : 'border-purple-light/20 opacity-50 hover:opacity-80 hover:border-purple-light/50'"
              @click="activeImage = img"
            >
              <img :src="img" :alt="`${project.title} ${i + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>

          <p v-if="allImages.length > 1" class="text-xs text-purple-light/40 font-mono text-right">
            [ {{ activeIndex + 1 }} / {{ allImages.length }} ]
          </p>
        </div>
      </div>
    </section>

    <section v-else class="container pb-20 text-center">
      <p class="font-mono text-purple-light/50 mb-4 text-sm">ERROR_404 // NODO NÃO ENCONTRADO</p>
      <h1 class="text-3xl font-bold font-orbitron">Projeto não encontrado</h1>
      <RouterLink
        to="/#projects"
        class="mt-6 inline-flex items-center gap-2 rounded-lg border border-purple-light/40
          bg-purple/20 px-5 py-3 text-sm font-semibold text-purple-light font-mono
          transition-all duration-300 hover:border-purple-light hover:text-white
          hover:shadow-[0_0_20px_rgba(125,72,201,0.3)]"
      >
        ← ~/projects
      </RouterLink>
    </section>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          @click.self="closeLightbox"
        >
          <button
            class="absolute top-4 right-4 text-gray-400 hover:text-white text-xl transition-colors font-mono"
            @click="closeLightbox"
          >
            ✕
          </button>

          <button
            v-if="allImages.length > 1"
            class="absolute left-4 text-purple-light/60 hover:text-purple-light text-3xl transition-colors z-10"
            @click="prevImage"
          >
            ‹
          </button>

          <img
            :src="currentImage"
            :alt="project?.title"
            class="max-h-[85vh] max-w-[90vw] rounded-xl object-contain
              shadow-[0_0_60px_rgba(125,72,201,0.3)]"
          />

          <button
            v-if="allImages.length > 1"
            class="absolute right-4 text-purple-light/60 hover:text-purple-light text-3xl transition-colors z-10"
            @click="nextImage"
          >
            ›
          </button>

          <p v-if="allImages.length > 1" class="absolute bottom-4 font-mono text-xs text-purple-light/50">
            [ {{ activeIndex + 1 }} / {{ allImages.length }} ]
          </p>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
