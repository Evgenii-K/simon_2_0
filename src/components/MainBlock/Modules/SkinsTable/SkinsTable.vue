<template>
  <div class="skins-table">
    <div class="skins-table__header">
      <div class="skins-table__add">
        Add Skin
        <input
          type="file"
          @change="(event) => $emit('addSkin', event)"
          class="skins-table__input"
          accept="image/png, image/jpeg"
        />
      </div>
      <div class="skins-table__clear" @click="$emit('clearSkin')">Clear skin</div>
    </div>
    <div class="skins-table__content">
      <div
        class="skins-table__item"
        v-for="skin, idx in skinsFileTable"
        :key="skin.name + idx"
      >
        <div class="skins-table__ceil">{{ skin.name }}</div>
        <div class="skins-table__ceil skins-table__ceil--selectable" @click="$emit('removeSkin', {name: skin.name, idx})">Remove</div>
        <div class="skins-table__ceil skins-table__ceil--selectable" @click="$emit('applySkin', idx)">Apply</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import './styles.scss'
import { ISkin } from '../../types';

defineProps({
  skinsFileTable: { type: Array as PropType<ISkin[]>, default: () => [] },
})

defineEmits(['addSkin', 'clearSkin', 'removeSkin', 'applySkin'])
</script>