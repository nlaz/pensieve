var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
	entry: APP_DIR + '/app-client.js',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: APP_DIR,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	}
};

module.exports = config;
