const webpack = require('webpack');
const webpack_plugins = require('webpack-load-plugins')();
const path = require('path');

const _webpack_devserver = require('./webpack.config.json');
const webpack_devserver_name = _webpack_devserver.name;

const context_app = path.join(__dirname, 'src');
const context_build = path.join(__dirname, 'dist');

module.exports = {
  env: 'production',
  entry: [
    `./main.js`,
  ],
  context: context_app,
  output: {
    path: context_build,
    filename: '[name].[hash].js',
    chunkFilename: `[name].[hash].js`,
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
  devtool: 'cheap-module-source-map',
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack_plugins.clean([`dist`], {
      root: __dirname,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: `[name].[hash].js`,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack_plugins.html({
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
  ],
};
