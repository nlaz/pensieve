import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as emailActions from '../actions/emailActions';
const HEADER_IMAGE = require('../assets/images/illustration.png');

export class LandingPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = { email: '' };
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		const { value } = e.target;
		this.setState(() => ({ email: value }));
	}

	onSubmit(e) {
		e.preventDefault();
		const { email } = this.state;
		this.props.actions.prelaunchSignUp({ email });
	}

	render() {
		const { email } = this.state;
		const { isSuccess, hasErrored } = this.props;
		return (
			<Header className='landing-page text-center'>
				<div className='landing-body container'>
					<div className='landing-copy col-sm-6'>
						<h4 className='coming-soon'>COMING SOON</h4>
						<h1 className='title'>Cut your study time in half</h1>
						<h4 className='subtitle'><strong>Learn smarter.</strong> Boreas uses intelligent flashcards to find the best time for you to review so you learn better.</h4>
						<form className='landing-form' onSubmit={this.onSubmit}>
							{isSuccess &&
								<div className='info-success'>Success! Thanks for signing up to our magical product.</div>
							}
							{!isSuccess &&
								<div>
		              <label htmlFor='email'>Beta coming early September. Request an invite.</label>
									<div className='landing-input'>
										<input onChange={this.onChange} name='email' type='text' placeholder='Email Address' value={email} />
										<button onClick={this.onSubmit} type='submit' className='btn btn-primary'>Request Access</button>
									</div>
									{hasErrored &&
										<div className='input-error'>Sorry! You broke our thing :(</div>
									}
								</div>
							}
						</form>
						</div>
					<div className='landing-image col-sm-6'>
						<img alt='Hero image' src={HEADER_IMAGE} />
					</div>
				</div>
				<div className='landing-footer'>
					<div className='footer-item'>
						<span>Boreas &copy; 2017</span>
					</div>
					{'|'}
					<div className='footer-item'>
						<a href="mailto:nikolazaris@gmail.com">Contact</a>
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
