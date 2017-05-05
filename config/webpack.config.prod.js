'use strict';

var autoprefixer = require('autoprefixer');
var paths = require('./paths');

var publicPath = '/';
var config = {
	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http:localhost:8080',
		paths.appIndexJs
	],
	devtool: 'eval',
	output: {
		path: paths.appBuild,
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
        test: /\.css$/,
        loader: 'style!css?importLoaders=1!postcss'
			}
		]
	},
	plugins: [
		new Webpack.HotModuleReplacePlugin()
	],
	node: {
		fs: 'empty',
	}
};

module.exports = config;
