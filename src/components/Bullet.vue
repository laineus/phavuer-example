<template>
  <Image texture="fire" :frame="frame" v-model:x="bullet.x" v-model:y="bullet.y" :rotation="bullet.r" :blendMode="blendMode">
    <Body :velocityX="bullet.velocityX" :velocityY="bullet.velocityY" />
  </Image>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Image, Body, onPostUpdate } from 'phavuer'
import { overScreen, FrameAnimator } from './substanceUtils'
import config from '../config'
import BaseClass from './BaseClass'
import Repository from './Repository'
import { Enemy } from './Enemy.vue'
export class Bullet extends BaseClass {
  r = NaN
  velocityX: number
  velocityY: number
  enemies: Repository<Enemy>
  constructor ({ x, y, r, enemies }: { x: number, y: number, r: number, enemies: Repository<Enemy> }) {
    super()
    const cos = Math.cos(r)
    const sin = Math.sin(r)
    this.x = x + cos * 20
    this.y = y + sin * 20
    this.r = r
    this.velocityX = cos * 300
    this.velocityY = sin * 300
    this.enemies = enemies
  }
  update () {
    if (overScreen(this, 20)) this.emit('destroy')
    this.enemies.list.some(enemy => {
      if (enemy.alive && Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y) < 35) {
        this.emit('destroy')
        enemy.hit()
        return true
      }
      return false
    })
  }
}
export default defineComponent({
  components: { Image, Body },
  props: {
    bullet: { type: Bullet, required: true }
  },
  setup () {
    const frame = ref(0)
    const animator = new FrameAnimator([{ key: 'fire', frames: [0, 1, 2], duration: 5 }])
    onPostUpdate(() => {
      frame.value = animator.play('fire')
    })
    return {
      frame,
      blendMode: config.BLEND_MODES.OVERLAY
    }
  }
})
</script>
