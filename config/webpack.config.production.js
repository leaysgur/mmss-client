const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const base = require('./webpack.config');

base.plugins.push(
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  })
);
base.plugins.push(
  new MinifyPlugin()
);

module.exports = base;
