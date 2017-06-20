import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as reviewActions from '../actions/reviewActions';
import * as itemActions from '../actions/itemActions';

const PageHead = ({ children, onStartClick, dueItems }) => {
	const buttonLabel = dueItems ? `Review Now (${dueItems.length})` : 'Review Now';
	const button = <button onClick={onStartClick} className='btn btn-success pull-right'>{buttonLabel}</button>;

	return (
		<div className='container'>
			<div className='col-md-8 col-md-offset-2'>
				<h4 className='page-header'>Recent Activity {button}</h4>
				{children}
			</div>
		</div>
	);
};

const dotStyle = {
	backgroundColor: '#dff0d8',
	borderColor: '#dff0d8',
	borderRadius: '100%',
	height: 12,
	marginTop: 5,
	width: 12,
	display: 'inline-block',
	listStyle: 'none',
};

const SessionItem = ({ session }) => {
	const dateLabel = moment(session.finishedAt).fromNow();
	const itemCount = session.items.length;

	return (
		<li key={session._id} className='list-group-item'>
			<Link to={`/sessions/${session._id}/`}>
				<strong>Reviewed {itemCount} items</strong> <small>&bull; {dateLabel}</small>
				{session.items &&
					<ul className='pull-right'>
						{session.items.map((item, key) => (
							<li key={key} style={dotStyle}></li>
						))}
					</ul>
				}
			</Link>
		</li>
	);
};

const SessionsList = ({ sessions }) => {
	sessions.sort((a, b) => (new Date(b.finishedAt) - new Date(a.finishedAt)));

	return (
		<ul className='list-group'>
			{sessions.map((session, key) => (
				<SessionItem session={session} key={key} />
			))}
		</ul>
	);
};

class Sessions extends React.Component {
	constructor(props) {
		super(props);
		this.onStartClick = this.onStartClick.bind(this);
	}

	componentWillMount() {
		if (!this.props.sessions) {
			this.props.reviewActions.fetchSessions();
			this.props.itemActions.getDueItems();
		}
	}

	onStartClick() {
		this.props.reviewActions.createSession();
	}

	render() {
		const { sessions = [], dueItems } = this.props;
		const reviewedSessions = sessions.filter(session => Boolean(session.finishedAt));

		if (!reviewedSessions.length) {
			return (
				<PageHead onStartClick={this.onStartClick}>
					<h4>No review sessions available</h4>
				</PageHead>
		   );
		}

		return (
			<PageHead onStartClick={this.onStartClick} dueItems={dueItems}>
				<SessionsList sessions={reviewedSessions} />
			</PageHead>
		);
	}
}

const mapStateToProps = (state) => ({
	sessions: state.data.sessions,
	dueItems: state.data.due_items,
});

const mapDispatchToProps = (dispatch) => ({
	reviewActions: bindActionCreators(reviewActions, dispatch),
	itemActions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
