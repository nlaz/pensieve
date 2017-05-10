'use strict';

var path = require('path');
var fs = require('fs');

var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

var nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .filter(folder => !path.isAbsolute(folder))
  .map(resolveApp);

module.exports = {
  appBuild: resolveApp('build'),
  appAssets: resolveApp('public/assets'),
  appPublic: resolveApp('public'),
  appClient: resolveApp('client'),
  appIndexJs: resolveApp('client/index.js'),
  serverIndexJs: resolveApp('server/index.js'),
  serverBuild: resolveApp('build'),
  nodePaths: nodePaths,
};