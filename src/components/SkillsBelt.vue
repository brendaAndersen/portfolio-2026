<template>
  <section class="py-16 bg-bg-primary" id="skills">
    <div class="container">
      <div class="mb-10 text-center">
        <h2 class="font-orbitron text-2xl font-bold text-white">
          Tech <span class="text-purple">Stack</span>
        </h2>
      </div>

      <div class="relative overflow-hidden">
        <div class="track-fade-left" />
        <div class="track-fade-right" />
        <div
          class="flex gap-4 w-max animate-scroll-left"
          @mouseenter="pause1 = true"
          @mouseleave="pause1 = false"
          :style="{ animationPlayState: pause1 ? 'paused' : 'running' }"
        >
          <SkillChip v-for="(skill, i) in doubled(row1)" :key="i" :skill="skill" />
        </div>
      </div>

      <div class="relative overflow-hidden mt-4">
        <div class="track-fade-left" />
        <div class="track-fade-right" />
        <div
          class="flex gap-4 w-max animate-scroll-right"
          @mouseenter="pause2 = true"
          @mouseleave="pause2 = false"
          :style="{ animationPlayState: pause2 ? 'paused' : 'running' }"
        >
          <SkillChip v-for="(skill, i) in doubled(row2)" :key="i" :skill="skill" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import SkillChip from './SkillChip.vue'

const pause1 = ref(false)
const pause2 = ref(false)
const row1 = [
  { name: 'Laravel', color: '#FF2D20' },
  { name: 'Node.js', color: '#5FA04E' },
  { name: 'Express', color: '#444444' },
  { name: 'Python', color: '#3776AB' },
  { name: 'Java', color: '#ED8B00' },
  { name: 'SpringBoot', color: '#6DB33F' },
  { name: 'C', color: '#A8B9CC' },
  { name: 'C++', color: '#00599C' },
  { name: 'C#', color: '#512BD4' },
  { name: 'PHP', color: '#777BB4' },
  { name: 'Prisma ORM', color: '#2D3748' },
  { name: 'Fastify', color: '#000000' },
  { name: 'Zabbix', color: '#D40000' },
  { name: 'Docker', color: '#2496ED' },
]

const row2 = [
  { name: 'Vue 3', color: '#42B883' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#000000' },
  { name: 'Inertia.js', color: '#9553E9' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'MySQL', color: '#4479A1' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'SQLite', color: '#003B57' },
  { name: 'Redis', color: '#DC382D' },
  { name: 'Linux', color: '#FCC624' },
]
const doubled = (arr) => [...arr, ...arr]
</script>
