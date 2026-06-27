<script setup lang="ts">
import Atmosphere from '@/components/layout/Atmosphere.vue'
import Crust from '@/components/layout/Crust.vue'
import { useLenis } from './composables/useLenis'
useLenis()
</script>

<template>
  <Atmosphere />
  <RouterView />
  <Crust />
</template>
