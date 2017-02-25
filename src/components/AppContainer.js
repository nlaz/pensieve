import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class AppContainer extends React.Component {
	render() {
		const { self, actions } = this.props;

		return (
			<div className='body'>
				<nav className='navbar navbar-inverse'>
					<div className='container'>
						<Link className='navbar-brand' to='/'>Boreas</Link>
						{self ? (
							<ul className='nav navbar-nav navbar-right'>
								<li><Link>Welcome, {self.name}</Link></li>
								<li><Link to='/logout'>Logout</Link></li>
							</ul>
						): (
							<ul className='nav navbar-nav navbar-right'>
								<li><Link to='/login'>Login</Link></li>
							</ul>
						)}
					</div>
				</nav>
				<div className='container'>
					{this.props.children}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { self: state.app.self };
}

export default connect(mapStateToProps)(AppContainer);
