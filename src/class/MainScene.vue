<template>
  <Scene name="MainScene" :autoStart="true" @create="create" @update="update">
    <Sprite :origin="0" texture="forest" />
    <Text>Score: 0000</Text>
    <Player ref="player" :initialX="400" :initialY="300" @shot="shot" />
    <Enemy :target="player" :initialX="700" :initialY="200" />
    <Bullet v-for="(v, i) in bullets" :key="i" :initialX="v.x" :initialY="v.y" :r="0" />
  </Scene>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import Scene from '../phavuer/components/Scene'
import Text from '../phavuer/components/Text'
import Sprite from '../phavuer/components/Sprite'
import Player from './Player'
import Enemy from './Enemy'
import Bullet from './Bullet'
export default {
  components: { Scene, Sprite, Text, Player, Enemy, Bullet },
  setup (props) {
    const create = (scene) => {
      console.log('created', scene)
    }
    const player = ref(null)
    const bullets = reactive([])
    const update = (scene) => {
      const activePointer = scene.input.manager.pointers.find(v => v.isDown)
      if (activePointer) {
        player.value.setTargetPosition(activePointer.x, activePointer.y)
      }
    }
    const shot = (x, y) => {
      bullets.push({ x, y })
    }
    return {
      create,
      update,
      player,
      bullets,
      shot
    }
  }
}
</script>
