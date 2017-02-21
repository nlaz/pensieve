import React from 'react';
import { Router, Route } from 'react-router';

import PageWrap from './components/PageWrap';
import Home from './components/Home';
import Login from './components/Login';
import Landing from './components/Landing';
import Sessions from './components/Sessions';
import Signup from './components/Signup';

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
