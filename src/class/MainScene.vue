<template>
  <Scene :name="name" :autoStart="true" @create="create" @update="update">
    <Text>aaaaa</Text>
    <Player />
  </Scene>
</template>

<script>
import { ref } from 'vue'
import Scene from '../phavuer/components/Scene'
import Text from '../phavuer/components/Text'
import Player from './Player'
export default {
  components: { Scene, Text, Player },
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
