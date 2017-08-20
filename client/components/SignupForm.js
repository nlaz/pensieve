import React from 'react';
import cx from 'classnames';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class SignupForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = { email: '', isInvalidEmail: false };
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		const { value } = e.target;
		this.setState(() => ({ email: value, isInvalidEmail: false }));
	}

	onSubmit(e) {
		e.preventDefault();
		const { email } = this.state;
		if (!EMAIL_REGEX.test(email)) {
			this.setState(() => ({ isInvalidEmail: true }));
		} else {
			this.props.onSignup(email);
		}
	}

	render() {
		const { email, isInvalidEmail } = this.state;
		const { isSuccess, hasErrored } = this.props;
		const showError = hasErrored || isInvalidEmail;
		const formClasses = cx('landing-form', { 'success': isSuccess, 'error': showError });

		if (isSuccess) {
			return (
				<form className={formClasses}>
					<div className='success-checkmark'>
						<img src={require('../assets/images/check.png')} />
					</div>
					<div className='info-success'><strong>WOO!</strong> Thanks for signing up. Our people will reach out to your people and we will be in touch shortly.</div>
				</form>
			);
		}

		return (
			<form className={formClasses} onSubmit={this.onSubmit}>
				<div>
					<label htmlFor='email'>Beta coming early September. Request an invite.</label>
					<div className='landing-input'>
						<input onChange={this.onChange} name='email' type='email' placeholder='Email Address' value={email} />
						<button onClick={this.onSubmit} type='submit' className='btn btn-primary'>Request Access</button>
					</div>
					{showError &&
						<div className='input-error'>
							{isInvalidEmail
								? <span><strong>Oops!</strong> That doesn't look like a real email. Try something else</span>
								: <span><strong>Uh oh!</strong> Looks like something went wrong. Please check your connection and try again.</span>
							}
						</div>
					}
				</div>
			</form>
		);
	}
}
