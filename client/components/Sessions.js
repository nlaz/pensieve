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

const SessionsList = ({ sessions }) => {
	if (!sessions.length) { return false; }
	sessions.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)));
	const renderSession = (session) => {
		const dateLabel = moment(session.createdAt).format('ddd, MMM Do ha');
		const itemCount = session.items.length;
		return (
			<li key={session._id} className='list-group-item'>
				<Link to={`/sessions/${session._id}`}>
					<div className='row'>
						<div className='col-xs-8'>
							<p style={{ margin: 0 }}>
								<span className='h5'>{dateLabel}</span> <small>&bull; {itemCount} items</small>
							</p>
						</div>
						{session.finishedAt &&
							<p className='col-xs-4 text-right' style={{ margin: 0 }}>Completed</p>
						}
					</div>
				</Link>
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
