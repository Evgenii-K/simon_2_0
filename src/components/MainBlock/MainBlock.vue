<template>
  <div class="main-block container">
    <game-block />
    <statistic-table />
  </div>
</template>

<script setup lang="ts">
import './styles.scss'
import GameBlock from './Modules/GameBlock/GameBlock.vue'
import StatisticTable from './Modules/StatisticTable/StatisticTable.vue'
</script>
