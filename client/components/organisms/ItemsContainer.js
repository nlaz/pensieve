import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as itemActions from '../../actions/itemActions';

export const PAGE_SIZE = 24;

export const PageNavigation = ({ numPages, onDecrementPage, onIncrementPage, onChangePage }) =>
	<nav aria-label="Page navigation" style={{ textAlign: 'center' }}>
		<ul className="pagination">
			<li>
				<a onClick={onDecrementPage} href="#" aria-label="Previous">
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>

			{new Array(numPages).fill(1).map((obj, key) =>
				<li key={key} onClick={() => onChangePage(key)}>
					<a href="#">
						{key}
					</a>
				</li>
			)}

			<li>
				<a onClick={onIncrementPage} href="#" aria-label="Next">
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>
	</nav>;

const ProgressBar = ({ progress }) =>
	<div className="progress">
		<div
			className="progress-bar progress-bar-info"
			role="progressbar"
			aria-valuenow={progress}
			aria-valuemin="0"
			aria-valuemax="100"
			style={{ width: `${progress}%` }}
		>
			<span className="sr-only">
				{progress}% Complete
			</span>
		</div>
	</div>;

export const ItemCard = ({ item, className }) => {
	const maxTime = Math.max(moment(item.nextReviewDate).diff(item.updatedAt, 'hours'), 0);
	const progressTime = Math.max(moment(item.nextReviewDate).diff(moment(), 'hours'), 0);
	const progress = progressTime / maxTime * 100 || 0;

	return (
		<div className={`itemCard-wrapper ${className}`}>
			<Link to={`/items/${item._id}`} className="itemCard">
				<ProgressBar progress={progress} />
				<h5 style={{ margin: '0', fontSize: '16px' }}>
					{item.title}
				</h5>
				{item.hidden &&
					<div className="hideIcon">
						<span className="glyphicon glyphicon-eye-close" aria-hidden="true" />
					</div>}
			</Link>
		</div>
	);
};

export const PageHeader = ({ count, onSearchChange }) => {
	return (
		<div className="page-header">
			<div className="info">
				<h4 className="title">Items</h4>
				{count &&
					<p className="subtitle">
						{count} items in your collection
					</p>}
			</div>
			<div className="actions">
				<div className="search">
					<input
						onChange={onSearchChange}
						type="text"
						id="search"
						className="form-control"
						placeholder="Search for items..."
					/>
				</div>
				<div className="create">
					<Link to="/items/new" className="btn-newItem btn pull-right">
						Create Item +
					</Link>
				</div>
			</div>
		</div>
	);
};

class ItemsContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = { activePage: 0, filter: '' };
		this.onIncrementPage = this.onIncrementPage.bind(this);
		this.onDecrementPage = this.onDecrementPage.bind(this);
		this.onChangePage = this.onChangePage.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
	}

	componentWillMount() {
		if (!this.props.items) {
			this.props.actions.fetchItems();
		}
	}

	onIncrementPage() {
		const { items } = this.props;
		const numPages = Math.ceil(items.length / PAGE_SIZE);
		const newValue = Math.min(this.state.activePage + 1, numPages - 1);
		this.setState({ activePage: newValue });
	}

	onDecrementPage() {
		const newValue = Math.max(this.state.activePage - 1, 0);
		this.setState({ activePage: newValue });
	}

	onChangePage(index) {
		this.setState({ activePage: index });
	}

	onSearchChange(e) {
		const value = e.target.value;
		this.setState({ filter: value });
	}

	render() {
		const { items } = this.props;
		const { activePage, filter } = this.state;

		if (!items) {
			return (
				<div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
					<h4 className="page-header">Your Items</h4>
					<h4>
						You don't have any items yet. <em>Ahem. Bummer...</em>
					</h4>
				</div>
			);
		}

		const filteredItems =
			filter.length > 0
				? items.filter(item => item.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
				: items;
		const numPages = Math.ceil(filteredItems.length / PAGE_SIZE);
		const pageStart = activePage * PAGE_SIZE;
		const pageEnd = Math.min((activePage + 1) * PAGE_SIZE, filteredItems.length);
		const pageItems = filteredItems.slice(pageStart, pageEnd);

		return (
			<div className="items-page container">
				<PageHeader count={items.length} onSearchChange={this.onSearchChange} />
				<div className="row">
          {pageItems.map((item, key) =>
						<ItemCard className="col-xs-6 col-sm-3 col-lg-2" item={item} key={key} />
          )}
				</div>
        {numPages > 1 &&
				<PageNavigation
					numPages={numPages}
					onIncrementPage={this.onIncrementPage}
					onDecrementPage={this.onDecrementPage}
					onChangePage={this.onChangePage}
				/>}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	items: state.data.items
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
