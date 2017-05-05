import React from 'react';
import { connect } from 'react-redux';
import * as sessionActions from '../actions/sessionActions';

class Logout extends React.Component {
	componentWillMount() {
		this.props.logoutUser();
	}

	render() {
		return false;
	}
}

export default connect(null, sessionActions)(Logout);
