'use strict';
let path = require('path');
let defaultSettings = require('./defaults');
let webpack = require('webpack');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../dist/'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: defaultSettings.publicPath + 'assets/'
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      masonry: 'masonry-layout',
      isotope: 'isotope-layout',

      libs: `${defaultSettings.srcPath}/libs/`,
      actions: `${defaultSettings.srcPath}/actions/`,
      reducers: `${defaultSettings.srcPath}/reducers/`,
      components: `${defaultSettings.srcPath}/components/`,
      models: `${defaultSettings.srcPath}/models/`,
      assets: `${defaultSettings.srcPath}/assets/`,
      stores: `${defaultSettings.srcPath}/stores/`,
      utils:  `${defaultSettings.srcPath}/utils/`,
      routes: `${defaultSettings.srcPath}/routes/`,
      styles: `${defaultSettings.srcPath}/styles/`,
      config: `${defaultSettings.srcPath}/config/` + process.env.ENV
    }
  },
  target: 'web',
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    console: true
  },
  module: {}
};
