<template>
  <section class="main-block">
    <controls-block 
      :blocksCountLevel="blocksCountLevel"
      :speedLevel="speedLevel"
      @updateSpeedLevel="updateSpeedLevel"
      @updateBlocksCountLevel="updateBlocksCountLevel"
      @openTable="toggleTable"
      @openSkinsTable="toggleSkinsTable"
    />
    <game-block
      :maxScore="maxScore"
      :difficultyLevel="difficultyLevel[speedLevel]"
      :speedLevel="speedLevel"
      :blocksCountLevel="blocksCountLevel"
      @updateStatistic="setRecordTable"
    />
    <Transition name="fade">
      <popup-block
        v-if="isStaticTableOpened"
        @closePopup="toggleTable"
        title="Game Score"
      >
        <statistic-table
          :recordTable="recordTable"
        />
      </popup-block>
    </Transition>
    <Transition name="fade">
      <popup-block
        v-if="isSkinsTableOpened"
        @closePopup="toggleSkinsTable"
        title="Change Skin"
      >
        <skins-table
          :skinsFileTable="skinsFileTable"
          @addSkin="addSkin"
          @clearSkin="clearSkin"
          @applySkin="applySkin"
          @removeSkin="removeSkin"
        />
      </popup-block>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import './styles.scss'
import GameBlock from './Modules/GameBlock/GameBlock.vue'
import StatisticTable from './Modules/StatisticTable/StatisticTable.vue'
import SkinsTable from './Modules/SkinsTable/SkinsTable.vue'
import ControlsBlock from './Modules/ControlsBlock/ControlsBlock.vue'
import PopupBlock from './Modules/PopupBlock/PopupBlock.vue'
import useController from './controller'

  // TODO: адаптив

const {
  maxScore,
  getRecordTable,
  recordTable,
  setRecordTable,
  updateSpeedLevel,
  speedLevel,
  difficultyLevel,
  blocksCountLevel,
  updateBlocksCountLevel,
  toggleTable,
  isStaticTableOpened,
  addSkin,
  toggleSkinsTable,
  isSkinsTableOpened,
  skinsFileTable,
  clearSkin,
  removeSkin,
  applySkin
} = useController()

onMounted(() => {
  getRecordTable()
})
</script>
