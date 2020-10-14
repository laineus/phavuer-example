'use strict'

const webpack = require('webpack')
const path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')
const PhaserAssetsWebpackPlugin = require('phaser-assets-webpack-plugin')
const packageJson = require('./package.json')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = (_env, argv) => ({
  entry: {
    app: './src/index.js',
    vendor: ['phaser', 'vue']
  },
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        include: path.resolve(__dirname, 'src/'),
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env']
          ]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },
  plugins: [
    new WriteFilePlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'APP_VERSION': JSON.stringify(packageJson.version),
      'ENV': JSON.stringify(argv.mode),
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    }),
    new PhaserAssetsWebpackPlugin([
      { type: 'image', prefix: '', dir: '/img', rule: /^\w+\.png$/ },
    ], { useAbsoluteUrl: false })
  ],
  resolve: {
    extensions: ['.js', '.vue']
  }
})
