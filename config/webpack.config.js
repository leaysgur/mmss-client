const webpack = require('webpack');
const path = require('path');

const rootPath = path.resolve('');
const nodeEnv = process.env.NODE_ENV;
const isProd = nodeEnv === 'production';

console.log(`[Settings]
  env: ${nodeEnv} -> isProd: ${isProd}
  root: ${rootPath}
`);

module.exports = {
  context: rootPath,
  entry: {
    main: './src/tscript/main.ts',
  },
  output: {
    filename: '[name].js',
    path: `${rootPath}/dist`,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: ['awesome-typescript-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
  ],
};
