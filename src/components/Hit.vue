<template>
  <Image texture="hit" :tween="tween" />
</template>

<script setup lang="ts">
import { Image } from 'phavuer'

const emit = defineEmits<{ end: [] }>()
const tween = {
  scale: { from: 0, to: 1 },
  duration: 100,
  onComplete: () => emit('end')
}
</script>
