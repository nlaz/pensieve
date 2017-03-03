import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default class Signup extends React.Component {
	render() {
		return (
			<div className='row'>
				<div className='col-md-6 col-md-offset-3'>
					<h2>Join Boreas Today</h2>
					<form action='/signup' method='post'>
						<div className='form-group'>
							<label htmlFor='nameInput'>Name</label>
							<input name='name' id='nameInput' className='form-control' type="text" placeholder='What should we call you?'/>
						</div>
						<div className='form-group'>
							<label htmlFor='emailInput'>Email</label>
							<input name='email' id='emailInput' className='form-control' type="email" placeholder='you@your-domain.com'/>
						</div>
						<div className='form-group'>
							<label htmlFor='passwordInput'>Password</label>
							<input name='password' id='passwordInput' className='form-control' type="password" placeholder='Shhh! Keep this secret.'/>
						</div>

						<button type="submit" className='btn btn-primary btn-block'>Join</button>
					</form>

					<hr/>

					<div className='row'>
						<p className='text-center'>Already have an account? <Link to="/login">Login</Link></p>
						<p className='text-center'>Or go <Link to="/">home</Link>.</p>
					</div>
				</div>
			</div>
		);
	}
}
