import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class HomeContainer extends React.Component {
	render() {
		const { self } = this.props;
		if (!self) {
			return <h1>Home Page</h1>;
		}
		return <h1>Welcome, {self.name}!</h1>;
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		self: state.app.self,
	};
}

export default connect(mapStateToProps)(HomeContainer);
