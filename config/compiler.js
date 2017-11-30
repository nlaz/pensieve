var chalk = require('chalk');
var webpack = require('webpack');
var formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
var config = require('./webpack.config.dev');
var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 3000;
var protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

var compiler = webpack(config);

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

  if (showInstructions) {
    console.log(chalk.cyan('✨  Application compiled successfully'));
    console.log(chalk.green('🚀  All systems go!'));
    console.log();
    console.log('The app is running at:');
    console.log('  ' + chalk.cyan(protocol + '://' + host + ':' + port + '/'));
    console.log();
    isFirstCompile = false;
  }

  if (!showInstructions) {
    console.log();
    console.log(chalk.cyan('✨  Application recompiled successfully'));
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
    console.log(
      'Use ' + chalk.yellow('/* eslint-disable */') + ' to ignore all warnings in a file.'
    );
  }
});

module.exports = compiler;
