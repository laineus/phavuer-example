import config from './config'
// Number instance methods
Object.defineProperty(Number.prototype, 'half', {
  get () { return this / 2 }
})
Object.defineProperty(Number.prototype, 'toArray', {
  value () { return [...Array(this).keys()] }
})
Object.defineProperty(Number.prototype, 'toColorString', {
  get () { return `#${this.toString(16)}` }
})
Object.defineProperty(Number.prototype, 'byRight', {
  get () { return config.WIDTH - this }
})
Object.defineProperty(Number.prototype, 'byBottom', {
  get () { return config.HEIGHT - this }
})
// String instance methods
Object.defineProperty(String.prototype, 'width', {
  get () {
    return [...Array(this.valueOf().length).keys()].map(i => {
      const charCode = this.charCodeAt(i)
      if (charCode >= 0x00 && charCode < 0x81) return 1
      if (charCode === 0xf8f0) return 1
      if (charCode >= 0xff61 && charCode < 0xffa0) return 1
      if (charCode >= 0xf8f1 && charCode < 0xf8f4) return 1
      return 2
    }).reduce((sum, v) => sum + v, 0)
  }
})
Object.defineProperty(String.prototype, 'toColorInt', {
  get () { return parseInt(this.slice(1), 16) }
})
Object.defineProperty(String.prototype, 'upperCase', {
  get () { return this.replace(/^[a-z]/g, v => v.toUpperCase()) }
})
// Array instance methods
Object.defineProperty(Array.prototype, 'random', {
  value () { return this[Math.randomInt(0, this.length - 1)] }
})
Object.defineProperty(Array.prototype, 'count', {
  value (callbackfn) { return this.filter(callbackfn).length }
})
// Math class methods
Math.sum = (...args) => args.reduce((accumulator, current) => accumulator + current)
Math.average = (...args) => Math.sum(...args) / args.length
Math.fix = (value, min, max) => Math.min(Math.max(value, min), max)
Math.randomInt = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min
Math.chance = (percent = 0.5) => percent > Math.random()
// Object class method
Object.isObject = value => Boolean(value && value.constructor === Object)
// Array class method
Array.range = (start, end) => (end - start + 1).toArray().map(i => i + start)
