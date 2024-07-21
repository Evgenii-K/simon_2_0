<template>
  <div
    :class="['score-screen', { 'score-screen--loading': isLoading, 'score-screen--error': isError }]"
  >
    <div class="score-screen__title">Score</div>
    <div class="score-screen__number">Current: {{ currentScore }}</div>
    <div class="score-screen__number">Max: {{ !!maxScore ? maxScore : currentScore }}</div>
    <div class="score-screen__buttons">
      <button
        class="score-screen__button score-screen__button--single"
        @click="$emit('startGame')"
      >
        {{ isStarted ? 'Stop' : 'Start' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import './styles.scss'
import { defineProps } from 'vue'

defineProps({
  maxScore: { type: Number, default: 0 },
  currentScore: { type: Number, default: 0 },
  isStarted: { type: Boolean, default: false },
  isLoading: { type: Boolean, default: false },
  isError: { type: Boolean, default: false },
})
</script>