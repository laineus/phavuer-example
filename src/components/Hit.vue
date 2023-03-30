<template>
  <Image :tween="tween" />
</template>

<script lang="ts">
import { Image } from 'phavuer'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { Image },
  emits: ['end'],
  setup (_, context) {
    const tween = {
      scale: { from: 0, to: 1 },
      duration: 100,
      onComplete: () => context.emit('end')
    }
    return {
      tween
    }
  }
})
</script>
