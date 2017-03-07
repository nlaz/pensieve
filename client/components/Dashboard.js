import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as itemActions from '../actions/itemActions';

class Dashboard extends React.Component {
	render() {
		return <h1>Dashboard</h1>;
	}
}

const mapStateToProps = (state, ownProps) => ({
	self: state.app.self,
	items: state.data.items,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
