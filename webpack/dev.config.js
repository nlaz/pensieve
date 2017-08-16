'use strict';
var webpack = require('webpack');
var paths = require('../config/paths');

const { webpackHost, webpackPort } = require('../config/env');

var WebpackIsomorphicToolsConfig = require('./webpack-isomorphic-tools');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(WebpackIsomorphicToolsConfig);

var publicPath = '/';
module.exports = {
	entry: [
		`webpack-hot-middleware/client?path=http://${webpackHost}:${webpackPort}/__webpack_hmr`,
		paths.appIndexJs
	],
	devtool: 'eval',
	output: {
		path: paths.appPublic,
		filename: 'bundle.js',
		publicPath: publicPath,
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				include: paths.appClient,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					cacheDirectory: true
				}
			},
			{
        test: /\.(css|scss)$/,
				include: paths.appClient,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							config: {
								path: paths.postCssConfig
							}
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
			  test: /\.(png|jpg|jpeg|gif|svg)$/,
				loader: 'url-loader?limit=10240',
			}
		]
	},
  resolve: {
    modules: [
      'node_modules',
      'client',
    ],
    extensions: ['.json', '.js', '.jsx'],
  },
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
      __CLIENT__: true,
      __DEVTOOLS__: true,
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				BUILD: true
			}
		}),
    webpackIsomorphicToolsPlugin.development(),
	],
	node: {
		fs: 'empty',
	}
};
