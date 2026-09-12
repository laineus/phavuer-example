import * as Phaser from 'phaser'
import BaseClass from '../BaseClass'
import type Player from './Player'

const TYPES = [
  { texture: 'kinoko', speed: 100 },
  { texture: 'flower', speed: 60 },
  { texture: 'boar', speed: 150 }
]

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max + 1 - min)) + min
const random = <T>(arr: Array<T>) => arr[randomInt(0, arr.length - 1)]

export default class Enemy extends BaseClass {
  type = random(TYPES)
  vector = new Phaser.Math.Vector2(NaN, NaN)
  alive = true
  velocityX = 0
  velocityY = 0
  target: Player

  constructor ({ x, y, target }: { x: number, y: number, target: Player }) {
    super()
    this.x = x
    this.y = y
    this.target = target
  }

  update () {
    this.vector = new Phaser.Math.Vector2(this.target.x - this.x, this.target.y - this.y)
    if (this.vector.length() < 10 || !this.alive) {
      this.velocityX = 0
      this.velocityY = 0
      if (this.alive) this.target.hit(this)
      return
    }
    this.vector.normalize().scale(this.type.speed)
    this.velocityX = this.vector.x
    this.velocityY = this.vector.y
  }

  hit () {
    this.alive = false
    this.emit('hit')
  }
}
