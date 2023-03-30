export default class BaseClass {
  id = Symbol('id')
  event = new EventTarget()
  x: number = NaN
  y: number = NaN
  on (name: string, callback: EventListenerOrEventListenerObject) {
    this.event.addEventListener(name, callback)
    return this
  }
  off (name: string, callback: EventListenerOrEventListenerObject) {
    this.event.removeEventListener(name, callback)
    return this
  }
  emit (name: string, detail?: any) {
    this.event.dispatchEvent(new CustomEvent(name, { detail }))
    return this
  }
}
