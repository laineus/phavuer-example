<template>
  <Scene name="TitleScene" :autoStart="true" @preload="preload">
    <Image texture="title" :origin="0" @pointerdown="onClick" />
  </Scene>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Scene, Image, useGame } from 'phavuer'
import loadAssets from '../loadAssets'
export default defineComponent({
  components: { Scene, Image },
  setup () {
    const game = useGame()
    const onClick = () => {
      game.scene.start('GameScene')
      game.scene.start('UIScene')
      game.scene.stop('TitleScene')
    }
    const preload = (scene: Phaser.Scene) => {
      loadAssets(scene)
    }
    return {
      onClick,
      preload
    }
  }
})
</script>
