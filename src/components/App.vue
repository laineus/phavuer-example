<template>
  <div>
    <TitleScene />
    <GameScene @gameOver="onGameOver" />
    <UIScene :result="result" @reset="onReset" />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import { useGame } from 'phavuer'
import TitleScene from './TitleScene.vue'
import GameScene from './GameScene.vue'
import UIScene from './UIScene.vue'
export default defineComponent({
  components: { TitleScene, GameScene, UIScene },
  setup () {
    const game = useGame()
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
})
</script>
