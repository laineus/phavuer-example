<template>
  <Image texture="hit" @create="create" />
</template>

<script>
import { inject } from 'vue'
import { Image } from 'phavuer'
export default {
  components: { Image },
  emits: ['end'],
  setup (props, context) {
    const scene = inject('scene')
    const create = object => {
      object.setScale(0)
      scene.add.tween({
        targets: object,
        scale: 1,
        duration: 100,
        onComplete: () => context.emit('end')
      })
    }
    return {
      create
    }
  }
}
</script>
