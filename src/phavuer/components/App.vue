<template>
  <div>
    <component ref="app" :is="name" v-for="name in componentNames" :key="name" :name="name" />
  </div>
</template>

<script>
import { ref, inject } from 'vue'
export default {
  setup () {
    const componentNames = inject('componentNames')
    const app = ref(null)
    return {
      componentNames,
      app
    }
  }
}
</script>
