import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as itemActions from '../actions/itemActions';

const panelStyles = {
	minHeight: '300px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	whiteSpace: 'pre-wrap',
};

// const formatText = (text) => text.split('\n').join('<br/>').trim();

class ItemContainer extends React.Component {
	constructor(props) {
		super(props);
		this.onItemClick = this.onItemClick.bind(this);
		this.onEditClick = this.onEditClick.bind(this);
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

	render() {
		const { item } = this.props;
		const { showAnswer } = this.state;

		if (!item) {
			 return <h3><em>Hmm.</em> Item does not exist</h3>;
		 }


		const itemContent = showAnswer ? item.description : item.title;
		const editButton = <button onClick={this.onEditClick} className='btn btn-success pull-right' style={{ marginLeft: '5px' }}>Edit</button>;
		const newItemButton = <Link to='/items/new' className='btn btn-success pull-right'>New Item</Link>;

		return (
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
						</div>
					</div>
				</div>
			</div>
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
