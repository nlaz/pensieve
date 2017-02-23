import React from 'react';
import { Router, Route } from 'react-router';

import AppContainer from './components/AppContainer';
import HomeContainer from './components/HomeContainer';
import LoginContainer from './components/LoginContainer';
import LogoutContainer from './components/LogoutContainer';
import Landing from './components/Landing';
import Sessions from './components/Sessions';
import Signup from './components/Signup';

const Routes = (props) => (
	<Router {...props}>
		<Route component={AppContainer}>
			<Route path='/' component={Landing} />
			<Route path='/home' component={HomeContainer} />
			<Route path='/login' component={LoginContainer} />
			<Route path='/logout' component={LogoutContainer} />
			<Route path='/signup' component={Signup} />
			<Route path='/sessions' component={Sessions} />
		</Route>
	</Router>
);

export default Routes;
