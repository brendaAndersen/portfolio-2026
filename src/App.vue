<script setup lang="ts">
import Atmosphere from '@/components/layout/Atmosphere.vue'
import Crust from '@/components/layout/Crust.vue'
import { useLenis } from './composables/useLenis'
import CursorCyber from './components/CursorCyber.vue';
useLenis()
</script>

<template>
  <Atmosphere />
  <RouterView />
  <Crust />
  <CursorCyber />
</template>
