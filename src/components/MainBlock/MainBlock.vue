<template>
  <div class="main-block container">
    <game-block
      :maxScore="maxScore"
    />
    <statistic-table
      :recordTable="recordTable"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import './styles.scss'
import GameBlock from './Modules/GameBlock/GameBlock.vue'
import StatisticTable from './Modules/StatisticTable/StatisticTable.vue'
import useController from './controller'

const {
  maxScore,
  getRecordTable,
  recordTable
} = useController()

onMounted(() => {
  getRecordTable()
})
</script>
