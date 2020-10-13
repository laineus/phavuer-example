<template>
  <Sprite ref="el" texture="fire" :frame="data.frame" :depth="data.depth" @create="create" @update="update" />
</template>

<script>
import { inject, ref, reactive } from 'vue'
import Sprite from '../phavuer/components/Sprite'
import FrameAnimator from './FrameAnimator'
export default {
  components: { Sprite },
  props: ['initialX', 'initialY', 'r'],
  setup (props) {
    const scene = inject('scene')
    const data = reactive({ frame: 0, depth: 0 })
    const animator = new FrameAnimator([{ key: 'fire', start: 0, end: 2, duration: 5 }])
    const create = object => {
      object.setPosition(props.initialX, props.initialY)
      object.setBlendMode(Phaser.BlendModes.OVERLAY)
      scene.physics.world.enable(object)
      object.body.setVelocity(Math.cos(props.r), Math.sin(props.r))
      object.body.velocity.normalize().scale(300)
    }
    const update = object => {
      // data.depth = object.y
      data.frame = animator.play('fire')
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
