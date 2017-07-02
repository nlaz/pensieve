import React from 'react';
import Header from '../Header';

export default class LandingPage extends React.Component {
	render() {
		return (
			<Header className='landing-page text-center'>
				<div className='landing-body container'>
					<h1 className='title'>Remember Anything</h1>
					<h4 className='subtitle'>A new tool to learn more efficiently</h4>
					<div className='landing-input'>
						<input type='text' placeholder='Email Address' />
						<button className='btn btn-primary'>Request Access</button>
					</div>
				</div>
			</Header>
		);
	}
}
