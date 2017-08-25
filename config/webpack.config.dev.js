var webpack = require('webpack');
var paths = require('./paths');

var publicPath = '/';
var config = {
	entry: ['babel-polyfill', 'webpack-hot-middleware/client', paths.appIndexJs],
	devtool: 'eval',
	output: {
		path: paths.appPublic,
		filename: 'bundle.js',
		publicPath: publicPath
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
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
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
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
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
		fs: 'empty'
	}
};

module.exports = config;
