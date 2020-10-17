<template>
  <Scene ref="scene" name="TitleScene" :autoStart="true">
    <Image texture="title" :origin="0" @pointerdown="onClick" />
  </Scene>
</template>

<script>
import { refScene, Scene, Image } from 'phavuer'
export default {
  components: { Scene, Image },
  setup (props) {
    const scene = refScene(null)
    const onClick = () => {
      scene.value.scene.start('GameScene')
      scene.value.scene.start('UIScene')
    }
    return {
      scene,
      onClick
    }
  }
}
</script>
