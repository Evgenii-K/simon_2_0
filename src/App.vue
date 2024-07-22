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
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  color: $tc-primary;
  padding: 2rem 1.6rem;
  position: relative;
  background-size: contain;

  @include br-tablet {
    @media(orientation: landscape) {
      height: 100dvh;
      min-height: auto;
    }
  }

  @include br-desktop {
    height: 100%;
    min-height: 100vh;
  }

  @include br-desktop-max {
    padding: 4rem 0;
    gap: 4rem;
  }
}
</style>
