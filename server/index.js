import morgan from 'morgan';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';

import webpack from 'webpack';
import middleware from './middleware';
import { broadcastEmailsCronJob } from './cron';

//import passport from 'passport';
import configRoutes from './routes';
import configDB from './config/db';
//import configPassport from '../config/passport';

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const PORT = isProduction ? process.env.PORT : 3000;

// Config DB
configDB();

// Setup logger
app.use(morgan('dev'));

// Setup passport
app.use(session({
	secret: 'battlewagon',
	resave: true,
	saveUninitialized: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Setup Api routes
configRoutes(app);

// app.use('/', express.static(path.resolve(__dirname, '..', 'build')));

if (process.env.NODE_ENV === 'development') {
	const config = require('../config/webpack.config.dev');
	const compiler = webpack(config);
	app.use(require('webpack-dev-middleware')(compiler, {
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
	}));
	app.use(require('webpack-hot-middleware')(compiler));
	console.log(config.output.publicPath);
	app.use('/', express.static(path.resolve(__dirname, '..', 'public')));

} else if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.resolve(__dirname, '..', 'build')));
}

app.get('*', middleware);

// app.use(passport.initialize());
// app.use(passport.session());

app.listen(PORT, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.log(`Server listening on port ${PORT}...`);
		broadcastEmailsCronJob.start();
	}
});
