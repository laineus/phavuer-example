<template>
  <Scene ref="scene" name="GameScene" :autoStart="false" @create="create" @update="update">
    <Image :origin="0" texture="forest" />
    <Player ref="player" :initialX="400" :initialY="300" @shot="v => bullets.push(v)" @dead="onDead" />
    <Enemy v-for="v in enemies" :key="v.id" :ref="e => v.ref = e" :initialX="v.x" :initialY="v.y" @destroy="enemyDestroy(v)" :target="player" />
    <Bullet v-for="(v, i) in bullets" :key="v.id" :initialX="v.x" :initialY="v.y" :r="v.r" :depth="1000" @destroy="bullets.splice(i, 1)" />
  </Scene>
</template>
scenescene
<script>
import { ref, inject, provide, reactive, onMounted } from 'vue'
import { refScene, Scene, Image } from 'phavuer'
import Player from './Player'
import Enemy from './Enemy'
import Bullet from './Bullet'
export default {
  components: { Scene, Image, Player, Enemy, Bullet },
  setup (props, context) {
    const scene = refScene(null)
    const player = ref(null)
    const tick = ref(0)
    provide('tick', tick)
    const score = inject('score')
    const bullets = ref([])
    const enemies = ref([])
    provide('bullets', bullets)
    provide('enemies', enemies)
    const enemyDestroy = (v) => {
      score.value += v.ref.data.type.speed
      const i = enemies.value.findIndex(enemy => enemy === v)
      enemies.value.splice(i, 1)
    }
    const create = (scene) => {
      tick.value = 0
      score.value = 0
      enemies.value.splice(0)
      bullets.value.splice(0)
    }
    const update = (scene) => {
      if (!player.value) return
      tick.value++
      const activePointer = scene.input.manager.pointers.find(v => v.isDown)
      if (activePointer) {
        player.value.setTargetPosition(activePointer.x, activePointer.y)
      }
      const freq = Math.max(200 - Math.round(tick.value / 15), 40)
      if (tick.value % freq === 10) {
        enemies.value.push({ id: Symbol(), x: Math.chance() ? 0 : 960, y: Math.randomInt(50, 490), ref: ref(null) })
      }
    }
    const onDead = () => {
      context.emit('gameOver')
    }
    return {
      scene,
      create,
      update,
      onDead,
      score,
      player,
      enemies,
      enemyDestroy,
      bullets
    }
  }
}
</script>
