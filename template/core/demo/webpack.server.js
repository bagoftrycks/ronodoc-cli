const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const _config = require('./webpack.config.dev.js');
const _compiler = webpack(_config);

const _server = new WebpackDevServer(_compiler, {
  quiet: true,
  hot: true,
  inline: false,
  historyApiFallback: true,
  stats: {
    colors: true,
  },
});

_server.listen(_config.__port, _config.__host);
