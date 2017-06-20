import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as reviewActions from '../actions/reviewActions';

class SessionNew extends React.Component {
	componentDidMount() {
    this.props.actions.createSession();
	}

	render() {
		return (
			<div className='col-md-8 col-md-offset-2 text-center'>
        <h3 style={{ marginTop: '50px' }}>
          Creating your review session...
        </h3>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(reviewActions, dispatch)
});

export default connect(null, mapDispatchToProps)(SessionNew);
