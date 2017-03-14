import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as reviewActions from '../actions/reviewActions';

const styles = {
	height: '300px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

class Session extends React.Component {
	constructor(props) {
		super(props);
		this.onItemClick = this.onItemClick.bind(this);
		this.onDecrement = this.onDecrement.bind(this);
		this.onIncrement = this.onIncrement.bind(this);
		this.onItemClick = this.onItemClick.bind(this);
		this.state = { selected: 0, showFront: true };
	}

	componentWillMount() {
		if (!this.props.session) {
			this.props.actions.fetchSession(this.props.params.sessionId);
		}
	}

	onItemClick(e) {
		const index = e.target.dataset.key;
		this.setState({ selected: parseInt(index) });
	}

	onDecrement() {
		const index = this.state.selected;
		const items = this.props.session.items;
		this.setState({ selected: Math.max(0, index - 1) });
	};

	onIncrement() {
		const index = this.state.selected;
		const items = this.props.session.items;
		this.setState({ selected: Math.min(items.length - 1, index + 1) });
	};

	onItemClick() {
		this.setState({ showFront: !this.state.showFront });
	}

	render() {
		const { selected, showFront } = this.state;
		const { session = {} } = this.props;
		const { items } = session;

		if (!items) {
			return <h1>No items available</h1>;
		}

		const selectedItem = items[selected];
		const itemContent = showFront ? selectedItem.title : selectedItem.description;

		return (
			<div className='row'>
				<div className='col-md-8 col-md-offset-2'>
					<div className='page-header'>
						<h1>Session Page <span className='label label-default'>{items.length}</span></h1>
					</div>
					<div className='panel panel-default'>
						<div className='panel-body' style={styles} onClick={this.onItemClick}>
							<h3 className='text-center' style={{ margin: '0'}}>
								{itemContent}
							</h3>
						</div>
					</div>
					{items.length > 0 &&
						<div className='text-right'>
							<button onClick={this.onDecrement} type="button" className="btn btn-danger">Skip</button>
							<button onClick={this.onIncrement} type="button" className="btn btn-primary">Good</button>
						</div>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	session: state.data.session,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(reviewActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
