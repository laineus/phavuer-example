import loadAssets from '../util/loadAssets'
export default class BootScene extends Phaser.Scene {
  constructor () {
    super({ key: 'Boot', active: true })
  }
  create () {
    this.scene.start('UI')
    this.scene.start('Title')
  }
  preload () {
    loadAssets(this)
  }
}
