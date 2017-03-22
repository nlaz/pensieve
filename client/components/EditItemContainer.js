import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as itemActions from '../actions/itemActions';

class NewItemContainer extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onSave = this.onSave.bind(this);

		// Set initial form values
		const { item = {} } = props;
		this.state = { title: item.title || '', description: item.description || '' };
	}

	componentWillMount() {
		const { item, params } = this.props;
		if (!item || item._id !== params.itemId) {
			this.props.actions.fetchItem(params.itemId);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.item !== this.props.item) {
			const { title, description } = nextProps.item;
			this.setState({ title: title, description: description });
		}
	}

	onChange(event) {
		const field = event.target.name;
		this.setState({ [field]: event.target.value });
	}

	onSave(event) {
		event.preventDefault();
		const { item } = this.props;
		const { title, description } = this.state;
		const itemId = item._id;
		this.props.actions.editItem({ itemId, title, description });
	}

	render() {
		const { item } = this.props;
		return (
			<div className='col-md-8 col-md-offset-2'>
				<form>
					<div className='form-group'>
						<label htmlFor='titleInput'>Title</label>
						<input onChange={this.onChange} value={this.state.title} name='title' id='titleInput' className='form-control' type='text' placeholder='Title' />
					</div>
					<div className='form-group'>
						<label htmlFor='descriptionInput'>Description</label>
						<textarea onChange={this.onChange} value={this.state.description} name='description' id='descriptionInput' className='form-control' rows='5'></textarea>
					</div>

					<button onClick={this.onSave} type='submit' className='btn btn-primary btn-block'>Update</button>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(itemActions, dispatch)
});

const mapStateToProps = (state, ownProps) => ({
	item: state.data.item,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewItemContainer);
