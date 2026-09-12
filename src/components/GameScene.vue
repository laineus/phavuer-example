<template>
  <Scene name="GameScene" :autoStart="false" @create="create" @update="update">
    <Image :origin="0" texture="forest" />
    <PlayerComponent :player="player" />
    <EnemyComponent v-for="v in enemies.list" :key="v.id" :enemy="v" />
    <BulletComponent v-for="v in bullets.list" :key="v.id" :bullet="v" :depth="1000" />
  </Scene>
</template>

<script setup lang="ts">
import { inject, ref, Ref } from 'vue'
import { Scene, Image } from 'phavuer'
import PlayerComponent from './Player.vue'
import EnemyComponent from './Enemy.vue'
import BulletComponent from './Bullet.vue'
import { usePlayer, type Player } from '../composables/usePlayer'
import { useEnemy, type Enemy } from '../composables/useEnemy'
import { useBullet, type Bullet } from '../composables/useBullet'
import config from '../config'
import Repository from './Repository'

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max + 1 - min)) + min
const chance = (percent = 0.5) => percent > Math.random()
const emit = defineEmits<{ gameOver: [] }>()
const player = ref<Player>()
const bullets = new Repository<Bullet>()
const enemies = new Repository<Enemy>()
const score = inject('score') as Ref<number>
let tick = 0

const create = () => {
  tick = 0
  score.value = 0
  player.value = usePlayer({ x: 400, y: 300 })
  player.value.on('shot', ((event: CustomEvent<{ x: number, y: number, r: number }>) => {
    const { x, y, r } = event.detail
    bullets.add(useBullet({ x, y, r, enemies }))
  }) as EventListenerOrEventListenerObject).on('destroy', () => emit('gameOver'))
  enemies.clear()
  bullets.clear()
}

const update = (scene: Phaser.Scene) => {
  tick++
  player.value?.update()
  enemies.list.forEach(enemy => enemy.update())
  bullets.list.forEach(bullet => bullet.update())
  const activePointer = scene.input.manager.pointers.find(value => value.isDown)
  if (activePointer) player.value?.setTargetPosition(activePointer.x, activePointer.y)
  const freq = Math.max(config.GAME.ENEMY_FREQ_BEGIN - Math.round(tick / 15), config.GAME.ENEMY_FREQ_END)
  if (tick % freq === 5) {
    const enemy = useEnemy({ x: chance() ? 0 : 960, y: randomInt(50, 490), target: player.value as Player })
    enemy.on('destroy', () => {
      score.value += enemy.type.speed ?? 0
    })
    enemies.add(enemy)
  }
}
</script>
