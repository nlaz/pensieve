import React from 'react';
import { connect } from 'react-redux';
import LandingPage from './pages/LandingPage';

const Dashboard = () => (
	<h1>DashBoard</h1>
);

class SwitchContainer extends React.Component {
	render() {
		return this.props.authenticated ? <Dashboard /> : <LandingPage />;
	}
}

const mapStateToProps = (state) => ({
	authenticated: state.app.authenticated,
});

export default connect(mapStateToProps)(SwitchContainer);
