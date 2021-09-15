<template>
  <Container ref="object" @create="create" :depth="depth" v-model:x="x" v-model:y="y">
    <Image ref="sprite" :texture="type.texture" :frame="frame" />
  </Container>
</template>

<script>
import { inject, reactive, toRefs } from 'vue'
import { refObj, Container, Image, onPreUpdate } from 'phavuer'
import { dieAnimation, FrameAnimator, getAnimationKey4, WALK_ANIMATIONS_4 } from './substanceUtils'
const TYPES = [
  { texture: 'kinoko', speed: 100 },
  { texture: 'flower', speed: 60 },
  { texture: 'boar', speed: 150 }
]
export default {
  components: { Container, Image },
  props: ['init', 'target'],
  emits: ['destroy'],
  setup (props, context) {
    const scene = inject('scene')
    const object = refObj(null)
    const sprite = refObj(null)
    const data = reactive({ alive: true, x: props.init.x, y: props.init.y, frame: 0, depth: 0, type: TYPES.random() })
    const animator = new FrameAnimator(WALK_ANIMATIONS_4)
    const hit = () => {
      data.alive = false
      dieAnimation(sprite.value).then(() => context.emit('destroy'))
    }
    const create = object => {
      scene.physics.world.enable(object)
      object.body.setDrag(300)
    }
    onPreUpdate(() => {
      data.depth = object.value.y
      const diffX = props.target.object.x - object.value.x
      const diffY = props.target.object.y - object.value.y
      data.frame = animator.play(getAnimationKey4(Math.atan2(diffY, diffX)))
      const distance = Math.hypot(diffX, diffY)
      if (distance < 10 || !data.alive) {
        object.value.body.setVelocity(0, 0)
        if (data.alive) props.target.hit(object.value)
        return
      }
      object.value.body.setVelocity(diffX, diffY)
      object.value.body.velocity.normalize().scale(data.type.speed)
    })
    return {
      ...toRefs(data),
      object,
      sprite,
      create,
      hit
    }
  }
}
</script>
