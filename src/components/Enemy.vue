<template>
  <Container :depth="y" v-model:x="x" v-model:y="y">
    <Body :drag="300" :velocityX="velocityX" :velocityY="velocityY" />
    <Image :texture="type.texture" :frame="frame" :tween="dieTween" :tint="dieTween ? 0xFF0000 : undefined" />
  </Container>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { Container, Image, Body, onPostUpdate } from 'phavuer'
import { FrameAnimator, getAnimationKey4, getDieTween, WALK_ANIMATIONS_4 } from './substanceUtils'
import BaseClass from './BaseClass'
const TYPES = [
  { texture: 'kinoko', speed: 100 },
  { texture: 'flower', speed: 60 },
  { texture: 'boar', speed: 150 }
]
export class Enemy extends BaseClass {
  constructor ({ x, y, target }) {
    super()
    this.type = TYPES.random()
    this.x = x
    this.y = y
    this.target = target
    this.vector = null
    this.alive = true
    this.velocityX = 0
    this.velocityY = 0
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
export default {
  components: { Container, Image, Body },
  props: ['enemy'],
  setup (props) {
    const data = reactive({
      frame: 0,
      dieTween: null
    })
    const animator = new FrameAnimator(WALK_ANIMATIONS_4)
    props.enemy.on('hit', () => {
      data.dieTween = getDieTween(() => props.enemy.emit('destroy'))
    })
    onPostUpdate(() => {
      data.frame = animator.play(getAnimationKey4(props.enemy.vector.angle()))
    })
    return {
      ...toRefs(data),
      ...toRefs(props.enemy)
    }
  }
}
</script>
