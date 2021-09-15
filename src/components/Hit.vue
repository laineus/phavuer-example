<template>
  <Image :tween="tween" />
</template>

<script>
import { Image } from 'phavuer'
export default {
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
}
</script>
