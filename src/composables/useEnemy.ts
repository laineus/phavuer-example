import * as Phaser from 'phaser'
import { proxyRefs, ref } from 'vue'
import { useEntity } from './useEntity'
import type { Player } from './usePlayer'

const TYPES = [
  { texture: 'kinoko', speed: 100 },
  { texture: 'flower', speed: 60 },
  { texture: 'boar', speed: 150 }
]

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max + 1 - min)) + min
const random = <T>(values: Array<T>) => values[randomInt(0, values.length - 1)]

export const useEnemy = ({ x, y, target }: { x: number, y: number, target: Player }) => {
  const entity = useEntity()
  const type = random(TYPES)
  const vector = ref(new Phaser.Math.Vector2(NaN, NaN))
  const alive = ref(true)
  const velocityX = ref(0)
  const velocityY = ref(0)

  entity.x = x
  entity.y = y

  const update = () => {
    vector.value = new Phaser.Math.Vector2(target.x - enemy.x, target.y - enemy.y)
    if (vector.value.length() < 10 || !alive.value) {
      velocityX.value = 0
      velocityY.value = 0
      if (alive.value) target.hit(enemy)
      return
    }
    vector.value.normalize().scale(type.speed)
    velocityX.value = vector.value.x
    velocityY.value = vector.value.y
  }

  const hit = () => {
    alive.value = false
    enemy.emit('hit')
  }

  const enemy = proxyRefs({
    ...entity,
    type,
    vector,
    alive,
    velocityX,
    velocityY,
    target,
    update,
    hit
  })

  return enemy
}

export type Enemy = ReturnType<typeof useEnemy>
