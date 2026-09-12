import * as Phaser from 'phaser'
import { proxyRefs, ref } from 'vue'
import config from '../config'
import { Entity, useEntity } from './useEntity'

export const usePlayer = ({ x, y }: { x: number, y: number }) => {
  const entity = useEntity()
  const tgtX = ref(x)
  const tgtY = ref(y)
  const r = ref(0)
  const velocityX = ref(0)
  const velocityY = ref(0)
  const hp = ref(config.GAME.PLAYER_HP)
  const damageDelay = ref(0)
  const shotDelay = ref(config.GAME.FIRES_INTERVAL)

  entity.x = x
  entity.y = y

  const setTargetPosition = (x: number, y: number) => {
    tgtX.value = x
    tgtY.value = y
  }

  const hit = (enemy: Entity) => {
    if (damageDelay.value > 0 || hp.value <= 0) return
    damageDelay.value = 20
    hp.value -= 20
    const vector = new Phaser.Math.Vector2(player.y - enemy.y, player.x - enemy.x).normalize().scale(20)
    player.x += vector.x
    player.y += vector.y
    setTargetPosition(player.x, player.y)
    player.emit('hit', enemy)
    if (hp.value <= 0) player.emit('dead', enemy)
  }

  const update = () => {
    if (damageDelay.value > 0) damageDelay.value--
    if (shotDelay.value > 0) shotDelay.value--
    const vector = new Phaser.Math.Vector2(tgtX.value - player.x, tgtY.value - player.y)
    r.value = Phaser.Math.Angle.Reverse(vector.angle())
    if (shotDelay.value <= 0) {
      shotDelay.value = config.GAME.FIRES_INTERVAL
      player.emit('shot', { x: player.x, y: player.y, r: r.value })
    }
    if (vector.length() < 10) {
      velocityX.value = 0
      velocityY.value = 0
      return
    }
    vector.normalize().scale(200)
    velocityX.value = vector.x
    velocityY.value = vector.y
  }

  const player = proxyRefs({
    ...entity,
    tgtX,
    tgtY,
    r,
    velocityX,
    velocityY,
    hp,
    damageDelay,
    shotDelay,
    setTargetPosition,
    hit,
    update
  })

  return player
}

export type Player = ReturnType<typeof usePlayer>
