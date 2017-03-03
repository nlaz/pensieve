import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from './Header';

class AppContainer extends React.Component {
	render() {
		return (
			<div className='body'>
				<Header self={this.props.self} />
				<div className='container'>
					{this.props.children}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { self: state.app.self };
}

export default connect(mapStateToProps)(AppContainer);
