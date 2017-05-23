import React from 'react';
import { IndexRoute, Route } from 'react-router';

import LandingPage from './components/pages/LandingPage';

import HomeContainer from './components/HomeContainer';
import ReqAuth from './components/ReqAuth';
import Items from './components/ItemsContainer';
import Item from './components/ItemContainer';
import NewItem from './components/NewItemContainer';
import EditItem from './components/EditItemContainer';
import Sessions from './components/Sessions';
import Session from './components/Session';
import SwitchContainer from './components/SwitchContainer';

import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';

const NotFoundPage = () => (
	<h1>Page Not Found :(</h1>
);

const routes = (
	<Route path='/' component={HomeContainer}>
		<IndexRoute component={SwitchContainer} />
		<Route path='items' component={ReqAuth(Items)} />
		<Route path='items/new' component={ReqAuth(NewItem)} />
		<Route path='items/:itemId' component={ReqAuth(Item)} />
		<Route path='items/:itemId/edit' component={ReqAuth(EditItem)} />
		<Route path='activity' component={ReqAuth(Sessions)} />
		<Route path='sessions/:sessionId' component={ReqAuth(Session)} />
		<Route path='login' component={Login} />
		<Route path='signup' component={Signup} />
		<Route path='logout' component={Logout} />

		<Route path='*' component={NotFoundPage} />
	</Route>
);

export default routes;
