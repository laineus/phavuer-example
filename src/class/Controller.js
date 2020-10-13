import VirtualStick from './VirtualStick'
import WasdController from './WasdController'
export default class Controller {
  constructor (scene) {
    this.input = scene.input
    this.virtualStick = new VirtualStick(scene, 100, (100).byBottom)
    this.wasd = new WasdController(this.input.keyboard)
    this.setTouchMode(false)
    this.velocity = 50
  }
  setTouchMode (bool) {
    this.touchMode = bool
    this.virtualStick.setVisible(bool)
  }
  get velocityX () {
    return (this.touchMode ? this.virtualStick.velocityX : this.wasd.velocityX) * this.velocity
  }
  get velocityY () {
    return (this.touchMode ? this.virtualStick.velocityY : this.wasd.velocityY) * this.velocity
  }
  get isDown () {
    return this.touchMode ? this.virtualStickRight.velocity === 1 : this.input.mousePointer.isDown
  }
  get activePointer () {
    return this.input.manager.pointers.find(v => v.isDown)
  }
}
