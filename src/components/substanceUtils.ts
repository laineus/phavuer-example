import config from '../config'
import type { AnimationConfig } from '../composables/useFrameAnimator'

export const overScreen = ({ x, y }: { x: number, y: number }, padding = 0) => {
  return x < -padding || x > config.WIDTH + padding || y < -padding || y > config.HEIGHT + padding
}

export const getDieTween = (onComplete: () => void) => {
  return {
    duration: 150, ease: 'Power2',
    props: {
      scaleX: 1.3, scaleY: 1.3, alpha: 0.2,
    },
    onComplete
  }
}

export const WALK_ANIMATIONS_4 = [
  { key: 'AS', frames: [0, 1, 2], duration: 20 },
  { key: 'AW', frames: [3, 4, 5], duration: 20 },
  { key: 'DS', frames: [6, 7, 8], duration: 20 },
  { key: 'DW', frames: [9, 10, 11], duration: 20 }
] as AnimationConfig[]

export const WALK_ANIMATIONS_8 = [
  { key: 'S', frames: [0, 1, 2], duration: 20 },
  { key: 'AS', frames: [3, 4, 5], duration: 20 },
  { key: 'A', frames: [6, 7, 8], duration: 20 },
  { key: 'DS', frames: [9, 10, 11], duration: 20 },
  { key: 'D', frames: [12, 13, 14], duration: 20 },
  { key: 'AW', frames: [15, 16, 17], duration: 20 },
  { key: 'W', frames: [18, 19, 20], duration: 20 },
  { key: 'DW', frames: [21, 22, 23], duration: 20 }
] as AnimationConfig[]

export const getAnimationKey4 = (r: number) => {
  const step = Math.PI / 2
  switch (Math.ceil(r / step)) {
    case 4: return 'DW'
    case 3: return 'AW'
    case 2: return 'AS'
    case 1: return 'DS'
  }
  throw new Error()
}

export const getAnimationKey8 = (r: number) => {
  const step = Math.PI / 4
  switch (Math.round(r / step)) {
    case 4: return 'A'
    case 3: return 'AS'
    case 2: return 'S'
    case 1: return 'DS'
    case 0: return 'D'
    case 8: return 'DW'
    case 7: return 'W'
    case 6: return 'AW'
    case 5: return 'A'
  }
  throw new Error()
}
