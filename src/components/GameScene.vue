<template>
  <Scene ref="scene" name="GameScene" :autoStart="false" @create="create" @update="update">
    <Image :origin="0" texture="forest" />
    <Player ref="player" :initialX="400" :initialY="300" @shot="bullets.add" @dead="onDead" />
    <Enemy v-for="v in enemies.seeds" :key="v.id" :ref="enemies.register" :init="v" @destroy="enemies.remove(v)" :target="player" />
    <Bullet v-for="v in bullets.seeds" :key="v.id" :ref="bullets.register" :init="v" :depth="1000" @destroy="bullets.remove(v)" />
  </Scene>
</template>

<script>
import { ref, inject, provide } from 'vue'
import { refScene, Scene, Image } from 'phavuer'
import Player from './Player.vue'
import Enemy from './Enemy.vue'
import Bullet from './Bullet.vue'
import config from '../config'
import useRepository from './useRepository'
export default {
  components: { Scene, Image, Player, Enemy, Bullet },
  emits: ['gameOver'],
  setup (_, context) {
    const scene = refScene(null)
    const player = ref(null)
    const tick = ref(0)
    provide('tick', tick)
    const score = inject('score')
    const bullets = useRepository()
    const enemies = useRepository()
    provide('bullets', bullets)
    provide('enemies', enemies)
    const create = () => {
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
      const freq = Math.max(config.GAME.ENEMY_FREQ_BEGIN - Math.round(tick.value / 15), config.GAME.ENEMY_FREQ_END)
      if (tick.value % freq === 5) {
        enemies.add({ x: Math.chance() ? 0 : 960, y: Math.randomInt(50, 490), ref: ref(null) })
      }
    }
    const onDead = () => context.emit('gameOver')
    return {
      scene,
      create,
      update,
      onDead,
      score,
      player,
      enemies,
      bullets
    }
  }
}
</script>
