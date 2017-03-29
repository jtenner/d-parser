var path = require('path'),
    pkg = require('./package.json'),
    webpack = require('webpack'),
    Babili = require('babili-webpack-plugin'),
    LibrarySourcePlugin = require('library-src-plugin');

let buildConfig = (useBabel, minify, name) => ({
  context: __dirname,
  entry: {
    [name]: './index.js'
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    library: 'dparser',
    libraryTarget: 'umd'
  },
  module: {
    rules: (useBabel ? [
      {
        test: /\.js$/i,
        use: ['babel-loader']
      }
    ] : []).concat(
      [
        {
          test: /\.pegjs$/i,
          use: ['pegjs-loader']
        }
      ]
    )
  },
  plugins: [
    minify ? new Babili() : null
  ].filter(Boolean),
  performance: false
});
module.exports = [
  buildConfig(false, false, pkg.name),
  buildConfig(true, false, `${pkg.name}.compat`),
  buildConfig(false, true, `${pkg.name}.min`),
  buildConfig(true, true, `${pkg.name}.compat.min`)
];