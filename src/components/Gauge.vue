<template>
  <Container>
    <Rectangle :width="52" :height="6" :fillColor="0x000000" />
    <Rectangle :width="50" :height="4" :fillColor="0xCC0000" :originX="0" :x="-25" :scaleX="Math.max(value, 0)" />
  </Container>
</template>

<script lang="ts">
import { Container, Rectangle } from 'phavuer'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { Container, Rectangle },
  props: {
    value: { type: Number, required: true }
  }
})
</script>
