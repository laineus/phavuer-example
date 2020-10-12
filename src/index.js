import 'phaser'
import './util/extendNativeClassFunctions'
import BootScene from './class/BootScene'
import config from './data/config'
import { createComponent } from './phavuer/index'
import App from './phavuer/components/App'
import { toRaw, createApp } from 'vue'
import MainScene from './class/MainScene'

const createPhavuerApp = (sceneComponents, startSceneName) => {
  const boot = bootScene => {
    const app = createApp(App)
    const scenes = Object.keys(sceneComponents).reduce((scenes, key) => {
      app.component(key, sceneComponents[key])
      const Scene = {
        create (...arg) {
          console.log('crea')
        }
      }
      scenes[key] = game.scene.add(key, Scene, key === startSceneName)
      return scenes
    }, {})
    app.provide('game', bootScene.game)
    app.provide('scenes', scenes)
    // mount Vue 3 app
    const dummyElement = window.document.createElement('div')
    document.body.appendChild(dummyElement)
    return app.mount(dummyElement)
  }
  return {
    create () {
      boot(this)
    }
  }
}
// const app = createComponent(null, App)
// console.log(app.mainScene.scene.scene, BootScene)

const option = {
  type: Phaser.AUTO,
  width: config.WIDTH,
  height: config.HEIGHT,
  scene: createPhavuerApp({ MainScene }, 'MainScene'),
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
