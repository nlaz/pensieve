import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

export const NavBar = ({ self, authenticated, showNavMenu, onshowNavMenu }) => (
	<nav className='navbar navbar-inverse'>
		<div className='container'>
			<div className='navbar-header'>
				<button type='button' onClick={() => onshowNavMenu(!showNavMenu)} className='navbar-toggle collapsed'>
					<span className='sr-only'>Toggle Navigation</span>
					<span className='icon-bar'></span>
					<span className='icon-bar'></span>
					<span className='icon-bar'></span>
				</button>
				<Link className='navbar-brand' to='/'>Boreas</Link>
			</div>
			<div className={cx('navbar-collapse', { 'collapse': !showNavMenu })} id='navbar-actions'>
				{self && authenticated ? (
					<ul className='nav navbar-nav navbar-right'>
						<li><Link onClick={() => onshowNavMenu(false)}>Welcome, {self.name}</Link></li>
						<li><Link to='/activity' onClick={() => onshowNavMenu(false)}>Activity</Link></li>
						<li><Link to='/decks' onClick={() => onshowNavMenu(false)}>Decks</Link></li>
						<li><Link to='/items' onClick={() => onshowNavMenu(false)}>Items</Link></li>
						<li><Link to='/logout' onClick={() => onshowNavMenu(false)}>Logout</Link></li>
					</ul>
				): (
					<ul className='nav navbar-nav navbar-right'>
						<li><Link to='/login'>Login</Link></li>
					</ul>
				)}
			</div>
		</div>
	</nav>
);
