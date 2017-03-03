import React from 'react';
import { IndexRoute, Route } from 'react-router';

import LandingPage from './components/pages/LandingPage';

import App from './components/AppContainer';
import ItemsContainer from './components/ItemsContainer';
import ItemContainer from './components/ItemContainer';
import LoginContainer from './components/LoginContainer';
import LogoutContainer from './components/LogoutContainer';
import Sessions from './components/Sessions';
import Signup from './components/Signup';

const routes = (
	<Route path='/' component={App}>
		<IndexRoute component={LandingPage} />
		<Route path='items' component={ItemsContainer} />
		<Route path='item/new' component={ItemContainer} />
		<Route path='item/view/:itemId' component={ItemContainer} />
		<Route path='login' component={LoginContainer} />
		<Route path='logout' component={LogoutContainer} />
		<Route path='signup' component={Signup} />
		<Route path='sessions' component={Sessions} />
	</Route>
);

export default routes;
