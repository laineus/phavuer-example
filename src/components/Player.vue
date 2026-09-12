<template>
  <Container :depth="player.y" v-model:x="player.x" v-model:y="player.y">
    <Body :drag="300" :velocityX="player.velocityX" :velocityY="player.velocityY" />
    <Image texture="spinel" :frame="data.frame" :tween="data.dieTween" :tint="tint" />
    <Gauge :y="-30" :value="player.hp / maxHp" />
    <Hit v-if="data.hitVisible" @end="data.hitVisible = false" :x="data.hitX" :y="data.hitY" />
  </Container>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { Container, Image, Body, onPostUpdate, Phavuer } from 'phavuer'
import Gauge from './Gauge.vue'
import Hit from './Hit.vue'
import config from '../config'
import { getAnimationKey8, getDieTween, WALK_ANIMATIONS_8 } from './substanceUtils'
import { useFrameAnimator } from '../composables/useFrameAnimator'
import type { Entity } from '../composables/useEntity'
import type { Player } from '../composables/usePlayer'

const props = defineProps<{ player: Player }>()
const maxHp = config.GAME.PLAYER_HP
const data = reactive({
  frame: 0,
  hitVisible: false,
  hitX: 0,
  hitY: 0,
  dieTween: undefined as Phavuer.TweenConfig | undefined
})
const tint = computed(() => data.dieTween || props.player.damageDelay ? 0xFF0000 : undefined)
const animator = useFrameAnimator(WALK_ANIMATIONS_8)

props.player.on('hit', ((event: CustomEvent<Entity>) => {
  const enemy = event.detail
  data.hitVisible = true
  data.hitX = (enemy.x - props.player.x) / 2
  data.hitY = (enemy.y - props.player.y) / 2
}) as EventListener)

props.player.on('dead', () => {
  data.dieTween = getDieTween(() => props.player.emit('destroy'))
})

onPostUpdate(() => {
  data.frame = animator.play(getAnimationKey8(props.player.r))
})
</script>
