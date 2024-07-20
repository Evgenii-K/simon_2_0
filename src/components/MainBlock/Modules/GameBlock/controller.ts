import { ref } from 'vue'

const useController = () => {
  const currentScore = ref<number>(20);
  const maxScore = ref<number>(0);

  return {
    currentScore,
    maxScore
  }
}

export default useController
