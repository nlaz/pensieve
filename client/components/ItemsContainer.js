import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as itemActions from '../actions/itemActions';

class ItemsContainer extends React.Component {
	componentWillMount() {
		if (!this.props.items) {
			this.props.actions.fetchItems();
		}
	}

	render() {
		const { items } = this.props;

		const renderItem = (item, key) => (
			<li key={key} className='list-group-item'>
				<Link to={`/items/${item._id}`}>{item.title}</Link>
			</li>
		);
	
		return (
			<div>
				{items &&
					<div className='col-md-8 col-md-offset-2'>
						<div className='row'>
							<h4 className='col-xs-6'>Your Items</h4>
							<div className='col-xs-6'>
								<Link to='/items/new' className='btn btn-success pull-right'>Create New</Link>
							</div>
						</div>
						<ul className='list-group'>
							{items.map(renderItem)}
						</ul>
					</div>
				}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	items: state.data.items,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
