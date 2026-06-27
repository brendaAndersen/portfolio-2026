import { onMounted, onUnmounted } from 'vue'

export function useReveal(selector = '[data-reveal]') {
  let observer: IntersectionObserver

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up')
            entry.target.classList.remove('opacity-0')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    document.querySelectorAll(selector).forEach((el) => {
      observer.observe(el)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
