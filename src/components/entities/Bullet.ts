import * as Phaser from 'phaser'
import BaseClass from '../BaseClass'
import Repository from '../Repository'
import { overScreen } from '../substanceUtils'
import type Enemy from './Enemy'

export default class Bullet extends BaseClass {
  r = NaN
  velocityX: number
  velocityY: number
  enemies: Repository<Enemy>

  constructor ({ x, y, r, enemies }: { x: number, y: number, r: number, enemies: Repository<Enemy> }) {
    super()
    const cos = Math.cos(r)
    const sin = Math.sin(r)
    this.x = x + cos * 20
    this.y = y + sin * 20
    this.r = r
    this.velocityX = cos * 300
    this.velocityY = sin * 300
    this.enemies = enemies
  }

  update () {
    if (overScreen(this, 20)) this.emit('destroy')
    this.enemies.list.some(enemy => {
      if (enemy.alive && Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y) < 35) {
        this.emit('destroy')
        enemy.hit()
        return true
      }
      return false
    })
  }
}
