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
      'three-stereo-effect': './node_modules/three/examples/js/effects/StereoEffect.js'
    }
  }

}


// './node_modules/three/examples/js/controls/OrbitControls.js'