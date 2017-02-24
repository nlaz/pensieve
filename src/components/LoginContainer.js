import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from '../actions/sessionActions';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '' };
		this.onChange = this.onChange.bind(this);
		this.onSave = this.onSave.bind(this);
	}

	onChange(event) {
		const field = event.target.name;
		this.setState({ [field]: event.target.value});
	}

	onSave(event) {
		event.preventDefault();
		this.props.actions.loginUser(this.state.email, this.state.password);
	}

	render() {
		return (
			<div className='row'>
				<div className='col-md-6 col-md-offset-3'>
					<h2>Login</h2>
					<form>
						<div className='form-group'>
							<label htmlFor='emailInput'>Email</label>
							<input onChange={this.onChange} name='email' id='emailInput' className='form-control' type="email" placeholder='you@your-domain.com'/>
						</div>
						<div className='form-group'>
							<label htmlFor='passwordInput'>Password</label>
							<input onChange={this.onChange} name='password' id='passwordInput' className='form-control' type="password" placeholder='Shhh! Keep this secret.'/>
						</div>

						<button onClick={this.onSave} type="submit" className='btn btn-primary btn-block'>Login</button>
					</form>

					<hr/>

					<div className='row'>
						<p className='text-center'>Need an account? <Link to="/signup">Signup</Link></p>
						<p className='text-center'>Or go <Link to="/">home</Link>.</p>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(sessionActions, dispatch)
});

export default connect(null, mapDispatchToProps)(Login);
