import React from 'react';
import ReactDOM from 'react-dom';

export default class Sessions extends React.Component {
	render() {
		const styles = {
			height: '300px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		};

		return (
			<div className='row'>
				<div className='col-md-8 col-md-offset-2'>
					<div className='page-header'>
						<h1>Session Page</h1>
					</div>
					<div className='panel panel-default'>
						<div className='panel-body' style={styles}>
							<h3 className='text-center' style={{ marigin: '0'}}>Test Item Body</h3>
						</div>
					</div>
					<div className='text-right'>
						<button type="button" className="btn btn-primary">Back</button>
						<button type="button" className="btn btn-primary">Next</button>
					</div>
					<hr/>
					<h4>Session Items</h4>
					<ul className='list-group'>
						<li className='list-group-item'>Item 1</li>
						<li className='list-group-item'>Item 2</li>
						<li className='list-group-item'>Item 3</li>
						<li className='list-group-item'>Item 4</li>
						<li className='list-group-item'>Item 5</li>
					</ul>
				</div>
			</div>
		);
	}
}
