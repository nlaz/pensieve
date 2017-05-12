import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/appActions';

const FlashMessage = ({ message, error, onDismiss }) => {
	if (!message) return false;

	const classNames = cx(
		'alert alert-dismissable',
		{ 'alert-info': !Boolean(error) },
		{ 'alert-danger': Boolean(error) },
	);

	const decorator = Boolean(error) ? 'Oops!' : 'Success!';

	return (
		<div className='container'>
			<div className={classNames} role='alert'>
				<button onClick={onDismiss} type='button' className='close' data-dismiss='alert' aria-label='Close'>
					<span aria-hidden='true'>&times;</span>
				</button>
				<strong>{decorator}</strong> {message}
			</div>
		</div>
	);
};

const NavBar = ({ self, authenticated, showNavMenu, onshowNavMenu }) => (
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

class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.onClose = this.onClose.bind(this);
		this.onshowNavMenu = this.onshowNavMenu.bind(this);
		this.state = { showNavMenu: false };
	}

	onClose(e) {
		e.preventDefault();
		this.props.appActions.dismissError();
	}

	onshowNavMenu(showMenu) {
		this.setState({ showNavMenu: showMenu });
	}

	render() {
		const { authenticated, children, error, message, self } = this.props;
		const showMessage = Boolean(message);

		return (
			<div className='body' style={{ minHeight: '100vh', paddingBottom: '100px' }}>
				<NavBar
					self={self}
					showNavMenu={this.state.showNavMenu}
					onshowNavMenu={this.onshowNavMenu}
					authenticated={authenticated} />
				{ showMessage &&
					<FlashMessage error={error} message={message} onDismiss={this.onClose} />
				}
				<div className='container'>
					{children}
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	appActions: bindActionCreators(appActions, dispatch),
});

const mapStateToProps = (state) => ({
	self: state.app.self,
	authenticated: state.app.authenticated,
	message: state.app.message,
	error: state.app.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
