<template>
  <Scene :ref="el => scene = el && el.scene" name="MainScene" :autoStart="false" @create="create" @update="update">
    <Sprite :origin="0" texture="forest" />
    <Text>Score: {{ String(score).padStart(5, '0') }}</Text>
    <Player ref="player" :initialX="400" :initialY="300" @shot="v => bullets.push(v)" />
    <Enemy v-for="v in enemies.list" :key="v.id" :ref="v.register" :initialX="v.item.x" :initialY="v.item.y" @destroy="enemyDestroy(v.id)" :target="player" />
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
    const scene = ref(null)
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
      // scene.value.scene.start('TitleScene')
    }
    const create = (scene) => {
      tick.value = 0
      score.value = 0
      enemies.clear()
      bullets.clear()
    }
    const update = (scene) => {
      if (!player.value) return
      tick.value++
      const activePointer = scene.input.manager.pointers.find(v => v.isDown)
      if (activePointer) {
        player.value.setTargetPosition(activePointer.x, activePointer.y)
      }
      const freq = Math.max(200 - Math.round(tick.value / 15), 50)
      if (tick.value % freq === 10) {
        enemies.push({ x: Math.chance() ? 0 : 960, y: Math.randomInt(50, 490) })
      }
    }
    return {
      scene,
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
