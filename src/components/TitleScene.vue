<template>
  <Scene :ref="el => scene = el && el.scene" name="TitleScene" :autoStart="true">
    <Image texture="title" :origin="0" @pointerdown="onClick" />
  </Scene>
</template>

<script>
import { ref } from 'vue'
import { Repository } from './substanceUtils'
import { Scene, Image } from 'phavuer'
export default {
  components: { Scene, Image },
  setup (props) {
    const scene = ref(null)
    const onClick = () => {
      scene.value.scene.start('MainScene')
      scene.value.scene.start('UIScene')
    }
    return {
      scene,
      onClick
    }
  }
}
</script>
