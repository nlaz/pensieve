import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as itemActions from '../actions/itemActions';

class NewItemContainer extends React.Component {
	render() {
		const item = this.props.item;
		return (
			<div className='col-md-8 col-md-offset-2'>
				<label>Title</label>
				<input type='text' />
				<label>Description</label>
				<textarea></textarea>
				<button>Submit</button>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(itemActions, dispatch)
});

export default connect(null, mapDispatchToProps)(NewItemContainer);
