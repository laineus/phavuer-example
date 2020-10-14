import { reactive } from 'vue'
import config from '../data/config'

export const overScreen = (object, padding = 0) => {
  return object.x < -padding || object.x > config.WIDTH + padding || object.y < -padding || object.y > config.HEIGHT + padding 
}

export const closeTo = (base, target, distance = 35) => {
  return Math.hypot(target.y - base.y, target.x - base.x) < distance
}

export class Repository {
  constructor () {
    this.list = reactive([])
    this.lastId = 0
  }
  push (item) {
    this.lastId++
    const row = {
      id: this.lastId,
      item,
      el: null,
      register: data => row.el = data
    }
    this.list.push(row)
  }
  remove (id) {
    const i = this.list.findIndex(v => v.id === id)
    this.list.splice(i, 1)
  }
  clear () {
    this.list.splice(0)
  }
}

export const dieAnimation = obj => {
  return new Promise(resolve => {
    obj.setTint(0xFF0000)
    obj.scene.add.tween({
      targets: obj, duration: 150, ease: 'Power2',
      scaleX: 1.3, scaleY: 1.3, alpha: 0.2,
      onComplete: resolve
    })
  })
}

export const attack = (base, target, sprite = null) => {
  sprite = sprite || target
  sprite.setTint(0xFF0000)
  setTimeout(() => sprite.setTint(0xFFFFFF), 200)
  const r = Math.atan2(target.y - base.y, target.x - base.x)
  target.setPosition(target.x + Math.cos(r) * 20, target.y + Math.cos(r) * 20)
}
