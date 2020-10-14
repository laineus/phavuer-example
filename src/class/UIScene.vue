<template>
  <Scene :ref="el => scene = el && el.scene" name="UIScene" :autoStart="false" @create="create">
    <Rectangle v-if="props.result" :origin="0" :width="960" :height="540" fillColor="0x000000" :alpha="bg.alpha" @create="onResult" @pointerdown="onClick" />
    <Text :visible="scoreText.visible" :depth="100" :x="scoreText.x" :y="scoreText.y" :origin="scoreText.origin" :style="{ fontSize: scoreText.size, fontStyle: 'bold' }">Score: {{ String(score).padStart(5, '0') }}</Text>
  </Scene>
</template>

<script>
import { inject, ref, reactive } from 'vue'
import { Repository } from './substanceUtils'
import Scene from '../phavuer/components/Scene'
import Text from '../phavuer/components/Text'
import Rectangle from '../phavuer/components/Rectangle'
export default {
  components: { Scene, Rectangle, Text },
  props: ['result'],
  setup (props, context) {
    const scene = ref(null)
    const canReset = ref(false)
    const score = inject('score')
    const bg = reactive({ alpha: 0 })
    const scoreText = reactive({ visible: true, x: 10, y: 10, size: 18, origin: 0 })
    const create = (scene) => {
      scoreText.visible = true
      scoreText.x = 10
      scoreText.y = 10
      scoreText.size = 18
      scoreText.origin = 0
      bg.alpha = 0
      canReset.value = false
    }
    const onClick = (object) => {
      if (!canReset.value) return
      scoreText.visible = false
      scene.value.add.tween({
        targets: bg,
        alpha: 1,
        duration: 400,
        onComplete: () => context.emit('reset')
      })
    }
    const onResult = object => {
      scene.value.add.tween({
        targets: bg,
        alpha: 0.7,
        duration: 150
      })
      scene.value.add.tween({
        targets: scoreText,
        x: 480,
        y: 270,
        size: 30,
        origin: 0.5,
        duration: 150
      })
      setTimeout(() => {
        canReset.value = true
      }, 1500)
    }
    return {
      props,
      scene,
      score,
      scoreText,
      bg,
      create,
      onClick,
      onResult
    }
  }
}
</script>
