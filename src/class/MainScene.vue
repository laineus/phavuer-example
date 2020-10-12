<template>
  <Scene ref="scene" @create="create" @update="update" :name="name" :autoStart="true" />
</template>

<script>
import { ref } from 'vue'
import Scene from '../phavuer/components/Scene'
export default {
  components: { Scene },
  props: {
    name: { type: String, require: true }
  },
  setup (props) {
    const create = (scene) => {
      console.log('created', scene)
    }
    const update = () => {
    }
    return {
      name: props.name,
      create,
      update
    }
  }
}
</script>
