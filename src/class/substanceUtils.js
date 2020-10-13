import { reactive } from 'vue'
import config from '../data/config'

export const overScreen = (object, padding = 0) => {
  return object.x < -padding || object.x > config.WIDTH + padding || object.y < -padding || object.y > config.HEIGHT + padding 
}

export class Repository {
  constructor () {
    this.list = reactive([])
    this.lastId = 0
  }
  push (item) {
    this.lastId++
    this.list.push({ id: this.lastId, item })
  }
  remove (id) {
    const i = this.list.findIndex(v => v.id === id)
    this.list.splice(i, 1)
  }
}
