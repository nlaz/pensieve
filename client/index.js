import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import cookie from 'react-cookie';
import reduxThunk from 'redux-thunk';

import routes from './routes';
import { Router } from 'react-router';
import appReducer from './reducers/appReducer';
import { AUTH_USER } from './actions/types';
import * as sessionActions from './actions/sessionActions';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const preloadedState = window.INITIAL_STATE;
delete window.INITIAL_STATE;

const store = createStoreWithMiddleware(
	appReducer,
	preloadedState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const token = cookie.load('token');

if (token) {
	store.dispatch({
		type: AUTH_USER,
		payload: { user: cookie.load('user') }
	});
}

ReactDOM.render(
	<Provider store={store}>
		<Router routes={routes} history={browserHistory} />
	</Provider>,
	document.getElementById('root')
);
