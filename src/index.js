import 'phaser'
import './util/extendNativeClassFunctions'
import BootScene from './class/BootScene'
import config from './data/config'

const option = {
  type: Phaser.AUTO,
  width: config.WIDTH,
  height: config.HEIGHT,
  scene: [BootScene],
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
