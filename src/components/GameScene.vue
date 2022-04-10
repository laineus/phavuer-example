<template>
  <Scene ref="scene" name="GameScene" :autoStart="false" @create="create" @update="update">
    <Image :origin="0" texture="forest" />
    <Player ref="player" :initialX="400" :initialY="300" @shot="addBullet" @dead="onDead" />
    <EnemyComponent v-for="v in enemies.list" :key="v.id" :enemy="v" />
    <BulletComponent v-for="v in bullets.list" :key="v.id" :bullet="v" :depth="1000" />
  </Scene>
</template>

<script>
import { ref, inject, provide } from 'vue'
import { refScene, Scene, Image } from 'phavuer'
import Player from './Player.vue'
import EnemyComponent, { Enemy } from './Enemy.vue'
import BulletComponent, { Bullet } from './Bullet.vue'
import config from '../config'
import { bullets, enemies } from './repositories'
export default {
  components: { Scene, Image, Player, EnemyComponent, BulletComponent },
  emits: ['gameOver'],
  setup (_, context) {
    const scene = refScene(null)
    const player = ref(null)
    const tick = ref(0)
    provide('tick', tick)
    const score = inject('score')
    const addBullet = (data) => {
      bullets.add(new Bullet({ x: data.x, y: data.y, r: data.r, enemies }))
    }
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
        const enemy = new Enemy({ x: Math.chance() ? 0 : 960, y: Math.randomInt(50, 490), target: player.value })
        enemy.on('destroy', () => {
          score.value += enemy.type.speed ?? 0
        })
        enemies.add(enemy)
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
      bullets,
      addBullet
    }
  }
}
</script>
