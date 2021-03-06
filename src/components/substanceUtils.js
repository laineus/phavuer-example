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
    this.lastPlayedKey = null
    settings.forEach(setting => this.registerAnim(setting))
  }
  registerAnim ({ key, frames, duration }) {
    this.patterns[key] = tick => {
      const i = Math.floor(tick / duration) % frames.length
      return frames[i]
    }
  }
  play (key) {
    if (key !== this.lastPlayedKey) {
      this.tick = 0
      this.lastPlayedKey = key
    } else {
      this.tick++
    }
    return this.patterns[key](this.tick)
  }
}

export const WALK_ANIMATIONS_4 = [
  { key: 'AS', frames: [0, 1, 2], duration: 20 },
  { key: 'AW', frames: [3, 4, 5], duration: 20 },
  { key: 'DS', frames: [6, 7, 8], duration: 20 },
  { key: 'DW', frames: [9, 10, 11], duration: 20 }
]

export const WALK_ANIMATIONS_8 = [
  { key: 'S', frames: [0, 1, 2], duration: 20 },
  { key: 'AS', frames: [3, 4, 5], duration: 20 },
  { key: 'A', frames: [6, 7, 8], duration: 20 },
  { key: 'DS', frames: [9, 10, 11], duration: 20 },
  { key: 'D', frames: [12, 13, 14], duration: 20 },
  { key: 'AW', frames: [15, 16, 17], duration: 20 },
  { key: 'W', frames: [18, 19, 20], duration: 20 },
  { key: 'DW', frames: [21, 22, 23], duration: 20 }
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
