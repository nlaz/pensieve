import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as itemActions from '../actions/itemActions';

class ItemContainer extends React.Component {
	componentWillMount() {
		if (!this.props.item) {
			this.props.actions.fetchItem(this.props.params.itemId);
		}
	}

	render() {
		const item = this.props.item;
		return (
			<div className='col-md-8 col-md-offset-2'>
				{item &&
					<div>
						<h3>{item.title}</h3>
						<p>{item.description}</p>
					</div>
				}
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
