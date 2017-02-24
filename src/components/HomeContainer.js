import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as itemActions from '../actions/itemActions';

class HomeContainer extends React.Component {
	componentWillMount() {
		if (!this.props.items) {
			this.props.actions.fetchItems();
		}
	}

	render() {
		const {
			self,
			items,
		} = this.props;

		if (!self) {
			return <h1>Home Page</h1>;
		}

		const renderItem = (item, key) => (
			<li key={key} className='list-group-item'>{item.title}</li>
		);
	
		return (
			<div>
				<h1>Welcome, {self.name}!</h1>
				{items &&
					<div className='col-md-8 col-md-offset-2'>
						<h4>Your Items</h4>
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
	self: state.app.self,
	items: state.data.items,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
