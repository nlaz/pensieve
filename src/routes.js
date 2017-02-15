import React from 'react';
import { Router, Route } from 'react-router';

import PageWrap from './app/PageWrap';
import Home from './app/Home';
import Login from './app/Login';
import Landing from './app/Landing';
import Sessions from './app/Sessions';
import Signup from './app/Signup';

const Routes = (props) => (
	<Router {...props}>
		<Route component={PageWrap}>
			<Route path='/' component={Landing} />
			<Route path='/home' component={Home} />
			<Route path='/login' component={Login} />
			<Route path='/signup' component={Signup} />
			<Route path='/sessions' component={Sessions} />
		</Route>
	</Router>
);

export default Routes;
