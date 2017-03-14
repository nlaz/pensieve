import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
	render() {
		const { self } = this.props;

		return (
			<nav className='navbar navbar-inverse'>
				<div className='container'>
					<Link className='navbar-brand' to='/'>Boreas</Link>
					{self ? (
						<ul className='nav navbar-nav navbar-right'>
							<li><Link>Welcome, {self.name}</Link></li>
							<li><Link to='/sessions'>Sessions</Link></li>
							<li><Link to='/items'>Items</Link></li>
							<li><Link to='/logout'>Logout</Link></li>
						</ul>
					): (
						<ul className='nav navbar-nav navbar-right'>
							<li><Link to='/login'>Login</Link></li>
						</ul>
					)}
				</div>
			</nav>
		);
	}
}
