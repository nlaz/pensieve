import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../Header';
import * as itemActions from '../../actions/itemActions';

class ItemNewContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { title: '', description: '' };
		this.onChange = this.onChange.bind(this);
		this.onSave = this.onSave.bind(this);
	}

	onChange(event) {
		const field = event.target.name;
		this.setState({ [field]: event.target.value });
	}

	onSave(event) {
		event.preventDefault();
		const { title, description } = this.state;
		this.props.actions.createItem({ title, description });
	}

	render() {
		return (
			<Header className='newItem-page'>
				<div className='container margin-top'>
					<div className='col-md-8 col-md-offset-2'>
						<form>
							<div className='form-group'>
								<label htmlFor='titleInput'>Title</label>
								<input onChange={this.onChange} name='title' id='titleInput' className='form-control' type='text' placeholder='Title' />
							</div>
							<div className='form-group'>
								<label htmlFor='descriptionInput'>Description</label>
								<textarea onChange={this.onChange} name='description' id='descriptionInput' className='form-control' rows='5'></textarea>
							</div>

							<button onClick={this.onSave} type='submit' className='btn btn-primary btn-block'>Submit</button>
						</form>
					</div>
				</div>
			</Header>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(itemActions, dispatch)
});

export default connect(null, mapDispatchToProps)(ItemNewContainer);
