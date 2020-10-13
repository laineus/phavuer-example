<template>
  <Scene name="MainScene" :autoStart="true" @create="create" @update="update">
    <Sprite :origin="0" texture="forest" />
    <Text>Score: 0000</Text>
    <Player ref="player" :initialX="400" :initialY="300" @shot="v => bullets.add(v)" />
    <Enemy :target="player" :initialX="700" :initialY="200" />
    <Bullet v-for="v in bullets.list" :key="v.id" :initialX="v.item.x" :initialY="v.item.y" :r="v.item.r" :depth="1000" @destroy="bullets.remove(v.id)" />
  </Scene>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { Repository } from './substanceUtils'
import Scene from '../phavuer/components/Scene'
import Text from '../phavuer/components/Text'
import Sprite from '../phavuer/components/Sprite'
import Player from './Player'
import Enemy from './Enemy'
import Bullet from './Bullet'
export default {
  components: { Scene, Sprite, Text, Player, Enemy, Bullet },
  setup (props) {
    const player = ref(null)
    const bullets = new Repository()
    const create = (scene) => {
      console.log('created', scene)
    }
    const update = (scene) => {
      const activePointer = scene.input.manager.pointers.find(v => v.isDown)
      if (activePointer) {
        player.value.setTargetPosition(activePointer.x, activePointer.y)
      }
    }
    return {
      create,
      update,
      player,
      bullets
    }
  }
}
</script>
