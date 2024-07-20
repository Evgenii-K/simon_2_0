<template>
  <div
    :class="['button-item', { '_active': isActive, '_disable': disable }]"
    :style="{ 'background-color': color }"
    @click="$emit('onButtonClick')"
  />
</template>

<script setup lang="ts">
import './styles.scss'
import { defineProps } from 'vue'

defineProps({
  color: { type: String, default: '#c01b78' },
  isActive: { type: Boolean, default: false },
  disable: { type: Boolean, default: false },
})
</script>