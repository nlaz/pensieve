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

	return (
		<div className='container'>
			<div className={classNames} role='alert'>
				<button onClick={onDismiss} type='button' className='close' data-dismiss='alert' aria-label='Close'>
					<span aria-hidden='true'>&times;</span>
				</button>
				<strong>Oops!</strong> {message}
			</div>
		</div>
	);
};

const NavBar = ({ self, authenticated }) => (
	<nav className='navbar navbar-inverse'>
		<div className='container'>
			<Link className='navbar-brand' to='/'>Boreas</Link>
			{self && authenticated ? (
				<ul className='nav navbar-nav navbar-right'>
					<li><Link>Welcome, {self.name}</Link></li>
					<li><Link to='/activity'>Activity</Link></li>
					<li><Link to='/items'>Items</Link></li>
					<li><Link to='/logout' >Logout</Link></li>
				</ul>
			): (
				<ul className='nav navbar-nav navbar-right'>
					<li><Link to='/login'>Login</Link></li>
				</ul>
			)}
		</div>
	</nav>
);

class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.onClose = this.onClose.bind(this);
	}

	onClose(event) {
		event.preventDefault();
		this.props.appActions.dismissError();
	}

	render() {
		const { authenticated, children, error, message, self } = this.props;
		const showMessage = Boolean(message);

		return (
			<div className='body'>
				<NavBar self={self} authenticated={authenticated} />
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
