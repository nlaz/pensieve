import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../molecules/Header';
import * as itemActions from '../../actions/itemActions';

const panelStyles = {
	minHeight: '300px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	whiteSpace: 'pre-wrap',
};

class ItemContainer extends React.Component {
	constructor(props) {
		super(props);
		this.onItemClick = this.onItemClick.bind(this);
		this.onEditClick = this.onEditClick.bind(this);
		this.onToggleHideItem = this.onToggleHideItem.bind(this);
		this.state = { showAnswer: false };
	}

	componentWillMount() {
		const { item, params } = this.props;
		if (!item || item._id !== params.itemId) {
			this.props.actions.fetchItem(params.itemId);
		}
	}

	onItemClick() {
		this.setState({ showAnswer: !this.state.showAnswer });
	}

	onEditClick() {
		const itemId = this.props.item._id;
		this.props.router.push(`/items/${itemId}/edit`);
	}

	onToggleHideItem(e, item) {
		e.preventDefault();
		e.stopPropagation();
		this.props.actions.toggleHideItem(item);
	}

	render() {
		const { item } = this.props;
		const { showAnswer } = this.state;

		if (!item) {
			 return (
				 <h3>
					 <strong>Hmm.</strong> Item does not exist
				 </h3>
			 );
		 }

		const itemContent = showAnswer ? item.description : item.title;
		const editButton = <button onClick={this.onEditClick} className='btn btn-primary pull-right' style={{ marginLeft: '5px' }}>Edit</button>;
		const newItemButton = <Link to='/items/new' className='btn btn-primary pull-right'>New Item</Link>;

		return (
			<Header className='item-page'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 col-md-offset-2'>
							<div className='page-header'>
								<h2>Item {editButton}{newItemButton}</h2>
							</div>
							<div className='panel panel-default'>
								<div className='panel-body' style={panelStyles} onClick={this.onItemClick}>
									<h3 className='text-center' style={{ margin: '0' }}>
										{itemContent}
									</h3>
									<button onClick={(e) => this.onToggleHideItem(e, item)} className='reviewCard--hide btn btn-reset'>
										{item.hidden
											? <span className='glyphicon glyphicon-eye-close' aria-hidden='true' ></span>
											: <span className='glyphicon glyphicon-eye-open' aria-hidden='true' ></span>
										}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Header>
		);
	}
}

const mapStateToProps = (state) => ({
	item: state.data.item,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
