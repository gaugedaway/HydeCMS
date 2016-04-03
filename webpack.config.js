var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './src/app/index.jsx'],
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-async-to-generator', 'transform-regenerator']
        }
      }
    ]
  },
};