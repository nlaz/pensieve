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
		this.state = { selected: 0 };
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

	render() {
		const { selected } = this.state;
		const { session = {} } = this.props;
		const items = session.items;

		if (!items) {
			return <h1>No items available</h1>;
		}

		const renderItem = (item, key) => {
			const isActive = (key === selected);
			const classNames = cx('list-group-item', { 'active': isActive });
			return (
				<button onClick={this.onItemClick} type='button' className={classNames} key={key} data-key={key}>
					{item.title}
				</button>
			);
		};

		return (
			<div className='row'>
				<div className='col-md-8 col-md-offset-2'>
					<div className='page-header'>
						<h1>Session Page</h1>
					</div>
					<div className='panel panel-default'>
						<div className='panel-body' style={styles}>
							<h3 className='text-center' style={{ margin: '0'}}>{items[selected].title}</h3>
						</div>
					</div>
					{items.length > 0 &&
						<div className='text-right'>
							<button onClick={this.onDecrement} type="button" className="btn btn-primary">Back</button>
							<button onClick={this.onIncrement} type="button" className="btn btn-primary">Next</button>
						</div>
					}
					<hr/>
					<h4>Session Items</h4>
					{items &&
						<div className='list-group'>
							{items.map(renderItem)}
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
