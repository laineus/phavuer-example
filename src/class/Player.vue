<template>
  <Container :ref="el => object = el && el.object" @create="create" @update="update" :depth="data.depth">
    <Image :ref="el => sprite = el && el.object" texture="spinel" :frame="data.frame" />
    <Gauge :y="-30" :value="data.hp / 100" />
    <Hit v-if="data.hitVisible" @end="data.hitVisible = false" :x="data.hitX" :y="data.hitY" />
  </Container>
</template>

<script>
import { inject, ref, reactive } from 'vue'
import Container from '../phavuer/components/Container'
import Image from '../phavuer/components/Image'
import Gauge from './Gauge'
import Hit from './Hit'
import { attack, dieAnimation, FrameAnimator, getAnimationKey8, WALK_ANIMATIONS_8 } from './substanceUtils'
export default {
  components: { Container, Image, Gauge, Hit },
  props: ['initialX', 'initialY'],
  setup (props, context) {
    const scene = inject('scene')
    const object = ref(null)
    const sprite = ref(null)
    const tick = inject('tick')
    const data = reactive({ hp: 100, lastDamaged: 0, frame: 0, flipX: false, depth: 0, tgtX: props.initialX, tgtY: props.initialY, hitVisible: false, hitX: 0, hitY: 0 })
    const animator = new FrameAnimator(WALK_ANIMATIONS_8)
    const setTargetPosition = (x, y) => {
      data.tgtX = x
      data.tgtY = y
    }
    const hit = (enemy) => {
      if ((tick.value - data.lastDamaged) < 20 || data.hp <= 0) return
      data.lastDamaged = tick.value
      data.hp -= 20
      attack(enemy, object.value, sprite.value)
      setTargetPosition(object.value.x, object.value.y)
      data.hitVisible = true
      data.hitX = (enemy.x - object.value.x) / 2
      data.hitY = (enemy.y - object.value.y) / 2
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
      const diffX = data.tgtX - object.x
      const diffY = data.tgtY - object.y
      const r = Math.atan2(-diffY, -diffX)
      data.frame = animator.play(getAnimationKey8(r, 8))
      if (tick.value % 25 === 0) {
        context.emit('shot', { x: object.x, y: object.y, r })
      }
      const distance = Math.hypot(diffY, diffY)
      if (distance < 10) {
        object.body.setVelocity(0, 0)
        return
      }
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
