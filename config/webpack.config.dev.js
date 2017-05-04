'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
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
		publicPath: '/',
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
        test: /\.css$/,
        loader: 'style!css?importLoaders=1!postcss'
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
