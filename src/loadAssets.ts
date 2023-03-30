import assets from './assets.json'
import { PhaserAssets } from 'phaser-assets-loader'
const phaserAssets = assets as unknown as PhaserAssets
export default (scene: Phaser.Scene) => {
  Object.entries(phaserAssets).forEach(([method, list]) => {
    switch (method) {
      case 'image': return list.forEach(([name, path]) => scene.load.image(name, path))
      case 'spritesheet': return list.forEach(([name, path, option]) => scene.load.spritesheet(name, path as string, option))
    }
  })
}
