<template>
  <Container :depth="enemy.y" v-model:x="enemy.x" v-model:y="enemy.y">
    <Body :velocityX="enemy.velocityX" :velocityY="enemy.velocityY" />
    <Image :texture="enemy.type.texture" :frame="data.frame" :tween="data.dieTween" :tint="data.dieTween ? 0xFF0000 : undefined" />
  </Container>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Container, Image, Body, onPostUpdate, Phavuer } from 'phavuer'
import { FrameAnimator, getAnimationKey4, getDieTween, WALK_ANIMATIONS_4 } from './substanceUtils'
import Enemy from './entities/Enemy'

const props = defineProps<{ enemy: Enemy }>()
const data = reactive({
  frame: 0,
  dieTween: undefined as Phavuer.TweenConfig | undefined
})
const animator = new FrameAnimator(WALK_ANIMATIONS_4)

props.enemy.on('hit', () => {
  data.dieTween = getDieTween(() => props.enemy.emit('destroy'))
})

onPostUpdate(() => {
  data.frame = animator.play(getAnimationKey4(props.enemy.vector.angle()))
})
</script>
