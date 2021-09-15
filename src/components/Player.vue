<template>
  <Container :depth="y" v-model:x="x" v-model:y="y">
    <Body :drag="300" :velocityX="velocityX" :velocityY="velocityY" />
    <Image ref="sprite" texture="spinel" :frame="frame" />
    <Gauge :y="-30" :value="hp / maxHp" />
    <Hit v-if="hitVisible" @end="hitVisible = false" :x="hitX" :y="hitY" />
  </Container>
</template>

<script>
import { inject, reactive, toRefs } from 'vue'
import { refObj, Container, Image, Body, onPreUpdate } from 'phavuer'
import Gauge from './Gauge.vue'
import Hit from './Hit.vue'
import config from '../config'
import { attack, dieAnimation, FrameAnimator, getAnimationKey8, WALK_ANIMATIONS_8 } from './substanceUtils'
export default {
  components: { Container, Image, Body, Gauge, Hit },
  props: ['initialX', 'initialY'],
  emits: ['dead', 'shot'],
  setup (props, context) {
    const sprite = refObj(null)
    const tick = inject('tick')
    const data = reactive({
      hp: config.GAME.PLAYER_HP,
      x: props.initialX,
      y: props.initialY,
      velocityX: 0,
      velocityY: 0,
      lastDamaged: 0,
      frame: 0,
      flipX: false,
      tgtX: props.initialX,
      tgtY: props.initialY,
      hitVisible: false,
      hitX: 0,
      hitY: 0
    })
    const animator = new FrameAnimator(WALK_ANIMATIONS_8)
    const setTargetPosition = (x, y) => {
      data.tgtX = x
      data.tgtY = y
    }
    const hit = (enemy) => {
      if ((tick.value - data.lastDamaged) < 20 || data.hp <= 0) return
      data.lastDamaged = tick.value
      data.hp -= 20
      const [newX, newY] = attack(enemy, data, sprite.value)
      data.x = newX
      data.y = newY
      setTargetPosition(newX, newY)
      data.hitVisible = true
      data.hitX = (enemy.x - data.x) / 2
      data.hitY = (enemy.y - data.y) / 2
      if (data.hp > 0) return
      dieAnimation(sprite.value).then(() => {
        context.emit('dead')
      })
    }
    onPreUpdate(() => {
      const vector = new Phaser.Math.Vector2(data.tgtX - data.x, data.tgtY - data.y)
      const r = Phaser.Math.Angle.Reverse(vector.angle())
      data.frame = animator.play(getAnimationKey8(r, 8))
      if (tick.value % config.GAME.FIRES_INTERVAL === 0) {
        context.emit('shot', { x: data.x, y: data.y, r })
      }
      if (vector.length() < 10) {
        data.velocityX = 0
        data.velocityY = 0
        return
      }
      vector.normalize().scale(200)
      data.velocityX = vector.x
      data.velocityY = vector.y
    })
    return {
      ...toRefs(data),
      sprite,
      setTargetPosition,
      hit,
      maxHp: config.GAME.PLAYER_HP
    }
  }
}
</script>
