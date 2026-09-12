<template>
  <Scene name="TitleScene" :autoStart="true" @preload="preload" v-slot="{ preloaded }">
    <Image texture="title" :origin="0" @pointerdown="onClick" v-if="preloaded" />
  </Scene>
</template>

<script setup lang="ts">
import { Scene, Image, useGame } from 'phavuer'
import loadAssets from '../loadAssets'

const game = useGame()

const onClick = () => {
  game.scene.start('GameScene')
  game.scene.start('UIScene')
  game.scene.stop('TitleScene')
}

const preload = (scene: Phaser.Scene) => {
  loadAssets(scene)
}
</script>
