import { Ref } from 'vue';

type props = {
  wrapper: Ref<null | HTMLElement>,
  emits: (event: 'closeTable') => void,
}

const useController = ({ wrapper, emits }: props) => {
  const clickOutside = (event: Event) => {
    if (wrapper.value !== event.target) return 
    emits('closeTable')
  }

  return {
    clickOutside
  }
}

export default useController
