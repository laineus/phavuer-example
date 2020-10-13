<template>
  <Container ref="el" @create="create" @update="update" :depth="data.depth">
    <Sprite texture="spinel" :frame="data.frame" :flipX="data.flipX" />
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
  setup (props, context) {
    const scene = inject('scene')
    const data = reactive({ tick: 0, frame: 0, flipX: false, depth: 0, tgtX: props.initialX, tgtY: props.initialY })
    const animator = new FrameAnimator([{ key: 'walk', start: 3, end: 5, duration: 20 }])
    const setTargetPosition = (x, y) => {
      data.tgtX = x
      data.tgtY = y
    }
    const create = object => {
      object.setPosition(props.initialX, props.initialY)
      scene.physics.world.enable(object)
      object.body.setDrag(300)
    }
    const update = (object, time) => {
      data.tick++
      data.depth = object.y
      data.frame = animator.play('walk')
      const diffX = data.tgtX - object.x
      const diffY = data.tgtY - object.y
      const distance = Math.hypot(diffY, diffY)
      if (distance < 10) {
        object.body.setVelocity(0, 0)
        return
      }
      data.flipX = diffX < 0
      object.body.setVelocity(diffX, diffY)
      object.body.velocity.normalize().scale(200)
      if (data.tick % 30 === 0) {
        context.emit('shot', object.x, object.y)
      }
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
