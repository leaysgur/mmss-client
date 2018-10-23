const path = require('path');
const webpack = require('webpack');

const rootPath = path.resolve('');
const nodeEnv = process.env.NODE_ENV;
const isProd = nodeEnv === 'production';

console.log(`[Settings]
  env: ${nodeEnv} -> isProd: ${isProd}
  root: ${rootPath}
`);

module.exports = {
  mode: 'development',
  context: rootPath,
  entry: {
    main: './src/main.js',
  },
  output: {
    filename: '[name].js',
    path: `${rootPath}/dist`,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
  ],
};
