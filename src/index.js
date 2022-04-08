import 'phaser'
import { createApp } from 'vue'
import './extendNativeClassFunctions'
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
Phaser.BlendModes.OVERLAY = game.renderer.addBlendMode([WebGLRenderingContext.SRC_ALPHA, WebGLRenderingContext.ONE], WebGLRenderingContext.FUNC_ADD)
const vueApp = createApp(App)
createPhavuerApp(game, vueApp)
window.game = game
window.addEventListener('resize', () => game.scale.refresh())
