<template>
  <Game :config="gameConfig" @ready="onReady">
    <TitleScene />
    <GameScene @gameOver="onGameOver" />
    <UIScene :result="result" @reset="onReset" />
  </Game>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import { Game } from 'phavuer'
import config from '../config'
import TitleScene from './TitleScene.vue'
import GameScene from './GameScene.vue'
import UIScene from './UIScene.vue'
const gameConfig = {
  type: Phaser.AUTO,
  width: config.WIDTH,
  height: config.HEIGHT,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  audio: {
    disableWebAudio: true
  },
  input: {
    activePointers: 3
  }
}
export default defineComponent({
  components: { Game, TitleScene, GameScene, UIScene },
  setup () {
    const game = ref<Phaser.Game>()
    const score = ref(0)
    const result = ref(false)
    const onGameOver = () => {
      game.value?.scene.pause('GameScene')
      result.value = true
    }
    const onReset = () => {
      game.value?.scene.stop('GameScene')
      game.value?.scene.stop('UIScene')
      game.value?.scene.start('TitleScene')
      result.value = false
    }
    provide('score', score)
    const onReady = (v: Phaser.Game) => {
      game.value = v
      config.BLEND_MODES.OVERLAY = (v.renderer as Phaser.Renderer.WebGL.WebGLRenderer).addBlendMode([WebGLRenderingContext.SRC_ALPHA, WebGLRenderingContext.ONE], WebGLRenderingContext.FUNC_ADD)
      window.addEventListener('resize', () => v.scale.refresh())
    }
    return {
      gameConfig,
      onGameOver,
      onReset,
      onReady,
      result
    }
  }
})
</script>
