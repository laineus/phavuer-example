<template>
  <Container :ref="el => object = el && el.object" @create="create" @update="update" :depth="data.depth">
    <Sprite :ref="el => sprite = el && el.object" texture="kinoko" :frame="data.frame" :flipX="data.flipX" />
  </Container>
</template>

<script>
import { inject, ref, reactive, computed } from 'vue'
import Container from '../phavuer/components/Container'
import Sprite from '../phavuer/components/Sprite'
import FrameAnimator from './FrameAnimator'
import { dieAnimation } from './substanceUtils'
export default {
  components: { Container, Sprite },
  props: ['initialX', 'initialY', 'target'],
  setup (props, context) {
    const scene = inject('scene')
    const object = ref(null)
    const sprite = ref(null)
    const data = reactive({ alive: true, frame: 0, flipX: false, depth: 0 })
    const targetPosition = reactive({ x: props.initialX, y: props.initialY })
    const animator = new FrameAnimator([{ key: 'walk', start: 6, end: 8, duration: 20 }])
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
      data.frame = animator.play('walk')
      const diffX = props.target.object.x - object.x
      const diffY = props.target.object.y - object.y
      const distance = Math.hypot(diffX, diffY)
      if (distance < 10 || !data.alive) {
        object.body.setVelocity(0, 0)
        if (data.alive) props.target.hit(object)
        return
      }
      data.flipX = diffX < 0
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
