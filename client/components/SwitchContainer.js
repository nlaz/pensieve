import React from 'react';
import { connect } from 'react-redux';

import LandingPage from './pages/LandingPage';
import Sessions from './sessions/SessionsContainer';

class SwitchContainer extends React.Component {
	render() {
		return this.props.authenticated
		? <Sessions />
		: <LandingPage />;
	}
}

const mapStateToProps = (state) => ({
	authenticated: state.app.authenticated,
});

export default connect(mapStateToProps)(SwitchContainer);
