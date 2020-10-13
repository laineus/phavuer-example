<template>
  <Scene name="MainScene" :autoStart="true" @create="create" @update="update">
    <Sprite :origin="0" texture="forest" />
    <Text>Score: {{ String(score).padStart(5, '0') }}</Text>
    <Player ref="player" :initialX="400" :initialY="300" @shot="v => bullets.push(v)" />
    <Enemy v-for="v in enemies.list" :key="v.id" :ref="v.register" :initialX="v.item.x" :initialY="v.item.y" @destroy="enemyDestroy" :target="player" />
    <Bullet v-for="v in bullets.list" :key="v.id" :ref="v.register" :initialX="v.item.x" :initialY="v.item.y" :r="v.item.r" :depth="1000" @destroy="bullets.remove(v.id)" />
  </Scene>
</template>

<script>
import { ref, provide, reactive, onMounted } from 'vue'
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
    const tick = ref(0)
    provide('tick', tick)
    const score = ref(0)
    const bullets = new Repository()
    const enemies = new Repository()
    provide('bullets', bullets)
    provide('enemies', enemies)
    const enemyDestroy = (id) => {
      score.value += 100
      enemies.remove(id)
    }
    const create = (scene) => {
      console.log('created', scene)
    }
    const update = (scene) => {
      tick.value++
      const activePointer = scene.input.manager.pointers.find(v => v.isDown)
      if (activePointer) {
        player.value.setTargetPosition(activePointer.x, activePointer.y)
      }
      if (tick.value % 5000 === 10) {
        enemies.push({ x: 700, y: 300 })
      }
    }
    return {
      create,
      update,
      score,
      player,
      enemies,
      enemyDestroy,
      bullets
    }
  }
}
</script>
