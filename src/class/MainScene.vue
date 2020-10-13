<template>
  <Scene name="MainScene" :autoStart="true" @create="create" @update="update">
    <Sprite :origin="0" texture="forest" />
    <Text>Score: 0000</Text>
    <Player ref="player" :initialX="400" :initialY="300" @shot="shot" />
    <Enemy :target="player" :initialX="700" :initialY="200" />
    <Bullet v-for="v in bullets" :key="v.id" :initialX="v.x" :initialY="v.y" :r="v.r" :depth="1000" @destroy="destroyBullet(v)" />
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
    let bulletId = 0
    const shot = (x, y, r) => {
      bulletId++
      bullets.push({ id: bulletId, x, y, r })
    }
    const destroyBullet = bullet => {
      const i = bullets.findIndex(b => bullet)
      bullets.splice(i, 1)
    }
    return {
      create,
      update,
      player,
      bullets,
      shot,
      destroyBullet
    }
  }
}
</script>
