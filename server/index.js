const path = require('path');
const webpackIsomorphicToolsConfig = require('../webpack/webpack-isomorphic-tools');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

const rootDir = path.resolve(__dirname, '..');

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
  .development(process.env.NODE_ENV === 'development')
  .server(rootDir, () => {
    require('./app');
  });
