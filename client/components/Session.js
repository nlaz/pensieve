import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as reviewActions from '../actions/reviewActions';
import * as itemActions from '../actions/itemActions';

const styles = {
	height: '300px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

class Session extends React.Component {
	constructor(props) {
		super(props);
		this.onItemClick = this.onItemClick.bind(this);
		this.onDecrement = this.onDecrement.bind(this);
		this.onIncrement = this.onIncrement.bind(this);
		this.onNextAction = this.onNextAction.bind(this);
		this.state = { selected: 0, showAnswer: false, showNextOptions: false };
	}

	componentWillMount() {
		if (!this.props.session) {
			this.props.actions.fetchSession(this.props.params.sessionId);
		}
	}

	onDecrement() {
		const index = this.state.selected;
		const items = this.props.session.items;
		this.setState({ selected: Math.max(0, index - 1) });
	};

	onIncrement() {
		const index = this.state.selected;
		const { items } = this.props.session;
		this.setState({ selected: Math.min(items.length - 1, index + 1) });
	};

	onNextAction(event) {
		const { items } = this.props.session;
		const index = this.state.selected;
		this.props.actions.reviewItem({ itemId: items[index]._id });
		if ( index < items.length - 1 ) {
			// Go to next item
			const nextIndex = Math.min(items.length - 1, index + 1);
			this.setState({ showNextOptions: false, showAnswer: false, selected: nextIndex });
		} else {
			// Finish review
			this.setState({ finished: true });
		}
	}

	onItemClick() {
		this.setState({ showAnswer: !this.state.showAnswer, showNextOptions: true });
	}

	render() {
		const { selected, showAnswer, showNextOptions } = this.state;
		const { session: { items } = {} } = this.props;

		if (!items) {
			return <h1>No items available</h1>;
		}

		const selectedItem = items[selected];
		const itemContent = showAnswer ? selectedItem.description : selectedItem.title;
		const renderContent = this.state.finished ? (
			<div>Finished</div>
		) : (
			<div>
				<div className='panel panel-default'>
					<div className='panel-body' style={styles} onClick={this.onItemClick}>
						<h3 className='text-center' style={{ margin: '0'}}>
							{itemContent}
						</h3>
					</div>
				</div>
				{showNextOptions ? (
					<div className='row'>
						<button onClick={this.onNextAction} type="button" className="btn btn-primary col-xs-4">Hard</button>
						<button onClick={this.onNextAction} type="button" className="btn btn-primary col-xs-4">Good</button>
						<button onClick={this.onNextAction} type="button" className="btn btn-primary col-xs-4">Easy</button>
					</div>
				) : (
					<div className='row'>
						<button onClick={this.onItemClick} type='button' className='btn btn-primary col-xs-12'>Show Answer</button>
					</div>
				)}
			</div>
		);

		return (
			<div className='row'>
				<div className='col-md-8 col-md-offset-2'>
					<div className='page-header'>
						<h2>Session Page <span className='label label-default'>{items.length - selected}</span></h2>
						{renderContent}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	session: state.data.session,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({...reviewActions, ...itemActions}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
