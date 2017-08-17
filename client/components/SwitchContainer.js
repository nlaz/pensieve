import React from 'react';
import { connect } from 'react-redux';

import LandingPage from './LandingPage';
import HomeContainer from './home/HomeContainer';

class SwitchContainer extends React.Component {
	render() {
		return this.props.authenticated
		? <HomeContainer />
		: <LandingPage />;
	}
}

const mapStateToProps = (state) => ({
	authenticated: state.app.authenticated,
});

export default connect(mapStateToProps)(SwitchContainer);
