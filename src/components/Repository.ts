import { reactive } from 'vue'
import BaseClass from './BaseClass'
export default class Repository<T extends BaseClass> {
  list = reactive([]) as Array<T>
  add (instance: T) {
    this.list.push(instance)
    instance.on('destroy', () => {
      this.remove(instance.id)
    })
  }
  remove (id: Symbol) {
    const i = this.list.findIndex(v => v.id === id)
    this.list.splice(i, 1)
  }
  clear () {
    this.list.splice(0)
  }
  find (id: Symbol) {
    return this.list.find(v => v.id === id)
  }
}
