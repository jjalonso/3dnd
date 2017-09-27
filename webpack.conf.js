const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {

  entry: './app.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /(node_modules)/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['env']
  //         }
  //       }
  //     }
  //   ]
  // },
  plugins: [
    new HtmlWebpackPlugin({
      title: '3D Augmented Reality for Dungeons & Dragons',

    }),
    new CopyWebpackPlugin([{ from: 'assets/**/*' }]),
    new webpack.ProvidePlugin({THREE: 'three'})
  ],
  resolve: {
    alias: {
      // 'three-orbit-controls': './node_modules/three/examples/js/controls/OrbitControls.js',  // Failing when importing it from specific files
      'three-mtl-loader': './node_modules/three/examples/js/loaders/MTLLoader.js',
      'three-obj-loader': './node_modules/three/examples/js/loaders/OBJLoader.js'
    }
  }

}


// './node_modules/three/examples/js/controls/OrbitControls.js'