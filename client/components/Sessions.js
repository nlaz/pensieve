import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as reviewActions from '../actions/reviewActions';

const PageHead = ({ children, onStartClick }) => {
	const button = <button onClick={onStartClick} className='btn btn-success pull-right'>Review Now</button>;

	return (
		<div className='col-md-8 col-md-offset-2'>
			<h2 className='page-header'>Recent Activity {button}</h2>
			{children}
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
	const dateLabel = moment(session.createdAt).fromNow();
	const itemCount = session.items.length;

	return (
		<li key={session._id} className='list-group-item'>
			<Link to='/sessions/1/'>
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
	if (!sessions.length) { return false; }
	const reviewedSessions = sessions.filter(session => Boolean(session.finishedAt));
	if (!reviewedSessions.length) { return false; }

	reviewedSessions.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)));

	return (
		<ul className='list-group'>
			{reviewedSessions.map((session, key) => (
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
			this.props.actions.fetchSessions();
		}
	}

	onStartClick() {
		this.props.actions.createSession();
	}

	render() {
		const { sessions } = this.props;

		if (!sessions || !sessions.length) {
			return (
				<PageHead onStartClick={this.onStartClick}>
					<h4>No review sessions available</h4>
				</PageHead>
		   );
		}

		return (
			<PageHead onStartClick={this.onStartClick}>
				<SessionsList sessions={sessions} />
			</PageHead>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	sessions: state.data.sessions,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(reviewActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
