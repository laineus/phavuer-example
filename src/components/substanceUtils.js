import config from '../config'

export const overScreen = (object, padding = 0) => {
  return object.x < -padding || object.x > config.WIDTH + padding || object.y < -padding || object.y > config.HEIGHT + padding 
}

export const closeTo = (base, target, distance = 35) => {
  return Math.hypot(target.y - base.y, target.x - base.x) < distance
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

export class FrameAnimator {
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

export const WALK_ANIMATIONS_4 = [
  { key: 'AS', start: 0, end: 2, duration: 20 },
  { key: 'AW', start: 3, end: 5, duration: 20 },
  { key: 'DS', start: 6, end: 8, duration: 20 },
  { key: 'DW', start: 9, end: 11, duration: 20 }
]

export const WALK_ANIMATIONS_8 = [
  { key: 'S', start: 0, end: 2, duration: 20 },
  { key: 'AS', start: 3, end: 5, duration: 20 },
  { key: 'A', start: 6, end: 8, duration: 20 },
  { key: 'DS', start: 9, end: 11, duration: 20 },
  { key: 'D', start: 12, end: 14, duration: 20 },
  { key: 'AW', start: 15, end: 17, duration: 20 },
  { key: 'W', start: 18, end: 20, duration: 20 },
  { key: 'DW', start: 21, end: 23, duration: 20 }
]

export const getAnimationKey4 = r => {
  const step = Math.PI / 2
  switch (Math.ceil(r / step)) {
    case 2: return 'AS'
    case 1: return 'DS'
    case 0: return 'DW'
    case -1: return 'AW'
  }
}

export const getAnimationKey8 = r => {
  const step = Math.PI / 4
  switch (Math.round(r / step)) {
    case 4: return 'A'
    case 3: return 'AS'
    case 2: return 'S'
    case 1: return 'DS'
    case 0: return 'D'
    case -1: return 'DW'
    case -2: return 'W'
    case -3: return 'AW'
    case -4: return 'A'
  }
}
