import { proxyRefs, ref } from 'vue'

export interface AnimationConfig {
  key: string
  frames: number[]
  duration: number
}

export const useFrameAnimator = (settings: AnimationConfig[]) => {
  const patterns: Record<string, (tick: number) => number> = {}
  const tick = ref(0)
  const lastPlayedKey = ref<string | null>(null)

  const registerAnimation = ({ key, frames, duration }: AnimationConfig) => {
    patterns[key] = (tick: number) => {
      const index = Math.floor(tick / duration) % frames.length
      return frames[index]
    }
  }

  const play = (key: string) => {
    if (key !== lastPlayedKey.value) {
      tick.value = 0
      lastPlayedKey.value = key
    } else {
      tick.value++
    }
    return patterns[key](tick.value)
  }

  settings.forEach(registerAnimation)

  return proxyRefs({
    patterns,
    tick,
    lastPlayedKey,
    registerAnimation,
    play
  })
}

export type FrameAnimator = ReturnType<typeof useFrameAnimator>
