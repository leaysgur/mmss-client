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
    extensions: ['.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [],
};
