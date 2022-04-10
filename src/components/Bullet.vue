<template>
  <Image texture="fire" :frame="frame" v-model:x="x" v-model:y="y" :rotation="r" :blendMode="blendMode">
    <Body :velocityX="velocityX" :velocityY="velocityY" />
  </Image>
</template>

<script>
import { getCurrentInstance, ref, toRefs } from 'vue'
import { Image, Body, onPostUpdate } from 'phavuer'
import { overScreen, closeTo, FrameAnimator } from './substanceUtils'
import BaseClass from './BaseClass'
export class Bullet extends BaseClass {
  constructor ({ x, y, r, enemies }) {
    super()
    this.x = x
    this.y = y
    this.r = r
    this.enemies = enemies
    const cos = Math.cos(r)
    const sin = Math.sin(r)
    this.velocityX = cos * 300
    this.velocityY = sin * 300
    this.x += cos * 20
    this.y += sin * 20
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
    const animator = new FrameAnimator([{ key: 'fire', frames: [0, 1, 2], duration: 5 }])
    onPostUpdate(() => {
      frame.value = animator.play('fire')
    })
    return {
      frame,
      ...toRefs(props.bullet),
      blendMode: Phaser.BlendModes.OVERLAY
    }
  }
}
</script>
