<template>
  <div class="score-screen">
    <div class="score-screen__title">Score</div>
    <div class="score-screen__current">Current: {{ currentScore }}</div>
    <div class="score-screen__max">Max: {{ maxScore ? maxScore : currentScore }}</div>
  </div>
</template>

<script setup lang="ts">
import './styles.scss'
import { defineProps } from 'vue'

defineProps({
  maxScore: { type: Number, default: 0 },
  currentScore: { type: Number, default: 0 }
})
</script>