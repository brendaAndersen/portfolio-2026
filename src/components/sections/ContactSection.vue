<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <Transition name="zoom">
          <div
            v-if="isOpen"
            class="relative bg-bg-darker border border-purple-light/30 rounded-xl p-8 max-w-md w-full mx-4 shadow-[0_0_40px_rgba(125,72,201,0.2)]"
          >
            <button
              class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              @click="$emit('close')"
            >
              ✕
            </button>

            <div class="text-4xl mb-4 animate-float">⟨/⟩</div>

            <h3 class="text-2xl font-bold text-white mb-2 font-orbitron">
              INIT_CONTACT<span class="text-purple-light">.exe</span>
            </h3>

            <p class="text-gray-400 text-xs mb-6 leading-relaxed">
              Canal seguro disponível. <br />
              Nenhuma mensagem perdida na rede. <br />
              Tempo de resposta: <span class="text-purple-light font-bold">imediato,</span> quando
              não há ataques cibernéticos. <br />
            </p>
            <p class="fs-8 pb-2">
              <span class="text-purple-light font-bold">Olá!</span> Obrigada pelo interesse, abaixo
              pode entrar em contato! Ah, e não esqueça de verificar meu currículo! <br />
            </p>
            <div class="flex flex-col md:flex-row items-center gap-3 mt-3">
              <a
                :href="whatsappUrl"
                target="_blank"
                class="w-full md:flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600/20 border border-green-500/40 text-green-400 rounded-lg transition-all duration-300 font-medium hover:animate-glitch hover:bg-green-600/40 hover:border-green-400 hover:text-white hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                <span>▸</span> HACKEAR MATRIX
              </a>

              <a
                href="https://drive.google.com/file/d/1cB5hn5P23Vs-V24FR0JQYBMrqdNUgELd/view?usp=sharing"
                download
                class="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple/10 border border-purple-light/30 text-purple-light rounded-lg transition-all duration-300 font-medium hover:bg-purple/30 hover:border-purple-light hover:text-white hover:shadow-[0_0_20px_rgba(125,72,201,0.3)]"
              >
                <span class="text-xs opacity-60">~$</span> get ./cv.pdf
              </a>
            </div>
            <div
              class="mt-6 pt-4 border-t border-purple-light/10 text-xs text-gray-600 text-center"
            >
              [ CONEXÃO CRIPTOGRAFADA // DEV.SHELL ]
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    isOpen?: boolean
    phone?: string
    message?: string
  }>(),
  {
    isOpen: false,
    phone: '5551984981330',
    message: 'Olá! Vim pelo seu portfolio e gostaria de conversar.',
  },
)

defineEmits<{
  close: []
}>()

const whatsappUrl = computed(
  () => `https://wa.me/${props.phone}?text=${encodeURIComponent(props.message)}`,
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s ease;
}
.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
</style>
