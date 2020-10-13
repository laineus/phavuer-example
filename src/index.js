import 'phaser'
import './util/extendNativeClassFunctions'
import loadAssets from './util/loadAssets'
import config from './data/config'
import { createPhavuerApp } from './phavuer/index'
import App from './class/App'

const option = {
  type: Phaser.AUTO,
  width: config.WIDTH,
  height: config.HEIGHT,
  scene: {
    create () {
      Phaser.BlendModes.OVERLAY = this.sys.game.renderer.addBlendMode([WebGLRenderingContext.SRC_ALPHA, WebGLRenderingContext.ONE], WebGLRenderingContext.FUNC_ADD)
      createPhavuerApp(this.game, App)
    },
    preload () {
      loadAssets(this)
    }
  },
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
}

const game = new Phaser.Game(option)
window.game = game
window.addEventListener('resize', () => game.scale.refresh())
