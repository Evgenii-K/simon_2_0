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
    recordTable.value.push(record)
    const table = JSON.stringify(recordTable.value)
    localStorage.setItem(ERecordType.SIMON_RECORD, table)
  }

  const maxScore = computed(() => {
    return Math.max(...recordTable.value.map(item => item.score))
  })

  return {
    maxScore,
    getRecordTable,
    recordTable,
    setRecordTable
  }
}

export default useController
