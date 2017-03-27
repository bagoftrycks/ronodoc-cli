const webpack = require('webpack');
const webpack_plugins = require('webpack-load-plugins')();
const path = require('path');
const opn = require('opn');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

const _webpack_devserver = require('./webpack.config.json');
const host = _webpack_devserver.host;
const port = _webpack_devserver.port;
const webpack_devserver_name = _webpack_devserver.name;
const context_app = path.join(__dirname, 'src');
const context_build = path.join(__dirname, 'dist');

module.exports = {
  __host: host,
  __port: port,
  env: 'development',
  entry: [
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/dev-server',
    `./main.js`,
  ],
  context: context_app,
  output: {
    path: context_build,
    filename: '[name].[hash].js',
  },
  target: 'web',
  resolve: {
    extensions: [
      '',
      'index.js',
      '.js',
      '.jsx',
      '.scss',
      '.md',
    ],
    alias: {
      [webpack_devserver_name]: path.resolve(__dirname, '../src'),
    },
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1!sass-loader',
      include: /node_modules\/react-flexbox-grid/,
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1!less',
    }, {
      test: /\.svg$/,
      loader: 'babel!svg-react',
    }, {
      test: /\.jpe?g$|\.gif$|\.png$/i,
      exclude: /node_modules/,
      loader: 'url-loader?limit=10000',
    }, {
      test: /\.html$/,
      exclude: /node_modules/,
      loader: 'html-loader',
    }, {
      test: /\.(eot|woff|woff2|ttf|svg)/,
      loader: 'url-loader?limit=30000',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.md$/,
      loader: 'raw-loader',
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack_plugins.html({
      template: 'index.html',
      inject: true,
    }),
    new DashboardPlugin(dashboard.setData, () => {
      opn(`http://${host}:${port}`);
    }),
  ],
};
