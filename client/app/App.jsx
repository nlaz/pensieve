import React from 'react';
import ReactGA from 'react-ga';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import cookie from 'react-cookie';
import reduxThunk from 'redux-thunk';

import routes from '../routes';
import { Router } from 'react-router';
import appReducer from './appReducer';
import { AUTH_USER } from './auth/authActions';

import '../assets/sass/main.scss';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
ReactGA.initialize('UA-101760335-1');

const preloadedState = window.INITIAL_STATE;
delete window.INITIAL_STATE;

const store = createStoreWithMiddleware(
  appReducer,
  preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
};

const token = cookie.load('token');

if (token) {
  store.dispatch({
    type: AUTH_USER,
    payload: { user: cookie.load('user') }
  });
}

if (process.env.NODE_ENV == 'development' && module.hot) {
  module.hot.accept('./appReducer', () => {
    store.replaceReducer(require('./appReducer').default);
  });
}

export default function App() {
  return (
    <Provider store={store}>
      <Router routes={routes} history={browserHistory} onUpdate={logPageView} />
    </Provider>
  );
}
