import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from './Header';

class AppContainer extends React.Component {
	render() {
		const { self, message } = this.props;
		return (
			<div className='body'>
				<Header self={self} message={message} />
				<div className='container'>
					{this.props.children}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	self: state.app.self,
	message: state.app.message,
});

export default connect(mapStateToProps)(AppContainer);
