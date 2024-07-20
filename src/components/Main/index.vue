<template>
  <h1>Simon Game</h1>

  <div class="main__wrapper">
    <game-block />
    <statistic />
  </div>
</template>

<script setup lang="ts">
import './styles.scss'
import GameBlock from './Modules/GameBlock/GameBlock.vue'
import Statistic from './Modules/Statistic/Statistic.vue'
</script>
