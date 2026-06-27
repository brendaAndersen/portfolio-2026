import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'

export function useLenis() {
  let lenis: Lenis | null = null
  let rafId: number | null = null

  onMounted(() => {
    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis?.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)
  })

  onUnmounted(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
    lenis?.destroy()
  })
}
