import React from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

const ReqAuth = ComposedComponent => {
	class Authentication extends React.Component {
		componentWillMount() {
			if (!this.props.authenticated) {
				this.props.router.push('/');
			}
		}

		componentWillUpdate(nextProps, nextState) {
			if (!nextProps.authenticated) {
				nextProps.router.push('/');
			}
		}

		render() {
			return <ComposedComponent {...this.props} />;
		}
	}

	const mapStateToProps = (state, ownProps) => ({
		authenticated: state.app.authenticated
	});

	return connect(mapStateToProps)(Authentication);
};

export default ReqAuth;
