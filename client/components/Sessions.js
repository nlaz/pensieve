import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as reviewActions from '../actions/reviewActions';

const PageHead = ({ children, onStartClick }) => (
	<div className='col-md-8 col-md-offset-2'>
		<div className='row'>
			<h1 className='col-xs-6'>Sessions</h1>
			<div className='col-xs-6'>
				<button onClick={onStartClick} className='btn btn-success pull-right'>Start Review</button>
			</div>
		</div>
		{children}
	</div>
);

const SessionsList = ({ sessions }) => {
	sessions.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)));
	const renderSession = (session) => {
		const dateLabel = moment(session.createdAt).fromNow();
		return (
			<li key={session._id} className='list-group-item'>
				<Link to={`/sessions/${session._id}`}>{dateLabel}</Link>
			</li>
		);
	}

	return (
		<ul className='list-group'>
			{sessions.map(renderSession)}
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
