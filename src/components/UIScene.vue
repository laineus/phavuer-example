<template>
  <Scene name="UIScene" :autoStart="false" @create="create">
    <Rectangle v-if="result" :origin="0" :width="960" :height="540" :tween="bg.tween" :fillColor="0x000000" @pointerdown="onClick" />
    <Text
      :visible="scoreText.visible"
      :text="`Score: ${String(score).padStart(5, '0')}`"
      :depth="100"
      :x="scoreText.x"
      :y="scoreText.y"
      :origin="scoreText.origin"
      :style="{ fontSize: scoreText.size, fontStyle: 'bold' }"
      :tween="scoreText.tween"
    />
  </Scene>
</template>

<script>
import { inject, ref, reactive, watch } from 'vue'
import { Scene, Text, Rectangle } from 'phavuer'
export default {
  components: { Scene, Rectangle, Text },
  props: ['result'],
  emits: ['reset'],
  setup (props, context) {
    const canReset = ref(false)
    const score = inject('score')
    const bg = reactive({ tween: null })
    const scoreText = reactive({ visible: true, x: 10, y: 10, size: 18, origin: 0, tween: null })
    const create = () => {
      scoreText.visible = true
      scoreText.x = 10
      scoreText.y = 10
      scoreText.size = 18
      scoreText.origin = 0
      scoreText.tween = null
      bg.tween = null
      canReset.value = false
    }
    const onClick = () => {
      if (!canReset.value) return
      scoreText.visible = false
      bg.tween = {
        alpha: 1,
        duration: 400,
        onComplete: () => context.emit('reset')
      }
    }
    watch(() => props.result, (current, prev) => {
      if (!prev && current) {
        bg.tween = {
          alpha: { from: 0, to: 0.7 },
          duration: 150
        }
        scoreText.tween = {
          x: 480,
          y: 270,
          size: 30,
          origin: 0.5,
          duration: 150
        }
        setTimeout(() => {
          canReset.value = true
        }, 1500)
      }
    })
    return {
      score,
      scoreText,
      bg,
      create,
      onClick
    }
  }
}
</script>
