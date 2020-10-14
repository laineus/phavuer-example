<template>
  <Scene :ref="el => scene = el && el.scene" name="TitleScene" :autoStart="true">
    <Rectangle :origin="0" :width="960" :height="540" fillColor="0x333333" :alpha="0.5" @pointerdown="onClick" />
    <Text :origin="0.5" :x="480" :y="270">Title</Text>
  </Scene>
</template>

<script>
import { ref } from 'vue'
import { Repository } from './substanceUtils'
import Scene from '../phavuer/components/Scene'
import Text from '../phavuer/components/Text'
import Rectangle from '../phavuer/components/Rectangle'
export default {
  components: { Scene, Rectangle, Text },
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
