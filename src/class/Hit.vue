<template>
  <Sprite texture="hit" @create="create" />
</template>

<script>
import { inject } from 'vue'
import Sprite from '../phavuer/components/Sprite'
export default {
  components: { Sprite },
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
