<template>
  <div class="popup-block">
    <div class="popup-block__wrapper" @click="clickOutside" ref="wrapper">
      <div class="popup-block__content">
        <div class="popup-block__header">
          <div class="popup-block__title">
            {{ title }}
          </div>
          <div
            class="popup-block__close"
            @click="$emit('closePopup')"
          >
            x
          </div>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import './styles.scss'
import { defineProps, defineEmits, ref, toRef } from 'vue'
import useController from './controller';

const wrapper = ref(null)

defineProps({
  title: { type: String, default: '' },
})

const emits = defineEmits(['closePopup'])

const {
  clickOutside
} = useController({ wrapper: toRef(wrapper), emits })

</script>