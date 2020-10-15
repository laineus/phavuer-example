<template>
  <Image texture="hit" @create="create" />
</template>

<script>
import { inject } from 'vue'
import Image from '../phavuer/components/Image'
export default {
  components: { Image },
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
