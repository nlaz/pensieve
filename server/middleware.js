import React from 'react';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { createStore, applyMiddleware } from 'redux';

import routes from '../client/routes';
import appReducer from '../client/app/appReducer';

const BUNDLE_URL = `${process.env.HOST_URL}/bundle.js`;

const renderFullPage = (appHtml, preloadedState) =>
  `
	<!doctype html public='storage'>
	<html>
	<head>
		<meta charset='utf-8'>
		<meta content='width=device-width, initial-scale=1' name='viewport'/>
    <meta name="google-site-verification" content="Rfy9OvqmaP8cjCqP3BseC2B-r9ByVwgjexH8XpkUlG4" />
		<title>Pensieve</title>
		<link rel='stylesheet' type='text/css' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'/>
	</head>
	<body>
		<div id='root'>${appHtml}</div>
		<script>window.INITIAL_STATE=${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
		<script src='${BUNDLE_URL}' type='text/javascript'></script>
	</body>
	</html>
	`;

export default (req, res) => {
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
  });
};
