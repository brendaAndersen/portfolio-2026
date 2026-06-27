import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'

export function useLenis() {
  let lenis
  let rafId

  onMounted(() => {
    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)
  })

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
    lenis?.destroy()
  })
}
