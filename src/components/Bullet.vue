<template>
  <Image texture="fire" :frame="frame" v-model:x="bullet.x" v-model:y="bullet.y" :rotation="bullet.r" :blendMode="blendMode">
    <Body :velocityX="velocityX" :velocityY="velocityY" />
  </Image>
</template>

<script>
import { getCurrentInstance, ref } from 'vue'
import { Image, Body, onPreUpdate } from 'phavuer'
import { overScreen, closeTo, FrameAnimator } from './substanceUtils'
import BaseClass from './BaseClass'
export class Bullet extends BaseClass {
  constructor ({ x, y, r, enemies }) {
    super()
    this.x = x
    this.y = y
    this.r = r
    this.enemies = enemies
  }
  update () {
    if (overScreen(this, 20)) this.emit('destroy')
    this.enemies.list.some(enemy => {
      if (enemy.alive && closeTo(this, enemy)) {
        this.emit('destroy')
        enemy.hit()
        return true
      }
      return false
    })
  }
}
export default {
  components: { Image, Body },
  props: ['bullet'],
  setup (props) {
    props.bullet.setComponent(getCurrentInstance())
    const frame = ref(0)
    const cos = Math.cos(props.bullet.r)
    const sin = Math.sin(props.bullet.r)
    const velocityX = cos * 300
    const velocityY = sin * 300
    const animator = new FrameAnimator([{ key: 'fire', frames: [0, 1, 2], duration: 5 }])
    onPreUpdate(() => {
      frame.value = animator.play('fire')
      props.bullet.update()
    })
    return {
      frame,
      velocityX,
      velocityY,
      blendMode: Phaser.BlendModes.OVERLAY
    }
  }
}
</script>
