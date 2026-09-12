<template>
  <Image texture="fire" :frame="frame" v-model:x="bullet.x" v-model:y="bullet.y" :rotation="bullet.r" :blendMode="blendMode">
    <Body :velocityX="bullet.velocityX" :velocityY="bullet.velocityY" />
  </Image>
</template>

<script setup lang="ts">
import * as Phaser from 'phaser'
import { ref } from 'vue'
import { Image, Body, onPostUpdate } from 'phavuer'
import { FrameAnimator } from './substanceUtils'
import Bullet from './entities/Bullet'

defineProps<{ bullet: Bullet }>()

const frame = ref(0)
const blendMode = Phaser.BlendModes.ADD
const animator = new FrameAnimator([{ key: 'fire', frames: [0, 1, 2], duration: 5 }])

onPostUpdate(() => {
  frame.value = animator.play('fire')
})
</script>
