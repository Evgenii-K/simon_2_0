<template>
  <div class="game-block">
    <score-screen
      :max-score="maxScore"
      :current-score="currentScore"
    />
    <button-item />
    <button-item />
    <button-item />
    <button-item />
  </div>
</template>

<script setup lang="ts">
import './styles.scss'
import ScoreScreen from './Modules/ScoreScreen/ScoreScreen.vue'
import ButtonItem from './Modules/ButtonItem/ButtonItem.vue'
import useController from './controller'

const {
  currentScore,
  maxScore
} = useController()

</script>