import React from 'react';
import { IndexRoute, Route } from 'react-router';

import LandingPage from './components/pages/LandingPage';

import App from './components/AppContainer';
import ReqAuth from './components/ReqAuth';
import ItemsContainer from './components/ItemsContainer';
import ItemContainer from './components/ItemContainer';
import NewItemContainer from './components/NewItemContainer';
import Sessions from './components/Sessions';

import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';

const NotFoundPage = (props) => (
	<h1>Page Not Found :(</h1>
);

const routes = (
	<Route path='/' component={App}>
		<IndexRoute component={LandingPage} />
		<Route path='items' component={ItemsContainer} />
		<Route path='item/new' component={NewItemContainer} />
		<Route path='item/view/:itemId' component={ItemContainer} />
		<Route path='sessions' component={Sessions} />
		<Route path='login' component={ReqAuth(Login)} />
		<Route path='signup' component={ReqAuth(Signup)} />
		<Route path='logout' component={Logout} />

		<Route path='*' component={NotFoundPage} />
	</Route>
);

export default routes;
