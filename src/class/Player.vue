<template>
  <Container :x="props.x" :y="props.y">
    <Sprite texture="marker" />
  </Container>
</template>

<script>
import { ref } from 'vue'
import Container from '../phavuer/components/Container'
import Sprite from '../phavuer/components/Sprite'
export default {
  components: { Container, Sprite },
  props: ['x', 'y'],
  setup (props) {
    return {
      props
    }
  }
}
</script>
