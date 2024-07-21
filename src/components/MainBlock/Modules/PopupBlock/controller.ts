import { Ref } from 'vue';

type props = {
  wrapper: Ref<null | HTMLElement>,
  emits: (event: 'closePopup') => void,
}

const useController = ({ wrapper, emits }: props) => {
  const clickOutside = (event: Event) => {
    if (wrapper.value !== event.target) return 
    emits('closePopup')
  }

  return {
    clickOutside
  }
}

export default useController
