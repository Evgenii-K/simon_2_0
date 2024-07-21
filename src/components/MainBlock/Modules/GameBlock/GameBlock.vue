<template>
  <div :class="['game-block', `game-block--${buttonsForGame.length}`]">
    <score-screen
      :max-score="maxScore"
      :current-score="currentScore"
      :is-started="gameState.isStarted"
      :is-error="gameState.isError"
      :is-loading="gameState.isLoading"
      @startGame="startGame"
    />
    <button-item
      v-for="button in buttonsForGame"
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
import { defineProps, defineEmits, toRef, watch } from 'vue'

const emits = defineEmits(['updateStatistic'])

const props = defineProps({
  maxScore: { type: Number, default: 0 },
  difficultyLevel: { type: Number, default: 1000 },
  blocksCountLevel: { type: Number, default: 4 },
  speedLevel: { type: Number, default: 0 },
})

watch(() => props.difficultyLevel, () => {
  resetGame()
})

watch(() => props.blocksCountLevel, () => {
  resetGame()
})

const {
  currentScore,
  buttonsForGame,
  onButtonClick,
  gameState,
  startGame,
  resetGame
} = useController({
  emits,
  difficultyLevel: toRef(props, 'difficultyLevel'),
  blocksCountLevel: toRef(props, 'blocksCountLevel'),
  speedLevel: toRef(props, 'speedLevel'),
})
</script>