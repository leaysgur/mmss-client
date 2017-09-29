const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const isProd = nodeEnv === 'production';

console.log(`env: ${nodeEnv} -> isProd: ${isProd}`);

const plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
];

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  );
  plugins.push(
    new MinifyPlugin()
    // new webpack.optimize.UglifyJsPlugin({
    //   souceMap: false,
    //   compress: {
    //     warnings: false,
    //     screw_ie8: true,
    //     conditionals: true,
    //     unused: true,
    //     comparisons: true,
    //     sequences: true,
    //     dead_code: true,
    //     evaluate: true,
    //     if_return: true,
    //     join_vars: true,
    //   },
    //   output: {
    //     comments: false,
    //   },
    // })
  );
}

module.exports = {
  entry: {
    main: './src/script/main.js',
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
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
  plugins,
};
