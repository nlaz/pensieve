import React from 'react';
import { connect } from 'react-redux';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';

class SwitchContainer extends React.Component {
	render() {
		return this.props.authenticated ? <HomePage /> : <LandingPage />;
	}
}

const mapStateToProps = state => ({
	authenticated: state.app.authenticated
});

export default connect(mapStateToProps)(SwitchContainer);
