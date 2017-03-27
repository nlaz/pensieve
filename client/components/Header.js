import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

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

const NavBar = ({ self }) => (
	<nav className='navbar navbar-inverse'>
		<div className='container'>
			<Link className='navbar-brand' to='/'>Boreas</Link>
			{self ? (
				<ul className='nav navbar-nav navbar-right'>
					<li><Link>Welcome, {self.name}</Link></li>
					<li><Link to='/activity'>Activity</Link></li>
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

class Header extends React.Component {
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
		const { self, message } = this.props;
		const { showMessage } = this.state;

		return (
			<div>
				<NavBar self={self} />
				{ showMessage &&
					<FlashMessage message={message} onDismiss={this.onClose} />
				}
			</div>
		);
	}
}

export default Header;
