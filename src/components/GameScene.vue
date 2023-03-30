<template>
  <Scene name="GameScene" :autoStart="false" @create="create" @update="update">
    <Image :origin="0" texture="forest" />
    <PlayerComponent :player="player" />
    <EnemyComponent v-for="v in enemies.list" :key="v.id" :enemy="v" />
    <BulletComponent v-for="v in bullets.list" :key="v.id" :bullet="v" :depth="1000" />
  </Scene>
</template>

<script lang="ts">
import { defineComponent, inject, ref, Ref } from 'vue'
import { Scene, Image } from 'phavuer'
import PlayerComponent, { Player } from './Player.vue'
import EnemyComponent, { Enemy } from './Enemy.vue'
import BulletComponent, { Bullet } from './Bullet.vue'
import config from '../config'
import Repository from './Repository'
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max + 1 - min)) + min
const chance = (percent = 0.5) => percent > Math.random()
export default defineComponent({
  components: { Scene, Image, PlayerComponent, EnemyComponent, BulletComponent },
  emits: ['gameOver'],
  setup (_, context) {
    const player = ref<Player>()
    const bullets = new Repository<Bullet>()
    const enemies = new Repository<Enemy>()
    let tick = 0
    const score = inject('score') as Ref<number>
    const create = () => {
      tick = 0
      score.value = 0
      player.value = new Player({ x: 400, y: 300 })
      player.value.on('shot', ((e: CustomEvent<{ x: number, y: number, r: number }>) => {
        const { x, y, r } = e.detail
        bullets.add(new Bullet({ x, y, r, enemies }))
      }) as EventListenerOrEventListenerObject).on('destroy', () => {
        context.emit('gameOver')
      })
      enemies.clear()
      bullets.clear()
    }
    const update = (scene: Phaser.Scene) => {
      tick++
      player.value?.update()
      enemies.list.forEach(enemy => enemy.update())
      bullets.list.forEach(bullet => bullet.update())
      const activePointer = scene.input.manager.pointers.find(v => v.isDown)
      if (activePointer) {
        player.value?.setTargetPosition(activePointer.x, activePointer.y)
      }
      const freq = Math.max(config.GAME.ENEMY_FREQ_BEGIN - Math.round(tick / 15), config.GAME.ENEMY_FREQ_END)
      if (tick % freq === 5) {
        const enemy = new Enemy({ x: chance() ? 0 : 960, y: randomInt(50, 490), target: player.value as Player })
        enemy.on('destroy', () => {
          score.value += enemy.type.speed ?? 0
        })
        enemies.add(enemy)
      }
    }
    return {
      create,
      update,
      score,
      player,
      enemies,
      bullets
    }
  }
})
</script>
