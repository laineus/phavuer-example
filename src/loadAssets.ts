import assets from './assets.json'
import { PhaserAssets } from 'phaser-assets-loader'
const phaserAssets = assets as PhaserAssets
export default (scene: Phaser.Scene) => {
  phaserAssets.image?.forEach(v => scene.load.image(...v))
  phaserAssets.audio?.forEach(v => scene.load.image(...v))
  phaserAssets.spritesheet?.forEach(v => scene.load.spritesheet(...v))
}
