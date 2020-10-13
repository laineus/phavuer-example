<template>
  <Container :ref="el => object = el && el.object" @create="create" @update="update" :depth="data.depth">
    <Sprite texture="kinoko" :frame="data.frame" :flipX="data.flipX" />
  </Container>
</template>

<script>
import { inject, ref, reactive, computed } from 'vue'
import Container from '../phavuer/components/Container'
import Sprite from '../phavuer/components/Sprite'
import FrameAnimator from './FrameAnimator'
export default {
  components: { Container, Sprite },
  props: ['initialX', 'initialY', 'target'],
  setup (props, context) {
    const scene = inject('scene')
    const data = reactive({ frame: 0, flipX: false, depth: 0 })
    const targetPosition = reactive({ x: props.initialX, y: props.initialY })
    const animator = new FrameAnimator([{ key: 'walk', start: 6, end: 8, duration: 20 }])
    const setTargetPosition = (x, y) => {
      targetPosition.x = x
      targetPosition.y = y
    }
    const hit = () => {
      context.emit('destroy')
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
      if (distance < 10) {
        object.body.setVelocity(0, 0)
        return
      }
      data.flipX = diffX < 0
      object.body.setVelocity(diffX, diffY)
      object.body.velocity.normalize().scale(100)
    }
    return {
      object: ref(null),
      data,
      create,
      update,
      setTargetPosition,
      hit
    }
  }
}
</script>
