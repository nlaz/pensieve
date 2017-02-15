import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default class PageWrap extends React.Component {
	render() {
		return (
			<div className='body'>
				<nav className='navbar navbar-inverse'>
					<div className='container'>
						<Link className='navbar-brand' to='/'>Boreas</Link>
						<ul className='nav navbar-nav navbar-right'>
							<li><Link to='/login'>Login</Link></li>
						</ul>
					</div>
				</nav>
				<div className='container'>
					{this.props.children}
				</div>
			</div>
		);
	}
}
