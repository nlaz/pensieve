import React from 'react';
import Header from '../Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as emailActions from '../../actions/emailActions';

export class LandingPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = { email: '' };
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		const { value } = e.target;
		console.log('value', value);
		this.setState(() => ({ email: value }));
	}

	onSubmit(e) {
		e.preventDefault();
		const { email } = this.state;
		this.props.actions.prelaunchSignUp({ email });
	}

	render() {
		const { email } = this.state;
		console.log('email', email);
		return (
			<Header className='landing-page text-center'>
				<div className='landing-body container'>
					<h1 className='title'>Remember Anything</h1>
					<h4 className='subtitle'>A new tool to learn more efficiently</h4>
					<form onSubmit={this.onSubmit}>
						<div className='landing-input'>
							<input onChange={this.onChange} name='email' type='text' placeholder='Email Address' value={email} />
							<button onClick={this.onSubmit} type='submit' className='btn btn-primary'>Request Access</button>
						</div>
					</form>
				</div>
			</Header>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(emailActions, dispatch)
});

export default connect(null, mapDispatchToProps)(LandingPage);
