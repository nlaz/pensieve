import chalk from 'chalk';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import path from 'path';

import middleware from './middleware';
import { broadcastEmailsCronJob } from './cron';

import configRoutes from './routes';
import configDB from '../config/db';

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const PORT = isProduction ? process.env.PORT : 3000;

// Configure DB
configDB();

// Setup logger
app.use(morgan('dev'));

app.use(
  cookieSession({
    name: 'session',
    secret: process.env.COOKIE_SESSION,
    maxAge: 48 * 60 * 60 * 1000 // 48 hours
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Setup Api routes
configRoutes(app);

if (process.env.NODE_ENV === 'development') {
  const config = require('../config/webpack.config.dev');
  const compiler = require('../config/compiler');
  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    })
  );
  app.use(require('webpack-hot-middleware')(compiler));
  app.use('/', express.static(path.resolve(__dirname, '..', 'public')));
} else if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.resolve(__dirname, '..', 'build')));
}

app.get('*', middleware);

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.log(chalk.cyan('✨  Starting the server...'));
    }

    broadcastEmailsCronJob.start();
  }
});
