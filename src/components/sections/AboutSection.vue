<template>
  <section class="relative w-full pt-18 bg-bg-darker overflow-hidden" id="hero">
    <span id="about" class="absolute top-0" aria-hidden="true" />

    <img
      src="@/assets/background.png"
      alt=""
      class="absolute inset-0 w-full h-full object-cover object-center"
    />

    <div class="absolute inset-0 bg-bg-darker/40" />

    <div
      class="relative z-10 container min-h-200 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] lg:grid-cols-[0.9fr_1.1fr] items-center gap-6 lg:gap-10 py-20"
    >
      <div class="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
        <h1
          class="bg-gradient-to-r from-purple via-pink-400 to-fuchsia-900 bg-clip-text text-transparent text-4xl md:text-5xl font-bold font-orbitron animate-typewriter overflow-hidden whitespace-nowrap border-r-2 border-purple-light w-fit"
        >
          Brenda Andersen
        </h1>

        <small class="text-slate-300 text-[20px] font-bold font-mono block">
          Fullstack Developer
        </small>
        <button
          @click="modalOpen = true"
          class="px-6 py-2 bg-transparent text-pink border border-pink/50 rounded-lg transition-all duration-300 hover:border-pink hover:shadow-[0_0_15px_rgba(213,74,213,0.5)] hover:text-white cursor-pointer"
        >
          ~$ ping dev
        </button>
      </div>

      <div class="flex justify-center md:justify-end">
        <img
          src="@/assets/gif.gif"
          alt=""
          class="w-full max-w-xl rounded-lg object-cover shadow-2xl shadow-purple-dark/20 animate-glow transition-all duration-500 ease-out hover:scale-105 hover:cursor-pointer active:animate-click-combo active:duration-100"
        />
      </div>
    </div>
    <ContactModal
      :is-open="modalOpen"
      phone="5554999999999"
      message="Olá! Vim pelo seu portfolio"
      @close="modalOpen = false"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContactModal from './ContactSection.vue'

const modalOpen = ref(false)
</script>
