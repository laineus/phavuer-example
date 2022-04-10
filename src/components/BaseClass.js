export default class BaseClass {
  constructor () {
    this.id = Symbol('id')
    this.callbacks = {}
    this.component = null
  }
  on (name, callback) {
    if (!this.callbacks[name]) {
      this.callbacks[name] = []
    }
    this.callbacks[name].push(callback)
  }
  off (name, callback) {
    const i = this.callbacks[name].findIndex(v => v === callback)
    this.list.splice(i, 1)
  }
  emit (name) {
    this.callbacks[name]?.forEach(v => v())
  }
  setComponent (componentInstance) {
    this.component = componentInstance
  }
  getGameObject (refName) {
    return this.component?.refs[refName]?.object
  }
}
