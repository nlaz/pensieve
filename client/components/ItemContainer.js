import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as itemActions from '../actions/itemActions';

const styles = {
	height: '300px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

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

		if (!item) { return <h3>Item doesn't exist</h3>; }

		const itemContent = showAnswer ? item.description : item.title;
		const editButton = <button onClick={this.onEditClick} className='btn btn-success pull-right'>Edit</button>;
		return (
			<div className='row'>
				<div className='col-md-8 col-md-offset-2'>
					<div className='page-header'>
						<h2>Item {editButton}</h2>
					</div>
					<div className='panel panel-default'>
						<div className='panel-body' style={styles} onClick={this.onItemClick}>
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

const mapStateToProps = (state, ownProps) => ({
	item: state.data.item,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
