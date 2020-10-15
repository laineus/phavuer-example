<template>
  <Container :ref="el => object = el && el.object" @create="create" @update="update" :depth="data.depth">
    <Image :ref="el => sprite = el && el.object" :texture="data.type.texture" :frame="data.frame" />
  </Container>
</template>

<script>
import { inject, ref, reactive } from 'vue'
import Container from '../phavuer/components/Container'
import Image from '../phavuer/components/Image'
import { dieAnimation, FrameAnimator, getAnimationKey4, WALK_ANIMATIONS_4 } from './substanceUtils'
const TYPES = [
  { texture: 'kinoko', speed: 100 },
  { texture: 'flower', speed: 60 },
  { texture: 'boar', speed: 150 },
]
export default {
  components: { Container, Image },
  props: ['initialX', 'initialY', 'target'],
  setup (props, context) {
    const scene = inject('scene')
    const object = ref(null)
    const sprite = ref(null)
    const data = reactive({ alive: true, frame: 0, depth: 0, type: TYPES.random() })
    const animator = new FrameAnimator(WALK_ANIMATIONS_4)
    const hit = () => {
      data.alive = false
      dieAnimation(sprite.value).then(() => context.emit('destroy'))
    }
    const create = object => {
      object.setPosition(props.initialX, props.initialY)
      scene.physics.world.enable(object)
      object.body.setDrag(300)
    }
    const update = object => {
      data.depth = object.y
      const diffX = props.target.object.x - object.x
      const diffY = props.target.object.y - object.y
      data.frame = animator.play(getAnimationKey4(Math.atan2(diffY, diffX)))
      const distance = Math.hypot(diffX, diffY)
      if (distance < 10 || !data.alive) {
        object.body.setVelocity(0, 0)
        if (data.alive) props.target.hit(object)
        return
      }
      object.body.setVelocity(diffX, diffY)
      object.body.velocity.normalize().scale(data.type.speed)
    }
    return {
      object,
      sprite,
      data,
      create,
      update,
      hit
    }
  }
}
</script>
