const path = require('path');

const rootPath = path.resolve('');

module.exports = {
  mode: 'development',
  devtool: false,
  context: rootPath,
  entry: {
    main: './src/main.ts',
  },
  output: {
    filename: '[name].js',
    path: `${rootPath}/dist`,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // TODO: 最後は tsx? のみに
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/, // TODO: おなじく
        exclude: [/node_modules/],
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [],
};
