import { computed, reactive, ref } from 'vue'

const useController = () => {
  const currentScore = ref<number>(0)
  const gameState = reactive({
    isStarted: false,
    isLoading: false,
    isError: false
  })
  const step = ref(0)
  const gameStep = ref(0)
  let runStepTimeout: ReturnType<typeof setTimeout>
  let runShowColorTimeout: ReturnType<typeof setTimeout>
  let nextStepTimeout: ReturnType<typeof setTimeout>
  const difficultyLevel = 1000
  const waitBeforeNextStep = 1000

  const buttons = reactive([
    { id: 0, color: '#ffea37', isActive: false },
    { id: 1, color: '#4b3edd', isActive: false },
    { id: 2, color: '#dd4b3e', isActive: false },
    { id: 3, color: '#3edd4b', isActive: false }
  ])

  const onButtonClick = (id: number) => {
    if (gameState.isLoading || !gameState.isStarted) return
    // TODO: звук нажатия на кнопку
    if (id !== randomState[step.value]) {
      stopGame()
      gameState.isError = true
      nextStepTimeout = setTimeout(() => {
        gameState.isError = false
      }, waitBeforeNextStep * 2)
      // TODO: записать в рекорды
      return
    }

    step.value += 1

    if (step.value < stepsCount.value) return
    clearTimeouts()
    gameState.isLoading = true
    nextStepTimeout = setTimeout(() => {
      currentScore.value = stepsCount.value
      addNextStep()
      runStep()
    }, waitBeforeNextStep)
  }

  const randomState = reactive<number[]>([])

  const stepsCount = computed(() => randomState.length)

  const addNextStep = () => {
    step.value = 0
    const randomColor = Math.floor(Math.random() * 4)
    randomState.push(randomColor)
  }

  const runStep = () => {
    clearTimeouts()

    if (gameStep.value >= stepsCount.value) {
      gameState.isLoading = false
      gameStep.value = 0
      return
    }
    
    showColor()
    runStepTimeout = setTimeout(() => {
      gameStep.value += 1
      runStep()
    }, difficultyLevel * 2)
  }

  const showColor = () => {
    clearTimeouts()
    buttons.forEach(button => {
      if (button.id === randomState[gameStep.value]) {
        button.isActive = true
      }
    })

    runShowColorTimeout = setTimeout(() => {
      buttons.forEach(button => button.isActive = false)
    }, difficultyLevel)
  }

  const startGame = () => {
    if (gameState.isStarted) {
      gameState.isError = false
      stopGame()
    } else {
      gameState.isStarted = true
      gameState.isLoading = true
      currentScore.value = 0
      addNextStep()
      runStep()
    }
  }

  const clearTimeouts = () => {
    if (runShowColorTimeout) clearTimeout(runShowColorTimeout)
    if (runStepTimeout) clearTimeout(runStepTimeout)
    if (nextStepTimeout) clearTimeout(nextStepTimeout)
  }

  const stopGame = () => {
    clearTimeouts()
    buttons.forEach(button => button.isActive = false)
    gameState.isLoading = false
    gameState.isStarted = false
    gameStep.value = 0
    step.value = 0
    randomState.length = 0
  }

  return {
    currentScore,
    buttons,
    onButtonClick,
    gameState,
    startGame,
  }
}

export default useController
