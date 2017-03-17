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


const SessionsPage = ({ children, title }) => (
	<div className='row'>
		<div className='col-md-8 col-md-offset-2'>
			<div className='page-header'>
				<h2>{title}</h2>
				{children}
			</div>
		</div>
	</div>
);

const SessionResults = ({ items }) => {
	const renderItem = (item) => (
		<li key={`${item._id}`} className='list-group-item'>
			{item.title}
			<span className='badge alert-success'>
				<span className='glyphicon glyphicon-ok' aria-hidden='true'></span>
			</span>
		</li>
	);

	return (
		<div>
			<ul className='list-group'>
				{items.map(renderItem)}
			</ul>
			<div className='text-right'>
				<Link to='/sessions' className='btn btn-primary'>Back</Link>
			</div>
		</div>
	);
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
		this.setState({ showNextOptions: false, showAnswer: false, selected: index + 1 });
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

		if (this.state.selected >= items.length - 1 ) {
			return (
				<SessionsPage title='Results'>
					<SessionResults items={items} />
				</SessionsPage>
			);
		}

		return (
			<SessionsPage title='Review'>
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
			</SessionsPage>
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
