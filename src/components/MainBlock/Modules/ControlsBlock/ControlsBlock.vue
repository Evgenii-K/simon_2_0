<template>
  <div class="controls-block">
    <button class="controls-block__button" @click="$emit('openTable')">Statistic</button>
    <button class="controls-block__button" @click="$emit('updateSpeedLevel')">Speed level {{ speedLevel + 1 }}</button>
    <button class="controls-block__button" @click="$emit('updateBlocksCountLevel')">Blocks level {{ blocksCountLevel }}</button>
    <button class="controls-block__button" @click="$emit('openSkinsTable')">Change Skin</button>
  </div>
</template>

<script setup lang="ts">
import './styles.scss'

defineProps({
  speedLevel: { type: Number, default: 0 },
  blocksCountLevel: { type: Number, default: 4 }
})

defineEmits(['updateSpeedLevel', 'updateBlocksCountLevel', 'openTable', 'openSkinsTable'])
</script>