<template>
  <section class="main-block container">
    <controls-block 
      :blocksCountLevel="blocksCountLevel"
      :speedLevel="speedLevel"
      @updateSpeedLevel="updateSpeedLevel"
      @updateBlocksCountLevel="updateBlocksCountLevel"
    />
    <game-block
      :maxScore="maxScore"
      :difficultyLevel="difficultyLevel[speedLevel]"
      :blocksCountLevel="blocksCountLevel"
      @updateStatistic="setRecordTable"
    />
    <statistic-table
      :recordTable="recordTable"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import './styles.scss'
import GameBlock from './Modules/GameBlock/GameBlock.vue'
import StatisticTable from './Modules/StatisticTable/StatisticTable.vue'
import ControlsBlock from './Modules/ControlsBlock/ControlsBlock.vue'
import useController from './controller'

    // TODO: статистика
    // TODO: скин игрового поля

const {
  maxScore,
  getRecordTable,
  recordTable,
  setRecordTable,
  updateSpeedLevel,
  speedLevel,
  difficultyLevel,
  blocksCountLevel,
  updateBlocksCountLevel
} = useController()

onMounted(() => {
  getRecordTable()
})
</script>
