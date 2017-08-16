import React from 'react';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import cookie from 'react-cookie';
import reduxThunk from 'redux-thunk';

import getRoutes from './routes';
import { Router } from 'react-router';
import appReducer from './reducers/appReducer';
import { AUTH_USER } from './actions/types';
import './assets/main.scss';
import { createStore } from './redux/createStore';

const dest = global.document.getElementById('root');
const store = createStore(browserHistory, global.__data);
const history = syncHistoryWithStore(browserHistory, store);

const component = (
  <Router history={history}>
    {getRoutes(store)}
  </Router>
);

const token = cookie.load('token');

if (token) {
	store.dispatch({
		type: AUTH_USER,
		payload: { user: cookie.load('user') }
	});
}

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  global.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}


if(process.env.NODE_ENV == 'development' && module.hot) {
	module.hot.accept('./reducers/appReducer', () => {
		store.replaceReducer(require('./reducers/appReducer').default);
	});
}

if (__DEVTOOLS__ && !global.devToolsExtension) {
  const DevTools = require('./redux/DevTools'); // eslint-disable-line

  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
