<template>
  <Scene name="MainScene" :autoStart="true" @create="create" @update="update">
    <Text>aaaaa</Text>
    <Player ref="player" />
  </Scene>
</template>

<script>
import { ref, onMounted } from 'vue'
import Scene from '../phavuer/components/Scene'
import Text from '../phavuer/components/Text'
import Player from './Player'
export default {
  components: { Scene, Text, Player },
  setup (props) {
    const create = (scene) => {
      console.log('created', scene)
    }
    const player = ref(null)
    const update = (scene) => {
      const activePointer = scene.input.manager.pointers.find(v => v.isDown)
      if (activePointer) {
        player.value.setTargetPosition(activePointer.x, activePointer.y)
      }
    }
    // onMounted(() => {
    // })
    return {
      create,
      update,
      player
    }
  }
}
</script>
