import React from 'react';
import { IndexRoute, Route } from 'react-router';

import LandingPage from './components/pages/LandingPage';

import App from './components/AppContainer';
import ReqAuth from './components/ReqAuth';
import Items from './components/ItemsContainer';
import Item from './components/ItemContainer';
import NewItem from './components/NewItemContainer';
import Sessions from './components/Sessions';
import Session from './components/Session';

import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';

const NotFoundPage = (props) => (
	<h1>Page Not Found :(</h1>
);

const routes = (
	<Route path='/' component={App}>
		<IndexRoute component={LandingPage} />
		<Route path='items' component={ReqAuth(Items)} />
		<Route path='items/new' component={ReqAuth(NewItem)} />
		<Route path='items/:itemId' component={ReqAuth(Item)} />
		<Route path='sessions' component={ReqAuth(Sessions)} />
		<Route path='sessions/:sessionId' component={ReqAuth(Session)} />
		<Route path='login' component={Login} />
		<Route path='signup' component={Signup} />
		<Route path='logout' component={Logout} />

		<Route path='*' component={NotFoundPage} />
	</Route>
);

export default routes;
