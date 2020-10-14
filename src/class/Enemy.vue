<template>
  <Container :ref="el => object = el && el.object" @create="create" @update="update" :depth="data.depth">
    <Sprite :ref="el => sprite = el && el.object" texture="kinoko" :frame="data.frame" />
  </Container>
</template>

<script>
import { inject, ref, reactive, computed } from 'vue'
import Container from '../phavuer/components/Container'
import Sprite from '../phavuer/components/Sprite'
import { dieAnimation, FrameAnimator, getAnimationKey4, WALK_ANIMATIONS_4 } from './substanceUtils'
export default {
  components: { Container, Sprite },
  props: ['initialX', 'initialY', 'target'],
  setup (props, context) {
    const scene = inject('scene')
    const object = ref(null)
    const sprite = ref(null)
    const data = reactive({ alive: true, frame: 0, depth: 0 })
    const targetPosition = reactive({ x: props.initialX, y: props.initialY })
    const animator = new FrameAnimator(WALK_ANIMATIONS_4)
    const setTargetPosition = (x, y) => {
      targetPosition.x = x
      targetPosition.y = y
    }
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
      object.body.velocity.normalize().scale(100)
    }
    return {
      object,
      sprite,
      data,
      create,
      update,
      setTargetPosition,
      hit
    }
  }
}
</script>
