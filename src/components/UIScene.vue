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
      :style="{ fontSize: '30px', fontStyle: 'bold' }"
      :tween="scoreText.tween"
    />
  </Scene>
</template>

<script lang="ts">
import { defineComponent, inject, ref, reactive, watch } from 'vue'
import { Scene, Text, Rectangle, Phavuer } from 'phavuer'
export default defineComponent({
  components: { Scene, Rectangle, Text },
  props: ['result'],
  emits: ['reset'],
  setup (props, context) {
    const canReset = ref(false)
    const score = inject('score')
    const bg = reactive<{ tween: Phavuer.TweenConfig | undefined }>({ tween: undefined })
    const scoreText = reactive<{ visible: boolean, tween: Phavuer.TweenConfig | undefined }>({ visible: true, tween: undefined })
    const create = () => {
      scoreText.visible = true
      scoreText.tween = undefined
      bg.tween = undefined
      canReset.value = false
    }
    const onClick = () => {
      if (!canReset.value) return
      scoreText.visible = false
      bg.tween = {
        props: { alpha: 1 },
        duration: 400,
        onComplete: () => context.emit('reset')
      }
    }
    watch(() => props.result, (current, prev) => {
      if (!prev && current) {
        bg.tween = {
          props: { alpha: { getStart: () => 0, getEnd: () => 0.7 } },
          duration: 150
        }
        scoreText.tween = {
          props: {
            x: 480 - 109,
            y: 270 - 16,
            scale: 1
          },
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
})
</script>
