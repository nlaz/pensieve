'use strict';

var nodeExternals = require('webpack-node-externals');
var paths = require('./paths');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin =
  new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'))
	.development();

var publicPath = '/';
var config = {
	target: 'node',
	entry: [
		paths.serverIndexJs
	],
	output: {
		path: paths.serverBuild,
		filename: 'bundle.server.js',
		publicPath: publicPath,
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					cacheDirectory: true
				}
			},
			{
			  test: /\.(png|jpg|jpeg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
					},
					{
						loader: 'image-webpack-loader'
					}
				],
			}
		]
	},
	plugins: [
		webpackIsomorphicToolsPlugin,
	],
	externals: [
		nodeExternals({
			modulesDir: 'node_modules',
			whitelist: ['react-dom/server', 'react/addons'],
		}),
	],
	node: {
		__filename: true,
		__dirname: true,
	},
};

module.exports = config;
