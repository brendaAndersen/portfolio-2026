<!-- CursorFx.vue -->
<template>
  <div ref="dot" class="fixed top-0 left-0 z-[9999] pointer-events-none">
    <!-- Ponto central -->
    <div class="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-purple-light rounded-full" />
    <!-- Anel externo com delay -->
    <div
      ref="ring"
      class="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 border border-pink/60 rounded-full transition-transform duration-100"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)

let rx = 0,
  ry = 0
let mx = 0,
  my = 0

function onMove(e: MouseEvent) {
  mx = e.clientX
  my = e.clientY
  if (dot.value) {
    dot.value.style.transform = `translate(${mx}px, ${my}px)`
  }
}

function animate() {
  rx += (mx - rx) * 0.15
  ry += (my - ry) * 0.15
  if (ring.value) {
    ring.value.style.transform = `translate(${rx - mx}px, ${ry - my}px)`
  }
  requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  animate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
})
</script>
