var path = require('path');
var fs = require('fs');

var config = {
	entry: path.resolve(__dirname, 'server', 'index.js'),
	output: {
		filename: 'server.bundle.js'
	},
	target: 'node',
	node: {
		__filename: true,
		__dirname: true,
	},
	externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
		'react-dom/server', 'react/addons',
	]).reduce(function(ext, mod) {
		ext[mod] = 'commonjs ' + mod;
		return ext;
	}, {}),
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	}
};

module.exports = config;
