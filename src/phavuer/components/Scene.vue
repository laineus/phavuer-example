<template>
  <div><slot /></div>
</template>

<script>
import { provide } from 'vue'
import { initGameObject } from '../index.js'
export default {
  setup (props, context) {
    // const create = context.attrs.onCreate ? (...arg) => context.emit('create', ...arg) : undefined
    // const update = context.attrs.onUpdate ? (...arg) => context.emit('update', ...arg) : undefined
    // const preload = context.attrs.onPreload ? (...arg) => context.emit('preload', ...arg) : undefined
    const Scene = class extends Phaser.Scene {
      create (...arg) {
        if (context.attrs.onCreate) context.emit('create', ...arg)
      }
      update (...arg) {
        if (context.attrs.onUpdate) context.emit('update', ...arg)
      }
      preload (...arg) {
        if (context.attrs.onPreload) context.emit('preload', ...arg)
      }
    }
    // provide('scene', scene)
    return { Scene }
  },
  props: [
    'key',
    'active'
  ]
}
</script>
