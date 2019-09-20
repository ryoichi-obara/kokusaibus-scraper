const glob = require('glob');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  optimization: {
    // We do not want to minimize our code.
    minimize: false,
  },
  target: 'async-node',
  devtool: 'source-map',
  externals: [nodeExternals()],
  entry: glob.sync('./src/**/*.js'),
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
  },
};
