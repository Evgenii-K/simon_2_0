<template>
  <div class="game-block">
    <score-screen
      :max-score="maxScore"
      :current-score="currentScore"
      :is-started="gameState.isStarted"
      :is-error="gameState.isError"
      :is-loading="gameState.isLoading"
      @startGame="startGame"
    />
    <button-item
      v-for="button in buttons"
      :key="button.id"
      :color="button.color"
      :is-active="button.isActive"
      @click="onButtonClick(button.id)"
      :disable="gameState.isLoading"
    />
  </div>
</template>

<script setup lang="ts">
import './styles.scss'
import ScoreScreen from './Modules/ScoreScreen/ScoreScreen.vue'
import ButtonItem from './Modules/ButtonItem/ButtonItem.vue'
import useController from './controller'
import { defineProps } from 'vue'

defineProps({
  maxScore: { type: Number, default: 0 },
})

const {
  currentScore,
  buttons,
  onButtonClick,
  gameState,
  startGame,
} = useController()
</script>