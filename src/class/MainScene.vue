<template>
  <Scene ref="scene" @create="create" key="main" :active="true" />
</template>

<script>
import { ref } from 'vue'
import Scene from '../phavuer/components/Scene'
export default {
  components: { Scene },
  setup (props) {
    console.log(props.scene)
    const create = () => {
      console.log('created')
    }
    return {
      scene: ref(null),
      create
    }
  },
  props: {
    scene: null
  }
}
</script>
