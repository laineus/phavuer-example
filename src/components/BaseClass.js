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
    return this
  }
  off (name, callback) {
    const i = this.callbacks[name].findIndex(v => v === callback)
    this.list.splice(i, 1)
    return this
  }
  emit (name, ...args) {
    this.callbacks[name]?.forEach(v => v(...args))
    return this
  }
  setComponent (componentInstance) {
    this.component = componentInstance
    return this
  }
  getGameObject (refName) {
    return this.component?.refs[refName]?.object
  }
}
