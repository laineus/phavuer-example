<template>
  <Scene name="MainScene" :autoStart="true" @create="create" @update="update">
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
  setup (props) {
    const create = (scene) => {
      console.log('created', scene)
    }
    const update = () => {
    }
    return {
      create,
      update
    }
  }
}
</script>
