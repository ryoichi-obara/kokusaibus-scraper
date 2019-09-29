const slsw = require('serverless-webpack');
// const glob = require('glob');
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
  // Serverlessのpackage.individuallyを使用する場合にはentryをserverless-webpackに任せる必要がある(slsw.lib.entries)
  // 基本的に問題は起こらないと思うが、entryが足りない！みたいなケースには下記の様なコードで対応しろとのこと(_はlodashなので適宜導入下さい)
  // entry: glob.sync('./src/**/*.js'),
  entry: slsw.lib.entries,
  // output: {
  //   path: `${__dirname}/dist`,
  //   filename: 'index.js',
  // },
};
