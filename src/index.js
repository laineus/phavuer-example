import 'phaser'
import './util/extendNativeClassFunctions'
import config from './data/config'
import { createPhavuerApp } from './phavuer/index'
import MainScene from './class/MainScene'

const option = {
  type: Phaser.AUTO,
  width: config.WIDTH,
  height: config.HEIGHT,
  scene: {
    create () {
      createPhavuerApp(this.game, { MainScene })
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
