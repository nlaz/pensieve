import React from 'react';
import { Link } from 'react-router';

export default class LandingPage extends React.Component {
	render() {
		return (
			<section className='landing text-center'>
				<div className='container'>
					<h1 className='title'>Remember Anything</h1>
					<h4 className='subtitle'>A new tool to learn more efficiently</h4>
					<div>
						<Link className='btn btn-primary btn-lg' to='/signup' role='button'>Get Started</Link>
					</div>
				</div>
			</section>
		);
	}
}
