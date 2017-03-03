import React from 'react';
import ReactDOM from 'react-dom';

export default class LandingPage extends React.Component {
	render() {
		return (
			<div className='jumbotron'>
				<h1>Learn Better</h1>
				<p>Boreas makes use of the spacing effect to help you learn material just in time</p>
				<p><a className="btn btn-primary btn-lg" href="/signup" role="button">Sign Up</a></p>
			</div>
		);
	}
}
