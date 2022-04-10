import { ref, unref } from 'vue'
export default class Repository {
  constructor () {
    this._list = ref([])
  }
  get list () {
    return unref(this._list)
  }
  add (instance) {
    this.list.push(instance)
    instance.on('destroy', () => {
      this.remove(instance.id)
    })
  }
  remove (id) {
    const i = this.list.findIndex(v => v.id === id)
    this.list.splice(i, 1)
  }
  clear () {
    this.list.splice(0)
  }
  find (id) {
    return this.list.find(v => v.id === id)
  }
}
