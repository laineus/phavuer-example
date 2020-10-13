<template>
  <Scene name="MainScene" :autoStart="true" @create="create" @update="update">
    <Sprite :origin="0" texture="forest" />
    <Text>Score: 0000</Text>
    <Player ref="player" :initialX="400" :initialY="300" />
    <Enemy :target="player" :initialX="700" :initialY="200" />
  </Scene>
</template>

<script>
import { ref, onMounted } from 'vue'
import Scene from '../phavuer/components/Scene'
import Text from '../phavuer/components/Text'
import Sprite from '../phavuer/components/Sprite'
import Player from './Player'
import Enemy from './Enemy'
export default {
  components: { Scene, Sprite, Text, Player, Enemy },
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
