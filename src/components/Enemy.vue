<template>
  <Container :depth="enemy.y" v-model:x="enemy.x" v-model:y="enemy.y">
    <Body :velocityX="enemy.velocityX" :velocityY="enemy.velocityY" />
    <Image :texture="enemy.type.texture" :frame="data.frame" :tween="data.dieTween" :tint="data.dieTween ? 0xFF0000 : undefined" />
  </Container>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { Container, Image, Body, onPostUpdate, Phavuer } from 'phavuer'
import { FrameAnimator, getAnimationKey4, getDieTween, WALK_ANIMATIONS_4 } from './substanceUtils'
import BaseClass from './BaseClass'
import { Player } from './Player.vue'
const TYPES = [
  { texture: 'kinoko', speed: 100 },
  { texture: 'flower', speed: 60 },
  { texture: 'boar', speed: 150 }
]
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max + 1 - min)) + min
const random = <T>(arr: Array<T>) => arr[randomInt(0, arr.length - 1)]
export class Enemy extends BaseClass {
  type = random(TYPES)
  vector = new Phaser.Math.Vector2(NaN, NaN)
  alive = true
  velocityX = 0
  velocityY = 0
  target: Player
  constructor ({ x, y, target }: { x: number, y: number, target: Player }) {
    super()
    this.x = x
    this.y = y
    this.target = target
  }
  update () {
    this.vector = new Phaser.Math.Vector2(this.target.x - this.x, this.target.y - this.y)
    if (this.vector.length() < 10 || !this.alive) {
      this.velocityX = 0
      this.velocityY = 0
      if (this.alive) this.target.hit(this)
      return
    }
    this.vector.normalize().scale(this.type.speed)
    this.velocityX = this.vector.x
    this.velocityY = this.vector.y
  }
  hit () {
    this.alive = false
    this.emit('hit')
  }
}
export default defineComponent({
  components: { Container, Image, Body },
  props: {
    enemy: {type: Enemy, required: true }
  },
  setup (props) {
    const data = reactive({
      frame: 0,
      dieTween: undefined as Phavuer.TweenConfig | undefined
    })
    const animator = new FrameAnimator(WALK_ANIMATIONS_4)
    props.enemy.on('hit', () => {
      data.dieTween = getDieTween(() => props.enemy.emit('destroy'))
    })
    onPostUpdate(() => {
      data.frame = animator.play(getAnimationKey4(props.enemy.vector.angle()))
    })
    return {
      data
    }
  }
})
</script>
