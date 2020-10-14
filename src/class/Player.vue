<template>
  <Container :ref="el => object = el && el.object" @create="create" @update="update" :depth="data.depth">
    <Sprite :ref="el => sprite = el && el.object" texture="spinel" :frame="data.frame" :flipX="data.flipX" />
    <Gauge :y="-30" :value="data.hp / 100" />
  </Container>
</template>

<script>
import { inject, ref, reactive, computed } from 'vue'
import Container from '../phavuer/components/Container'
import Sprite from '../phavuer/components/Sprite'
import Gauge from './Gauge'
import FrameAnimator from './FrameAnimator'
import { attack, dieAnimation } from './substanceUtils'
export default {
  components: { Container, Sprite, Gauge },
  props: ['initialX', 'initialY'],
  setup (props, context) {
    const scene = inject('scene')
    const object = ref(null)
    const sprite = ref(null)
    const tick = inject('tick')
    const data = reactive({ hp: 100, lastDamaged: 0, frame: 0, flipX: false, depth: 0, tgtX: props.initialX, tgtY: props.initialY })
    const animator = new FrameAnimator([{ key: 'walk', start: 3, end: 5, duration: 20 }])
    const setTargetPosition = (x, y) => {
      data.tgtX = x
      data.tgtY = y
    }
    const hit = (enemy) => {
      if ((tick.value - data.lastDamaged) < 20 || data.hp <= 0) return
      data.lastDamaged = tick.value
      data.hp -= 10
      attack(enemy, object.value, sprite.value)
      setTargetPosition(object.value.x, object.value.y)
      if (data.hp > 0) return
      dieAnimation(sprite.value).then(() => {
        context.emit('dead')
      })
    }
    const create = object => {
      object.setPosition(props.initialX, props.initialY)
      scene.physics.world.enable(object)
      object.body.setDrag(300)
    }
    const update = (object, time) => {
      data.depth = object.y
      data.frame = animator.play('walk')
      const diffX = data.tgtX - object.x
      const diffY = data.tgtY - object.y
      if (tick.value % 30 === 0) {
        context.emit('shot', { x: object.x, y: object.y, r: Math.atan2(-diffY, -diffX) })
      }
      const distance = Math.hypot(diffY, diffY)
      if (distance < 10) {
        object.body.setVelocity(0, 0)
        return
      }
      data.flipX = diffX < 0
      object.body.setVelocity(diffX, diffY)
      object.body.velocity.normalize().scale(200)
    }
    return {
      object,
      sprite,
      data,
      create,
      update,
      setTargetPosition,
      hit
    }
  }
}
</script>
