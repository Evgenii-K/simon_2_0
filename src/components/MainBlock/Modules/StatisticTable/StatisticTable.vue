<template>
  <div class="statistic-table">
    <div class="statistic-table__header">
      <div class="statistic-table__ceil">Date</div>
      <div class="statistic-table__ceil">Game Score</div>
      <div class="statistic-table__ceil">Speed Level</div>
    </div>
    <div class="statistic-table__content">
      <div
        class="statistic-table__item"
        v-for="record in recordTable"
        :key="record.dateTime"
      >
        <div class="statistic-table__ceil">{{ record.dateTime }}</div>
        <div class="statistic-table__ceil">{{ record.score }}</div>
        <div class="statistic-table__ceil">{{ record.speedLevel }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import './styles.scss'
import { defineProps, PropType } from 'vue'
import { IRecord } from '../../types';

defineProps({
  recordTable: { type: Array as PropType<IRecord[]>, default: () => [] },
})
</script>