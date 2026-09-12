<template>
  <Game :config="gameConfig" @ready="onReady">
    <TitleScene />
    <GameScene @gameOver="onGameOver" />
    <UIScene :result="result" @reset="onReset" />
  </Game>
</template>

<script setup lang="ts">
import * as Phaser from 'phaser'
import { provide, ref } from 'vue'
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
      gravity: { x: 0, y: 0 }
    }
  },
  audio: {
    disableWebAudio: true
  },
  input: {
    activePointers: 3
  }
}
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

const onReady = (value: Phaser.Game) => {
  game.value = value
  window.addEventListener('resize', () => value.scale.refresh())
}
</script>
