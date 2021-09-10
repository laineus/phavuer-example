import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'
import phaserAssetsLoader from 'phaser-assets-loader'
import packageJson from './package.json'

const vitePhaserAssetsLoader = config => {
  return {
    name: 'phaser-assets-loader',
    config (_, { mode }) {
      const { exportJson, watch } = phaserAssetsLoader(config)
      exportJson()
      if (mode === 'development') {
        watch()
      }
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    vitePhaserAssetsLoader({
      patterns: [
        { type: 'image', prefix: '', dir: '/img', rule: /^\w+\.png$/ }
      ],
      output: 'src/assets.json'
    }),
    replace({
      'APP_VERSION': JSON.stringify(packageJson.version),
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    })
  ]
})
