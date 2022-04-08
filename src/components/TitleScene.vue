<template>
  <Scene ref="scene" name="TitleScene" :autoStart="true" @preload="preload">
    <Image texture="title" :origin="0" @pointerdown="onClick" />
  </Scene>
</template>

<script>
import { refScene, Scene, Image } from 'phavuer'
import loadAssets from '../loadAssets'
export default {
  components: { Scene, Image },
  setup (props) {
    const scene = refScene(null)
    const onClick = () => {
      scene.value.scene.start('GameScene')
      scene.value.scene.start('UIScene')
    }
    const preload = (scene) => {
      loadAssets(scene)
    }
    return {
      scene,
      onClick,
      preload
    }
  }
}
</script>
