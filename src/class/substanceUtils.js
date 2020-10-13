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
      object: null,
      register: data => row.object = data
    }
    this.list.push(row)
  }
  remove (id) {
    const i = this.list.findIndex(v => v.id === id)
    this.list.splice(i, 1)
  }
}
