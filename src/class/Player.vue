<template>
  <Container ref="player" @create="create" @update="update">
    <Sprite texture="marker" />
    <Text>{{ half }}</Text>
  </Container>
</template>

<script>
import { inject, ref, reactive, computed } from 'vue'
import Container from '../phavuer/components/Container'
import Sprite from '../phavuer/components/Sprite'
import Text from '../phavuer/components/Text'
export default {
  components: { Container, Sprite, Text },
  props: ['x', 'y'],
  setup (props) {
    const player = ref(null)
    const scene = inject('scene')
    const targetPosition = reactive({ x: 0, y: 0 })
    const half = computed(() => player.value && player.value.object.x / 2)
    const setTargetPosition = (x, y) => {
      targetPosition.x = x
      targetPosition.y = y
    }
    const create = object => {
      object.setPosition(props.x, props.y)
      scene.physics.world.enable(object)
    }
    const update = object => {
      const diffX = targetPosition.x - object.x
      const diffY = targetPosition.y - object.y
      object.body.setVelocity(diffX, diffY)
      object.body.velocity.normalize().scale(200)
    }
    return {
      half,
      player,
      create,
      update,
      setTargetPosition
    }
  }
}
</script>
