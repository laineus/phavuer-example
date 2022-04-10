<template>
  <Scene ref="scene" name="GameScene" :autoStart="false" @create="create" @update="update">
    <Image :origin="0" texture="forest" />
    <PlayerComponent :player="player" />
    <EnemyComponent v-for="v in enemies.list" :key="v.id" :enemy="v" />
    <BulletComponent v-for="v in bullets.list" :key="v.id" :bullet="v" :depth="1000" />
  </Scene>
</template>

<script>
import { ref, inject, provide, reactive } from 'vue'
import { refScene, Scene, Image } from 'phavuer'
import PlayerComponent, { Player } from './Player.vue'
import EnemyComponent, { Enemy } from './Enemy.vue'
import BulletComponent, { Bullet } from './Bullet.vue'
import config from '../config'
import { bullets, enemies } from './repositories'
export default {
  components: { Scene, Image, PlayerComponent, EnemyComponent, BulletComponent },
  emits: ['gameOver'],
  setup (_, context) {
    const scene = refScene(null)
    const player = reactive(new Player({ x: 400, y: 300 }))
    player.on('shot', ({ x, y, r }) => {
      bullets.add(new Bullet({ x, y, r, enemies }))
    }).on('destroy', () => {
      context.emit('gameOver')
    })
    const tick = ref(0)
    provide('tick', tick)
    const score = inject('score')
    const create = () => {
      tick.value = 0
      score.value = 0
      enemies.clear()
      bullets.clear()
    }
    const update = (scene) => {
      tick.value++
      const activePointer = scene.input.manager.pointers.find(v => v.isDown)
      if (activePointer) {
        player.setTargetPosition(activePointer.x, activePointer.y)
      }
      const freq = Math.max(config.GAME.ENEMY_FREQ_BEGIN - Math.round(tick.value / 15), config.GAME.ENEMY_FREQ_END)
      if (tick.value % freq === 5) {
        const enemy = new Enemy({ x: Math.chance() ? 0 : 960, y: Math.randomInt(50, 490), target: player })
        enemy.on('destroy', () => {
          score.value += enemy.type.speed ?? 0
        })
        enemies.add(enemy)
      }
    }
    return {
      scene,
      create,
      update,
      score,
      player,
      enemies,
      bullets
    }
  }
}
</script>
