<template>
  <Container :depth="player.y" v-model:x="player.x" v-model:y="player.y">
    <Body :drag="300" :velocityX="player.velocityX" :velocityY="player.velocityY" />
    <Image texture="spinel" :frame="data.frame" :tween="data.dieTween" :tint="tint" />
    <Gauge :y="-30" :value="player.hp / maxHp" />
    <Hit v-if="data.hitVisible" @end="data.hitVisible = false" :x="data.hitX" :y="data.hitY" />
  </Container>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from 'vue'
import { Container, Image, Body, onPostUpdate, Phavuer } from 'phavuer'
import Gauge from './Gauge.vue'
import Hit from './Hit.vue'
import config from '../config'
import { FrameAnimator, getAnimationKey8, getDieTween, WALK_ANIMATIONS_8 } from './substanceUtils'
import BaseClass from './BaseClass'
export class Player extends BaseClass {
  tgtX: number
  tgtY: number
  r = 0
  velocityX = 0
  velocityY = 0
  hp = config.GAME.PLAYER_HP
  damageDelay = 0
  shotDelay = config.GAME.FIRES_INTERVAL
  constructor ({ x, y }: { x: number, y: number }) {
    super()
    this.x = x
    this.y = y
    this.tgtX = x
    this.tgtY = y
  }
  update () {
    if (this.damageDelay > 0) this.damageDelay--
    if (this.shotDelay > 0) this.shotDelay--
    const vector = new Phaser.Math.Vector2(this.tgtX - this.x, this.tgtY - this.y)
    this.r = Phaser.Math.Angle.Reverse(vector.angle())
    if (this.shotDelay <= 0) {
      this.shotDelay = config.GAME.FIRES_INTERVAL
      this.emit('shot', { x: this.x, y: this.y, r: this.r })
    }
    if (vector.length() < 10) {
      this.velocityX = 0
      this.velocityY = 0
      return
    }
    vector.normalize().scale(200)
    this.velocityX = vector.x
    this.velocityY = vector.y
  }
  setTargetPosition (x: number, y: number) {
    this.tgtX = x
    this.tgtY = y
  }
  hit (enemy: BaseClass) {
    if (this.damageDelay > 0 || this.hp <= 0) return
    this.damageDelay = 20
    this.hp -= 20
    const vector = new Phaser.Math.Vector2(this.y - enemy.y, this.x - enemy.x).normalize().scale(20)
    this.x += vector.x
    this.y += vector.y
    this.setTargetPosition(this.x, this.y)
    this.emit('hit', enemy)
    if (this.hp <= 0) this.emit('dead', enemy)
  }
}
export default defineComponent({
  components: { Container, Image, Body, Gauge, Hit },
  props: ['player'],
  setup (props) {
    const data = reactive({
      frame: 0,
      hitVisible: false,
      hitX: 0,
      hitY: 0,
      dieTween: undefined as Phavuer.TweenConfig | undefined
    })
    const tint = computed(() => data.dieTween || props.player.damageDelay ? 0xFF0000 : undefined)
    const animator = new FrameAnimator(WALK_ANIMATIONS_8)
    props.player.on('hit', (enemy: BaseClass) => {
      data.hitVisible = true
      data.hitX = (enemy.x - props.player.x) / 2
      data.hitY = (enemy.y - props.player.y) / 2
    })
    props.player.on('dead', () => {
      data.dieTween = getDieTween(() => props.player.emit('destroy'))
    })
    onPostUpdate(() => {
      data.frame = animator.play(getAnimationKey8(props.player.r))
    })
    return {
      data,
      tint,
      maxHp: config.GAME.PLAYER_HP
    }
  }
})
</script>
