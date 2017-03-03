import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as itemActions from '../actions/itemActions';

class ItemContainer extends React.Component {
	componentWillMount() {
		if (!this.props.item) {
			this.props.actions.fetchItem();
		}
	}

	render() {
		const { item } = this.props;

		if (!self) {
			return <h1>Home Page</h1>;
		}

		return (
			<div>
				<div className='col-md-8 col-md-offset-2'>
					<h2>Your Item</h2>
					<h1>{item}</h1>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	item: state.data.item,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
