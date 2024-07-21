import { computed, ref } from 'vue'
import { ERecordType, IRecord } from './types';

const useController = () => {
  const recordTable = ref<IRecord[]>([])

  const getRecordTable = () => {
    const table = localStorage.getItem(ERecordType.SIMON_RECORD);
    if (!table) return
    recordTable.value = JSON.parse(table) as IRecord[]
  }

  const setRecordTable = (record: IRecord) => {
    if (record.score <= maxScore.value) return
    recordTable.value.push(record)
    const table = JSON.stringify(recordTable.value)
    localStorage.setItem(ERecordType.SIMON_RECORD, table)
  }

  const maxScore = computed(() => {
    if (!recordTable.value.length) return 0 
    return Math.max(...recordTable.value.map(item => item.score))
  })

  const speedLevel = ref<number>(0)
  const difficultyLevel = [1000, 700, 500, 300]
  const updateSpeedLevel = () => {
    if ((speedLevel.value + 1) === difficultyLevel.length) {
      speedLevel.value = 0
      return
    }

    speedLevel.value++
  }

  const blocksCountLevel = ref<number>(6)
  const updateBlocksCountLevel = () => {
    if (blocksCountLevel.value === 4) {
      blocksCountLevel.value = 6
    } else {
      blocksCountLevel.value = 4
    }
  }

  return {
    maxScore,
    getRecordTable,
    recordTable,
    setRecordTable,
    updateSpeedLevel,
    speedLevel,
    difficultyLevel,
    blocksCountLevel,
    updateBlocksCountLevel
  }
}

export default useController
