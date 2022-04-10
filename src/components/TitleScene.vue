<template>
  <Scene name="TitleScene" :autoStart="true" @preload="preload">
    <Image texture="title" :origin="0" @pointerdown="onClick" />
  </Scene>
</template>

<script>
import { Scene, Image, useGame } from 'phavuer'
import loadAssets from '../loadAssets'
export default {
  components: { Scene, Image },
  setup () {
    const game = useGame()
    const onClick = () => {
      game.scene.start('GameScene')
      game.scene.start('UIScene')
      game.scene.stop('TitleScene')
    }
    const preload = (scene) => {
      loadAssets(scene)
    }
    return {
      onClick,
      preload
    }
  }
}
</script>
