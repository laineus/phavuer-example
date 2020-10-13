<template>
  <Sprite ref="el" texture="fire" :frame="data.frame" @create="create" @update="update" />
</template>

<script>
import { inject, ref, reactive } from 'vue'
import Sprite from '../phavuer/components/Sprite'
import FrameAnimator from './FrameAnimator'
import { overScreen, closeTo } from './substanceUtils'
export default {
  components: { Sprite },
  props: ['initialX', 'initialY', 'r'],
  setup (props, context) {
    const scene = inject('scene')
    const enemies = inject('enemies')
    const data = reactive({ frame: 0 })
    const animator = new FrameAnimator([{ key: 'fire', start: 0, end: 2, duration: 5 }])
    const create = object => {
      object.setPosition(props.initialX, props.initialY)
      object.setBlendMode(Phaser.BlendModes.OVERLAY)
      object.setRotation(props.r)
      scene.physics.world.enable(object)
      object.body.setVelocity(Math.cos(props.r), Math.sin(props.r))
      object.body.velocity.normalize().scale(300)
    }
    const update = object => {
      data.frame = animator.play('fire')
      if (overScreen(object, 20)) context.emit('destroy')
      enemies.list.some(v => {
        if (closeTo(object, v.object)) {
          context.emit('destroy')
          return true
        }
        return false
      })
    }
    return {
      el: ref(null),
      data,
      create,
      update
    }
  }
}
</script>
