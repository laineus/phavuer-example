<template>
  <Container ref="player" @create="create" @update="update">
    <Sprite texture="player" :frame="data.frame" :flipX="data.flipX" />
  </Container>
</template>

<script>
import { inject, ref, reactive, computed } from 'vue'
import Container from '../phavuer/components/Container'
import Sprite from '../phavuer/components/Sprite'
import FrameAnimator from './FrameAnimator'
export default {
  components: { Container, Sprite },
  props: ['initialX', 'initialY'],
  setup (props) {
    const player = ref(null)
    const scene = inject('scene')
    const data = reactive({ frame: 0, flipX: false })
    const targetPosition = reactive({ x: props.initialX, y: props.initialY })
    const animator = new FrameAnimator([{ key: 'walk', start: 4, end: 7, duration: 20 }, { key: 'wait', start: 0, end: 1, duration: 20 }])
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
      const diffX = targetPosition.x - object.x
      const diffY = targetPosition.y - object.y
      const distance = Math.hypot(diffY, diffY)
      if (distance < 10) {
        object.body.setVelocity(0, 0)
        data.frame = animator.play('wait')
        return
      }
      data.flipX = diffX < 0
      object.body.setVelocity(diffX, diffY)
      object.body.velocity.normalize().scale(200)
      data.frame = animator.play('walk')
    }
    return {
      player,
      data,
      create,
      update,
      setTargetPosition
    }
  }
}
</script>
