const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'react-simple-form-validation',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-simple-form-validation.js',
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'prop-types': {
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
      amd: 'prop-types',
      umd: 'prop-types',
      root: 'PropTypes',
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
