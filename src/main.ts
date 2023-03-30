import 'phaser'
import { createApp } from 'vue'
import config from './config'
import { createPhavuerApp } from 'phavuer'
import App from './components/App.vue'

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: config.WIDTH,
  height: config.HEIGHT,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  audio: {
    disableWebAudio: true
  },
  input: {
    activePointers: 3
  }
})
config.BLEND_MODES.OVERLAY = (game.renderer as Phaser.Renderer.WebGL.WebGLRenderer).addBlendMode([WebGLRenderingContext.SRC_ALPHA, WebGLRenderingContext.ONE], WebGLRenderingContext.FUNC_ADD)
const vueApp = createApp(App)
createPhavuerApp(game, vueApp)
window.addEventListener('resize', () => game.scale.refresh())
