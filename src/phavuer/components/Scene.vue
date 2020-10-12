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
    // const create = context.attrs.onCreate ? (...arg) => context.emit('create', ...arg) : undefined
    // const update = context.attrs.onUpdate ? (...arg) => context.emit('update', ...arg) : undefined
    // const preload = context.attrs.onPreload ? (...arg) => context.emit('preload', ...arg) : undefined
    const Scene = class extends Phaser.Scene {
      create (...arg) {
        if (context.attrs.onCreate) context.emit('create', this, ...arg)
      }
      update (...arg) {
        if (context.attrs.onUpdate) context.emit('update', this, ...arg)
      }
      preload (...arg) {
        if (context.attrs.onPreload) context.emit('preload', this, ...arg)
      }
    }
    const game = inject('game')
    game.scene.add(props.name, Scene, props.autoStart)
    return { Scene }
  }
}
</script>
