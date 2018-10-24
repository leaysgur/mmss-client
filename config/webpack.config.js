const path = require('path');

const rootPath = path.resolve('');

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
  resolve: {
    extensions: ['.js', '.jsx'],
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
  plugins: [],
};
