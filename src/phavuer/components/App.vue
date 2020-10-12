<template>
  <div>
    <component ref="app" :is="key" v-for="(scene, key) in scenes" :key="key" :scene="scene" />
  </div>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
export default {
  setup () {
    const game = inject('game')
    const scenes = inject('scenes')
    const app = ref(null)
    onMounted(() => {
    })
    return {
      game,
      scenes,
      app
    }
  }
}
</script>
