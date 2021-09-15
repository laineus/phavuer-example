<template>
  <Image texture="fire" :frame="frame" v-model:x="x" v-model:y="y" :rotation="r" :blendMode="blendMode">
    <Body :velocityX="velocityX" :velocityY="velocityY" />
  </Image>
</template>

<script>
import { inject, reactive, toRefs } from 'vue'
import { Image, Body, onPreUpdate } from 'phavuer'
import { overScreen, closeTo, FrameAnimator } from './substanceUtils'
export default {
  components: { Image, Body },
  props: ['init'],
  emits: ['destroy'],
  setup (props, context) {
    const enemies = inject('enemies')
    const cos = Math.cos(props.init.r)
    const sin = Math.sin(props.init.r)
    const data = reactive({
      frame: 0,
      x: props.init.x + cos * 30,
      y: props.init.y + sin * 30,
      velocityX: cos * 300,
      velocityY: sin * 300,
      r: props.init.r
    })
    const animator = new FrameAnimator([{ key: 'fire', frames: [0, 1, 2], duration: 5 }])
    onPreUpdate(() => {
      data.frame = animator.play('fire')
      if (overScreen(data, 20)) context.emit('destroy')
      enemies.value.some(enemy => {
        if (enemy.ref.data.alive && closeTo(data, enemy.ref.object)) {
          context.emit('destroy')
          enemy.ref.hit()
          return true
        }
        return false
      })
    })
    return {
      ...toRefs(data),
      blendMode: Phaser.BlendModes.OVERLAY
    }
  }
}
</script>
