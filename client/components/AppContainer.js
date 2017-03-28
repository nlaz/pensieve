import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';

const FlashMessage = ({ message, onDismiss }) => {
	if (!message) { return false; }

	return (
		<div className='container'>
			<div className='alert alert-info alert-dismissable' role='alert'>
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
		this.state = { showMessage: true };
	}

	onClose(event) {
		event.preventDefault();
		this.setState({ showMessage: false });
	}

	render() {
		const { authenticated, children, message, self } = this.props;
		const { showMessage } = this.state;

		return (
			<div className='body'>
				<NavBar self={self} authenticated={authenticated} />
				{ showMessage &&
					<FlashMessage message={message} onDismiss={this.onClose} />
				}
				<div className='container'>
					{children}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	self: state.app.self,
	authenticated: state.app.authenticated,
	message: state.app.message,
});

export default connect(mapStateToProps)(AppContainer);
