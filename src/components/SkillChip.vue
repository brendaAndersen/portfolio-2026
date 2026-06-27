<template>
  <div class="skill-chip">
    <span class="dot" :style="{ background: skill.color }" />
    {{ skill.name }}
  </div>
</template>

<script setup>
defineProps({ skill: Object })
</script>

<style scoped>
.skill-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: 9999px;
  border: 1px solid rgba(130, 52, 233, 0.35);
  background: rgba(130, 52, 233, 0.08);
  color: #c4b5fd;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  cursor: default;
  transition:
    border-color 0.2s,
    background 0.2s;
}
.skill-chip:hover {
  border-color: rgba(213, 74, 213, 0.6);
  background: rgba(213, 74, 213, 0.12);
  color: #f0abf0;
}
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
