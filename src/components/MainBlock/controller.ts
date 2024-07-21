import { computed, ref } from 'vue'
import { ERecordType, IRecord, ISkin } from './types';

enum ELevalCount {
  STANDARD = 4,
  EXTENDED = 6
}

const useController = () => {
  const recordTable = ref<IRecord[]>([])
  const app = document.getElementById('app')

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

  const blocksCountLevel = ref<number>(ELevalCount.STANDARD)
  const updateBlocksCountLevel = () => {
    if (blocksCountLevel.value === ELevalCount.STANDARD) {
      blocksCountLevel.value = ELevalCount.EXTENDED
    } else {
      blocksCountLevel.value = ELevalCount.STANDARD
    }
  }

  const isStaticTableOpened = ref<boolean>(false)
  const toggleTable = () => {
    isStaticTableOpened.value = !isStaticTableOpened.value
    if (isStaticTableOpened.value) {
      scrollBarHidden()
    } else {
      scrollBarShow()
    }
  }

  const isSkinsTableOpened = ref<boolean>(false)
  const toggleSkinsTable = () => {
    isSkinsTableOpened.value = !isSkinsTableOpened.value
    if (isSkinsTableOpened.value) {
      scrollBarHidden()
    } else {
      scrollBarShow()
    }
  }

  const scrollBarWidth = computed(() => {
    const appOffsetWidth = document?.querySelector<HTMLElement>('#app')?.offsetWidth ?? 0
    return `${window.innerWidth - appOffsetWidth}px`
  })

  const scrollBarHidden = () => {
    document.body.style.paddingRight = scrollBarWidth.value
    document.body.style.overflow = 'hidden';
  }

  let scrollBarTimeout: ReturnType<typeof setTimeout>
  const scrollBarShow = () => {
    if (scrollBarTimeout) clearTimeout(scrollBarTimeout)
      scrollBarTimeout = setTimeout(() => {
        document.body.style.paddingRight = '0px'
        document.body.style.overflow = 'auto'
      }, 500);
  }
  
  const skinsFileTable = ref<ISkin[]>([])
  const skinNames = computed(() => {
    return skinsFileTable.value.map(file => file.name)
  })
  const addSkin = (event: Event) => {
    const file = (<HTMLInputElement>event?.target)?.files?.[0]
    if (!file || skinNames.value.includes(file.name)) return
    skinsFileTable.value.push({ name: file.name, file });
    (<HTMLInputElement>event.target).value = '';
    applySkin(skinsFileTable.value.length - 1)
  }

  const applySkin = (idx: number) => {
    const file = skinsFileTable.value[idx]?.file
    if (!file) return 
    const reader = new FileReader();
    reader.onloadend = () => {
      if (!reader.result) return
      if (!app) return
      app.style.backgroundImage = `url(${reader.result as string})`
      app.dataset.name = file.name
    }
    reader.readAsDataURL(file);
  }

  const removeSkin = ({name, idx}: {name: string, idx: number}) => {
    skinsFileTable.value.splice(idx, 1);
    if (app?.dataset?.name !== name) return 
    clearSkin()
  }

  const clearSkin = () => {
    if (!app) return
    app.style.backgroundImage = ''
    app.dataset.name = ''
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
    updateBlocksCountLevel,
    toggleTable,
    isStaticTableOpened,
    addSkin,
    isSkinsTableOpened,
    toggleSkinsTable,
    skinsFileTable,
    clearSkin,
    removeSkin,
    applySkin
  }
}

export default useController
