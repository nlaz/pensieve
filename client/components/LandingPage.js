import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as emailActions from '../actions/emailActions';
import { SignupForm } from './SignupForm';

export class LandingPage extends React.Component {
	constructor(props) {
		super(props);

		this.onSignup = this.onSignup.bind(this);
	}

	onSignup(email) {
		this.props.actions.prelaunchSignUp({ email });
	}

	render() {
		const { isSuccess, hasErrored } = this.props;
		return (
			<Header className="landing-page text-center">
				<div className="landing-body container">
					<div className="landing-copy col-sm-8 col-md-6">
						<h4 className="coming-soon">COMING SOON</h4>
						<h1 className="title">Cut your study time in half</h1>
						<h4 className="subtitle">
							<strong>Learn smarter.</strong> Boreas uses intelligent flashcards
							to find the best time for you to review so you learn better.
						</h4>
						<SignupForm
							isSuccess={isSuccess}
							hasErrored={hasErrored}
							onSignup={this.onSignup}
						/>
					</div>
					<div className="landing-image col-sm-4 col-md-6" />
				</div>
				<div className="landing-footer">
					<div className="footer-item">
						<span>Boreas &copy; 2017</span>
					</div>
					{'|'}
					<div className="footer-item">
						<a href="mailto:info@boreas.space">Contact</a>
					</div>
				</div>
			</Header>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(emailActions, dispatch)
});

const mapStateToProps = state => ({
	isSuccess: state.prelaunch.isSuccess,
	hasErrored: state.prelaunch.hasErrored
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
