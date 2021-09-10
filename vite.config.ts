import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'
import packageJson from './package.json'

export default defineConfig({
  plugins: [
    vue(),
    replace({
      'APP_VERSION': JSON.stringify(packageJson.version),
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    })
  ]
})
