import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as emailActions from '../actions/emailActions';
// import HEADER_IMAGE from '../../assets/images/illustration.png';
// require('images-require-hook')(['.png'], '/build');
const HEADER_IMAGE = require('../assets/images/illustration.png');
// const HEADER_IMAGE = require('file-loader!../../assets/images/illustration.png');

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
		return (
			<Header className='landing-page text-center'>
				<div className='landing-body container'>
					<div className='landing-copy'>
						<h4 className='coming-soon'>COMING SOON</h4>
						<h1 className='title'>Cut your study time in half</h1>
						<h4 className='subtitle'><strong>Learn smarter.</strong> Boreas uses intelligent flashcards to find the best time for you to review so you learn better.</h4>
						<form className='landing-form' onSubmit={this.onSubmit}>
              <label htmlFor='email'>Beta coming early September. Request an invite.</label>
							<div className='landing-input'>
								<input onChange={this.onChange} name='email' type='text' placeholder='Email Address' value={email} />
								<button onClick={this.onSubmit} type='submit' className='btn btn-primary'>Request Access</button>
							</div>
							<div className='input-error'>Sorry! You broke our thing :(</div>
						</form>
						</div>
					<div className='landing-image col-xs-5'>
						<img alt='Hero image' src={HEADER_IMAGE} />
					</div>
				</div>
			</Header>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(emailActions, dispatch)
});

export default connect(null, mapDispatchToProps)(LandingPage);
