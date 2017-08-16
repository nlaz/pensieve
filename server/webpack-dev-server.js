import express from 'express';
import webpack from 'webpack';

const { host, port, webpackPort } = require('../config/env');

const webpackConfig = require('../webpack/dev.config');

const compiler = webpack(webpackConfig);

const serverOptions = {
  contentBase: `http://${host}:${port}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

const app = express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(webpackPort, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Webpack development server listening on port ${webpackPort}`);
  }
});
