import morgan from 'morgan';
import React from 'react';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';

// Server-side rendering
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import appReducer from '../client/reducers/appReducer';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import routes from '../client/routes';

//import passport from 'passport';
import configRoutes from './routes';
import configDB from './config/db';
//import configPassport from '../config/passport';

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use('/assets', express.static(path.resolve(__dirname, '..', 'public', 'assets')));

const renderFullPage = (appHtml, preloadedState) => (
	`
	<!doctype html public='storage'>
	<html>
	<head>
		<meta charset='utf-8'>
		<title>Boreas</title>
		<link rel='stylesheet' type='text/css' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'/>
	</head>
	<body>
		<div id='root'>${appHtml}</div>
		<script>window.INITIAL_STATE=${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
		<script src='assets/bundle.js' type='text/javascript'></script>
	</body>
	</html>
	`
);

app.get('*', (req, res) => {
	match({ routes: routes, location: req.url }, (err, redirect, props) => {
		if (err) {
			res.status(500).send(err.message);
		} else if (redirect) {
			res.redirect(redirect.pathname + redirect.search);
		} else if (props) {
			const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
			const store = createStoreWithMiddleware(appReducer);
			const html = renderToString(
				<Provider store={store}>
					<RouterContext {...props} />
				</Provider>
			);

			const preloadedState = store.getState();

			res.send(renderFullPage(html, preloadedState));
		} else {
			res.status(404).send('Not Found');
		}
	})
});

// app.use(passport.initialize());
// app.use(passport.session());

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});
