<template>
  <Container ref="player" :x="position.x" :y="position.y" @create="create" @update="update">
    <Sprite texture="marker" />
  </Container>
</template>

<script>
import { inject, ref, reactive } from 'vue'
import Container from '../phavuer/components/Container'
import Sprite from '../phavuer/components/Sprite'
export default {
  components: { Container, Sprite },
  props: ['x', 'y'],
  setup (props) {
    const player = ref(null)
    const scene = inject('scene')
    const position = reactive({ x: props.x || 0, y: props.y || 0 })
    const targetPosition = reactive({ x: 0, y: 0 })
    const setTargetPosition = (x, y) => {
      targetPosition.x = x
      targetPosition.y = y
    }
    const create = object => {
      scene.physics.world.enable(object)
    }
    const update = object => {
      const diffX = targetPosition.x - position.x
      const diffY = targetPosition.y - position.y
      object.body.setVelocity(diffX, diffY)
      object.body.velocity.normalize().scale(200)
      position.x = object.x
      position.y = object.y
    }
    return {
      player,
      position,
      create,
      update,
      setTargetPosition
    }
  }
}
</script>
