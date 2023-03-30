import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'
import phaserAssetsRollupPlugin from 'phaser-assets-loader/plugins/rollupPlugin'
import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    phaserAssetsRollupPlugin({
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
  ],
})
