<template>
  <Container ref="object" @create="create" :depth="data.depth" v-model:x="data.x" v-model:y="data.y">
    <Image ref="sprite" texture="spinel" :frame="data.frame" />
    <Gauge :y="-30" :value="data.hp / maxHp" />
    <Hit v-if="data.hitVisible" @end="data.hitVisible = false" :x="data.hitX" :y="data.hitY" />
  </Container>
</template>

<script>
import { inject, reactive } from 'vue'
import { refObj, Container, Image, onPreUpdate } from 'phavuer'
import Gauge from './Gauge.vue'
import Hit from './Hit.vue'
import config from '../config'
import { attack, dieAnimation, FrameAnimator, getAnimationKey8, WALK_ANIMATIONS_8 } from './substanceUtils'
export default {
  components: { Container, Image, Gauge, Hit },
  props: ['initialX', 'initialY'],
  emits: ['dead', 'shot'],
  setup (props, context) {
    const scene = inject('scene')
    const object = refObj(null)
    const sprite = refObj(null)
    const tick = inject('tick')
    const data = reactive({ hp: config.GAME.PLAYER_HP, x: props.initialX, y: props.initialY, lastDamaged: 0, frame: 0, flipX: false, depth: 0, tgtX: props.initialX, tgtY: props.initialY, hitVisible: false, hitX: 0, hitY: 0 })
    const animator = new FrameAnimator(WALK_ANIMATIONS_8)
    const setTargetPosition = (x, y) => {
      data.tgtX = x
      data.tgtY = y
    }
    const hit = (enemy) => {
      if ((tick.value - data.lastDamaged) < 20 || data.hp <= 0) return
      data.lastDamaged = tick.value
      data.hp -= 20
      const [newX, newY] = attack(enemy, object.value, sprite.value)
      data.x = newX
      data.y = newY
      setTargetPosition(newX, newY)
      data.hitVisible = true
      data.hitX = (enemy.x - object.value.x) / 2
      data.hitY = (enemy.y - object.value.y) / 2
      if (data.hp > 0) return
      dieAnimation(sprite.value).then(() => {
        context.emit('dead')
      })
    }
    const create = object => {
      scene.physics.world.enable(object)
      object.body.setDrag(300)
    }
    onPreUpdate(() => {
      data.depth = object.y
      const diffX = data.tgtX - object.value.x
      const diffY = data.tgtY - object.value.y
      const r = Math.atan2(-diffY, -diffX)
      data.frame = animator.play(getAnimationKey8(r, 8))
      if (tick.value % config.GAME.FIRES_INTERVAL === 0) {
        context.emit('shot', { id: Symbol('id'), x: object.value.x, y: object.value.y, r })
      }
      const distance = Math.hypot(diffY, diffY)
      if (distance < 10) {
        object.value.body.setVelocity(0, 0)
        return
      }
      object.value.body.setVelocity(diffX, diffY)
      object.value.body.velocity.normalize().scale(200)
    })
    return {
      object,
      sprite,
      data,
      create,
      setTargetPosition,
      hit,
      maxHp: config.GAME.PLAYER_HP
    }
  }
}
</script>
