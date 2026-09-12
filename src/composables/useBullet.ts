import * as Phaser from 'phaser'
import { proxyRefs, ref } from 'vue'
import Repository from '../components/Repository'
import { overScreen } from '../components/substanceUtils'
import { useEntity } from './useEntity'
import type { Enemy } from './useEnemy'

export const useBullet = ({ x, y, r, enemies }: { x: number, y: number, r: number, enemies: Repository<Enemy> }) => {
  const entity = useEntity()
  const rotation = ref(r)
  const velocityX = ref(Math.cos(r) * 300)
  const velocityY = ref(Math.sin(r) * 300)

  entity.x = x + Math.cos(r) * 20
  entity.y = y + Math.sin(r) * 20

  const update = () => {
    if (overScreen(bullet, 20)) bullet.emit('destroy')
    enemies.list.some(enemy => {
      if (enemy.alive && Phaser.Math.Distance.Between(bullet.x, bullet.y, enemy.x, enemy.y) < 35) {
        bullet.emit('destroy')
        enemy.hit()
        return true
      }
      return false
    })
  }

  const bullet = proxyRefs({
    ...entity,
    r: rotation,
    velocityX,
    velocityY,
    enemies,
    update
  })

  return bullet
}

export type Bullet = ReturnType<typeof useBullet>
