var webpack = require("webpack");
var paths = require("./paths");

var isDev = process.env.NODE_ENV === "development";
var publicPath = "/";

var devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
];

var prodPlugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
    },
  }),
];

var config = {
  entry: isDev
    ? ["babel-polyfill", "webpack-hot-middleware/client", paths.appIndexJs]
    : [paths.appIndexJs],
  devtool: "eval",
  output: {
    path: paths.appBuild,
    filename: "bundle.js",
    publicPath: publicPath,
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: paths.appClient,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(css|scss)$/,
        include: paths.appClient,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: paths.postCssConfig,
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: isDev ? devPlugins : prodPlugins,
  resolve: {
    extensions: [".js", ".jsx"],
  },
  node: {
    fs: "empty",
  },
};

module.exports = config;
