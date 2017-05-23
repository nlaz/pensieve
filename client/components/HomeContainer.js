import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/appActions';
import { NavBar } from './NavBar';

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


class HomeContainer extends React.Component {
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
			<div style={{ minHeight: '100vh' }}>
				<NavBar
					self={self}
					showNavMenu={this.state.showNavMenu}
					onshowNavMenu={this.onshowNavMenu}
					authenticated={authenticated} />
				{ showMessage &&
					<FlashMessage error={error} message={message} onDismiss={this.onClose} />
				}
				{children}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
