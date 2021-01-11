<template>
  <Image ref="object" texture="fire" :frame="data.frame" @create="create" />
</template>

<script>
import { inject, reactive } from 'vue'
import { refObj, Image, onPreUpdate } from 'phavuer'
import { overScreen, closeTo, FrameAnimator } from './substanceUtils'
export default {
  components: { Image },
  props: ['initialX', 'initialY', 'r'],
  emits: ['destroy'],
  setup (props, context) {
    const scene = inject('scene')
    const enemies = inject('enemies')
    const object = refObj(null)
    const data = reactive({ frame: 0 })
    const animator = new FrameAnimator([{ key: 'fire', frames: [0, 1, 2], duration: 5 }])
    const create = object => {
      const addX = Math.cos(props.r)
      const addY = Math.sin(props.r)
      object.setPosition(props.initialX + addX * 30, props.initialY + addY * 30)
      object.setBlendMode(Phaser.BlendModes.OVERLAY)
      object.setRotation(props.r)
      scene.physics.world.enable(object)
      object.body.setVelocity(addX, addY)
      object.body.velocity.normalize().scale(300)
    }
    onPreUpdate(() => {
      data.frame = animator.play('fire')
      if (overScreen(object.value, 20)) context.emit('destroy')
      enemies.value.some(enemy => {
        if (enemy.ref.data.alive && closeTo(object.value, enemy.ref.object)) {
          context.emit('destroy')
          enemy.ref.hit()
          return true
        }
        return false
      })
    })
    return {
      object,
      data,
      create
    }
  }
}
</script>
