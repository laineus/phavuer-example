<template>
  <div><slot /></div>
</template>

<script>
import { provide, inject } from 'vue'
import { initGameObject } from '../index.js'
export default {
  props: {
    name: { type: String, require: true },
    autoStart: { type: Boolean, default: true }
  },
  setup (props, context) {
    const Scene = class extends Phaser.Scene {
      create (...arg) {
        context.emit('create', this, ...arg)
      }
      update (...arg) {
        context.emit('update', this, ...arg)
      }
      preload (...arg) {
        context.emit('preload', this, ...arg)
      }
    }
    const game = inject('game')
    const scene = game.scene.add(props.name, Scene, props.autoStart)
    provide('scene', scene)
    return { scene }
  }
}
</script>
