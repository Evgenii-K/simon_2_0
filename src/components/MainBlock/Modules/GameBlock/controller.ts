import { computed, reactive, ref, Ref } from 'vue'
import moment from 'moment';
import { Howl } from 'howler';

type props = {
  emits: (event: 
    'updateStatistic'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    , ...args: any) => void,
  difficultyLevel: Ref<number>,
  blocksCountLevel: Ref<number>,
}

const useController = ({ emits, difficultyLevel, blocksCountLevel }: props) => {
  const errorSound = new Howl({src: [require('/src/assets/sound/error.mp3')], html5:true})
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
  const waitBeforeNextStep = 1000

  const buttons = reactive([
    { id: 0, color: '#ffea37', isActive: false, sound: new Howl({src: [require('/src/assets/sound/simonSound1.mp3')], html5:true}) },
    { id: 1, color: '#4b3edd', isActive: false, sound: new Howl({src: [require('/src/assets/sound/simonSound2.mp3')], html5:true}) },
    { id: 2, color: '#dd4b3e', isActive: false, sound: new Howl({src: [require('/src/assets/sound/simonSound3.mp3')], html5:true}) },
    { id: 3, color: '#3edd4b', isActive: false, sound: new Howl({src: [require('/src/assets/sound/simonSound4.mp3')], html5:true}) },
    { id: 4, color: '#9098a0', isActive: false, sound: new Howl({src: [require('/src/assets/sound/simonSound1.mp3')], html5:true}) },
    { id: 5, color: '#c01b78', isActive: false, sound: new Howl({src: [require('/src/assets/sound/simonSound2.mp3')], html5:true}) },
  ])

  const buttonsForGame = computed(() => {
    return buttons.slice(0, blocksCountLevel.value)
  })

  const getDate = () => {
    return moment().format('DD.MM.YYYY HH:mm:ss')
  }

  const onButtonClick = (id: number) => {
    if (gameState.isLoading) return
    buttons[id].sound.play()
    if (!gameState.isStarted) return
    if (id !== randomState[step.value]) {
      errorSound.play()
      stopGame()
      gameState.isError = true
      emits('updateStatistic', {
        dateTime: getDate(),
        score: currentScore.value,
      })
      clearTimeouts()
      nextStepTimeout = setTimeout(() => {
        gameState.isError = false
      }, waitBeforeNextStep * 2)
      return
    }

    step.value++

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
    const randomColor = Math.floor(Math.random() * blocksCountLevel.value)
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
      gameStep.value++
      runStep()
    }, difficultyLevel.value * 2)
  }

  const showColor = () => {
    clearTimeouts()
    buttons.forEach(button => {
      if (button.id === randomState[gameStep.value]) {
        button.isActive = true
        button.sound.play()
      }
    })

    runShowColorTimeout = setTimeout(() => {
      buttons.forEach(button => button.isActive = false)
    }, difficultyLevel.value)
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

  const resetGame = () => {
    currentScore.value = 0
    gameState.isError = false
    stopGame()
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
    onButtonClick,
    gameState,
    startGame,
    blocksCountLevel,
    buttonsForGame,
    resetGame
  }
}

export default useController
