'use strict';

process.env.NODE_ENV = 'development';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var detect = require('detect-port');
var chalk = require('chalk');
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
var openBrowser = require('react-dev-utils/openBrowser');
var config = require('../config/webpack.client.config');
var paths = require('../config/paths');

var DEFAULT_PORT = 8080;
var compiler;

function setupCompiler(host, port, protocol) {
  compiler = webpack(config);

  // "invalid" event fires when you have changed a file, and Webpack is
  // recompiling a bundle. WebpackDevServer takes care to pause serving the
  // bundle, so if you refresh, it'll wait instead of serving the old one.
  // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
  compiler.plugin('invalid', function() {
    console.log('Compiling...');
  });

  var isFirstCompile = true;

  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.plugin('done', function(stats) {

    // We have switched off the default Webpack output in WebpackDevServer
    // options so we are going to "massage" the warnings and errors and present
    // them in a readable focused way.
    var messages = formatWebpackMessages(stats.toJson({}, true));
    var isSuccessful = !messages.errors.length && !messages.warnings.length;
    var showInstructions = isSuccessful && isFirstCompile;

    if (isSuccessful) {
      console.log(chalk.green('Compiled successfully!'));
    }

    if (showInstructions) {
      console.log();
      console.log('The app is running at:');
      console.log();
      console.log('  ' + chalk.cyan(protocol + '://' + host + ':' + port + '/'));
      console.log();
      console.log('Note that the development build is not optimized.');
      console.log('To create a production build, use ' + chalk.cyan('yarn run build') + '.');
      console.log();
      isFirstCompile = false;
    }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      messages.errors.forEach(message => {
        console.log(message);
        console.log();
      });
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      console.log();
      messages.warnings.forEach(message => {
        console.log(message);
        console.log();
      });
      // Teach some ESLint tricks.
      console.log('You may use special comments to disable some warnings.');
      console.log('Use ' + chalk.yellow('// eslint-disable-next-line') + ' to ignore the next line.');
      console.log('Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.');
    }
  });
}

function runDevServer() {
  var host = process.env.HOST || 'localhost';
  var port = DEFAULT_PORT;
  var protocol = process.env.HTTPS === 'true' ? "https" : "http";
  setupCompiler(host, port, protocol);

  var devServer = new WebpackDevServer(compiler, {
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    hot: true,
    publicPath: '/build/',
    quiet: true,
    watchOptions: {
      ignored: /node_modules/
    },
    https: protocol === "https",
    host: host
  });

  devServer.listen(port, err => {
    if (err) {
      return console.log(err);
    }

    console.log(chalk.cyan('Starting the development server...'));
    console.log();

    openBrowser(protocol + '://' + host + ':' + port + '/');
  });
}

runDevServer();
