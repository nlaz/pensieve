import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as reviewActions from '../actions/reviewActions';

class Sessions extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	componentWillMount() {
		if (!this.props.sessions) {
			this.props.actions.fetchSessions();
		}
	}

	onClick() {
		this.props.actions.createSession();
	}

	render() {
		const { sessions } = this.props;

		const renderSession = (session, key) => (
			<li key={key} className='list-group-item'>
				<Link to={`/sessions/${session._id}`}>{session.createdAt}</Link>
			</li>
		);

		const sessionsView = (sessions && sessions.length > 0) ? (
			<ul className='list-group'>
				{sessions.map(renderSession)}
			</ul>
		) : (
			<h4>No review sessions available</h4>
		);

		return (
			<div>
				<div className='col-md-8 col-md-offset-2'>
					<div className='row'>
						<h1 className='col-xs-6'>Sessions</h1>
						<div className='col-xs-6'>
							<button onClick={this.onClick} className='btn btn-success pull-right'>Start Review</button>
						</div>
					</div>
					{sessions && sessionsView}
				</div>
			</div>
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
