export default class FrameAnimater {
  constructor (settings) {
    this.patterns = {}
    this.tick = 0
    settings.forEach(setting => this.registerAnim(setting))
  }
  registerAnim ({ key, start, end, duration }) {
    const count = (end - start) + 1
    this.patterns[key] = tick => start + (Math.floor(tick / duration) % count)
  }
  play (key) {
    this.tick++
    return this.patterns[key](this.tick)
  }
}
