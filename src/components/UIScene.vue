<template>
  <Scene name="UIScene" :autoStart="false" @create="create">
    <Rectangle
      v-if="result"
      :origin="0"
      :width="960"
      :height="540"
      :fillColor="0x000000"
      :tween="bg.tween"
      @pointerdown="onClick"
    />
    <Text
      v-if="scoreText.visible"
      :text="`Score: ${String(score).padStart(5, '0')}`"
      :depth="100"
      :x="10"
      :y="10"
      :origin="0"
      :scale="0.6"
      :style="{ fontSize: 30, fontStyle: 'bold' }"
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
    const scoreText = reactive({ visible: true, tween: null })
    const create = () => {
      scoreText.visible = true
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
          x: 480 - 109,
          y: 270 - 16,
          scale: 1,
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
