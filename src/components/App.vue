<template>
  <div>
    <TitleScene />
    <GameScene @gameOver="onGameOver" />
    <UIScene :result="result" @reset="onReset" />
  </div>
</template>

<script>
import { provide, inject, ref } from 'vue'
import TitleScene from './TitleScene'
import GameScene from './GameScene'
import UIScene from './UIScene'
export default {
  components: { TitleScene, GameScene, UIScene },
  setup () {
    const game = inject('game')
    const score = ref(0)
    const result = ref(false)
    const onGameOver = () => {
      game.scene.pause('GameScene')
      result.value = true
    }
    const onReset = () => {
      game.scene.stop('GameScene')
      game.scene.stop('UIScene')
      game.scene.start('TitleScene')
      result.value = false
    }
    provide('score', score)
    return {
      onGameOver,
      onReset,
      result
    }
  }
}
</script>
