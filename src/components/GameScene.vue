<template>
  <Scene ref="scene" name="GameScene" :autoStart="false" @create="create" @update="update">
    <Image :origin="0" texture="forest" />
    <PlayerComponent :player="player" />
    <EnemyComponent v-for="v in enemies.list" :key="v.id" :enemy="v" />
    <BulletComponent v-for="v in bullets.list" :key="v.id" :bullet="v" :depth="1000" />
  </Scene>
</template>

<script>
import { inject, ref } from 'vue'
import { refScene, Scene, Image } from 'phavuer'
import PlayerComponent, { Player } from './Player.vue'
import EnemyComponent, { Enemy } from './Enemy.vue'
import BulletComponent, { Bullet } from './Bullet.vue'
import config from '../config'
import Repository from './Repository'
export default {
  components: { Scene, Image, PlayerComponent, EnemyComponent, BulletComponent },
  emits: ['gameOver'],
  setup (_, context) {
    const scene = refScene(null)
    const player = ref(null)
    const bullets = new Repository()
    const enemies = new Repository()
    let tick = 0
    const score = inject('score')
    const create = () => {
      tick = 0
      score.value = 0
      player.value = new Player({ x: 400, y: 300 })
      player.value.on('shot', ({ x, y, r }) => {
        bullets.add(new Bullet({ x, y, r, enemies }))
      }).on('destroy', () => {
        context.emit('gameOver')
      })
      enemies.clear()
      bullets.clear()
    }
    const update = (scene) => {
      tick++
      const activePointer = scene.input.manager.pointers.find(v => v.isDown)
      if (activePointer) {
        player.value.setTargetPosition(activePointer.x, activePointer.y)
      }
      const freq = Math.max(config.GAME.ENEMY_FREQ_BEGIN - Math.round(tick / 15), config.GAME.ENEMY_FREQ_END)
      if (tick % freq === 5) {
        const enemy = new Enemy({ x: Math.chance() ? 0 : 960, y: Math.randomInt(50, 490), target: player.value })
        enemy.on('destroy', () => {
          score.value += enemy.type.speed ?? 0
        })
        enemies.add(enemy)
      }
      player.value.update()
      enemies.list.forEach(enemy => enemy.update())
      bullets.list.forEach(bullet => bullet.update())
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
