import * as Phaser from 'phaser'
import config from '../../config'
import BaseClass from '../BaseClass'

export default class Player extends BaseClass {
  tgtX: number
  tgtY: number
  r = 0
  velocityX = 0
  velocityY = 0
  hp = config.GAME.PLAYER_HP
  damageDelay = 0
  shotDelay = config.GAME.FIRES_INTERVAL

  constructor ({ x, y }: { x: number, y: number }) {
    super()
    this.x = x
    this.y = y
    this.tgtX = x
    this.tgtY = y
  }

  update () {
    if (this.damageDelay > 0) this.damageDelay--
    if (this.shotDelay > 0) this.shotDelay--
    const vector = new Phaser.Math.Vector2(this.tgtX - this.x, this.tgtY - this.y)
    this.r = Phaser.Math.Angle.Reverse(vector.angle())
    if (this.shotDelay <= 0) {
      this.shotDelay = config.GAME.FIRES_INTERVAL
      this.emit('shot', { x: this.x, y: this.y, r: this.r })
    }
    if (vector.length() < 10) {
      this.velocityX = 0
      this.velocityY = 0
      return
    }
    vector.normalize().scale(200)
    this.velocityX = vector.x
    this.velocityY = vector.y
  }

  setTargetPosition (x: number, y: number) {
    this.tgtX = x
    this.tgtY = y
  }

  hit (enemy: BaseClass) {
    if (this.damageDelay > 0 || this.hp <= 0) return
    this.damageDelay = 20
    this.hp -= 20
    const vector = new Phaser.Math.Vector2(this.y - enemy.y, this.x - enemy.x).normalize().scale(20)
    this.x += vector.x
    this.y += vector.y
    this.setTargetPosition(this.x, this.y)
    this.emit('hit', enemy)
    if (this.hp <= 0) this.emit('dead', enemy)
  }
}
