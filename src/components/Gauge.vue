<template>
  <Container>
    <Rectangle :width="52" :height="6" :fillColor="0x000000" />
    <Rectangle :width="50" :height="4" :fillColor="0xCC0000" :originX="0" :x="-25" :scaleX="Math.max(props.value, 0)" />
  </Container>
</template>

<script>
import { Container, Rectangle } from 'phavuer'
export default {
  components: { Container, Rectangle },
  props: ['value'],
  setup (props) {
    return {
      props
    }
  }
}
</script>
