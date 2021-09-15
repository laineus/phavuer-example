<template>
  <Container :depth="y" v-model:x="x" v-model:y="y">
    <Body :drag="300" :velocityX="velocityX" :velocityY="velocityY" />
    <Image ref="sprite" :texture="type.texture" :frame="frame" />
  </Container>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { refObj, Container, Image, Body, onPreUpdate } from 'phavuer'
import { dieAnimation, FrameAnimator, getAnimationKey4, WALK_ANIMATIONS_4 } from './substanceUtils'
const TYPES = [
  { texture: 'kinoko', speed: 100 },
  { texture: 'flower', speed: 60 },
  { texture: 'boar', speed: 150 }
]
export default {
  components: { Container, Image, Body },
  props: ['init', 'target'],
  emits: ['destroy'],
  setup (props, context) {
    const sprite = refObj(null)
    const data = reactive({
      alive: true,
      x: props.init.x,
      y: props.init.y,
      velocityX: 0,
      velocityY: 0,
      frame: 0,
      type: TYPES.random()
    })
    const animator = new FrameAnimator(WALK_ANIMATIONS_4)
    const hit = () => {
      data.alive = false
      dieAnimation(sprite.value).then(() => context.emit('destroy'))
    }
    onPreUpdate(() => {
      const vector = new Phaser.Math.Vector2(props.target.x - data.x, props.target.y - data.y)
      data.frame = animator.play(getAnimationKey4(vector.angle()))
      if (vector.length() < 10 || !data.alive) {
        data.velocityX = 0
        data.velocityY = 0
        if (data.alive) props.target.hit(data)
        return
      }
      vector.normalize().scale(data.type.speed)
      data.velocityX = vector.x
      data.velocityY = vector.y
    })
    return {
      ...toRefs(data),
      sprite,
      hit
    }
  }
}
</script>
