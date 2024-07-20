<template>
  <h1>Simon Game</h1>
  <main-block />
</template>

<script setup lang="ts">
import MainBlock from './components/MainBlock/MainBlock.vue';
</script>

<style lang="scss">
@import '../src/styles/index.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-rows: max-content 1fr;
  gap: 4rem;
  color: $tc-primary;
  padding: 4rem 0;
}
</style>
