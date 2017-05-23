'use strict';

var webpack = require('webpack');
var paths = require('./paths');

var publicPath = '/';
var config = {
	entry: [
		'webpack-hot-middleware/client',
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
								path: './config/postcss-loader.config.js'
							}
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				BUILD: true
			}
		})
	],
	node: {
		fs: 'empty',
	}
};

module.exports = config;
