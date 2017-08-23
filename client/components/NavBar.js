import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

export function NavBar({ self, authenticated, showNavMenu, onshowNavMenu }) {
	return (
		<nav className="navbar navbar-inverse">
			<div className="container">
				<div className="navbar-header">
					<button
						type="button"
						onClick={() => onshowNavMenu(!showNavMenu)}
						className={cx('navbar-toggle', { collapsed: !showNavMenu })}
					>
						<span className="sr-only">Toggle Navigation</span>
						<span className="icon-bar" />
						<span className="icon-bar" />
						<span className="icon-bar" />
					</button>
					<Link className="navbar-brand" to="/">
						Pensieve
					</Link>
				</div>
				<div className={cx('navbar-collapse', { collapse: !showNavMenu })} id="navbar-actions">
					{self &&
						authenticated &&
						<ul className="nav navbar-nav navbar-left">
							<li>
								<Link to="/decks" onClick={() => onshowNavMenu(false)}>
									Decks
								</Link>
							</li>
							<li>
								<Link to="/items" onClick={() => onshowNavMenu(false)}>
									Items
								</Link>
							</li>
						</ul>}
					{self && authenticated
						? <ul className="nav navbar-nav navbar-right">
								<li>
									<Link to="/sessions/new" className="btn-reviewNow btn btn-primary">
										Review Now
									</Link>
								</li>
								<li>
									<Link to="/logout" onClick={() => onshowNavMenu(false)}>
										Logout
									</Link>
								</li>
							</ul>
						: <ul className="nav navbar-nav navbar-right">
								<li>
									<Link to="/login">Login</Link>
								</li>
							</ul>}
				</div>
			</div>
		</nav>
	);
}
