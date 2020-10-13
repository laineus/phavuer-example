<template>
  <Container ref="el" @create="create" @update="update" :depth="data.depth">
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
  setup (props) {
    const scene = inject('scene')
    const data = reactive({ frame: 0, flipX: false, depth: 0 })
    const targetPosition = reactive({ x: props.initialX, y: props.initialY })
    const animator = new FrameAnimator([{ key: 'walk', start: 6, end: 8, duration: 20 }])
    const setTargetPosition = (x, y) => {
      targetPosition.x = x
      targetPosition.y = y
    }
    const create = object => {
      object.setPosition(props.initialX, props.initialY)
      scene.physics.world.enable(object)
      object.body.setDrag(300)
    }
    const update = object => {
      data.depth = object.y
      data.frame = animator.play('walk')
      const diffX = props.target.el.object.x - object.x
      const diffY = props.target.el.object.y - object.y
      const distance = Math.hypot(diffY, diffY)
      if (distance < 10) {
        object.body.setVelocity(0, 0)
        return
      }
      data.flipX = diffX < 0
      object.body.setVelocity(diffX, diffY)
      object.body.velocity.normalize().scale(100)
    }
    return {
      el: ref(null),
      data,
      create,
      update,
      setTargetPosition
    }
  }
}
</script>
