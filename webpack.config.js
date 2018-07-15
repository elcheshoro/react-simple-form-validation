const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'react-simple-form-validation',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
};
