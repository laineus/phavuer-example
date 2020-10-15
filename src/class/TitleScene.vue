<template>
  <Scene :ref="el => scene = el && el.scene" name="TitleScene" :autoStart="true">
    <Sprite texture="title" :origin="0" @pointerdown="onClick" />
  </Scene>
</template>

<script>
import { ref } from 'vue'
import { Repository } from './substanceUtils'
import Scene from '../phavuer/components/Scene'
import Sprite from '../phavuer/components/Sprite'
export default {
  components: { Scene, Sprite },
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
