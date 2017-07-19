import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../Header';
import * as itemActions from '../../actions/itemActions';

export const PAGE_SIZE = 15;

const PageNavigation = ({ numPages, onDecrementPage, onIncrementPage, onChangePage}) => (
	<nav aria-label="Page navigation">
	  <ul className="pagination">
	    <li>
	      <a onClick={onDecrementPage} href="#" aria-label="Previous">
	        <span aria-hidden="true">&laquo;</span>
	      </a>
	    </li>
			{Array(numPages).fill(1).map((obj, key) => (
		    <li key={key} onClick={() => onChangePage(key)}><a href="#">{key}</a></li>
			))}

	    <li>
	      <a onClick={onIncrementPage} href="#" aria-label="Next">
	        <span aria-hidden="true">&raquo;</span>
	      </a>
	    </li>
	  </ul>
	</nav>
);

class ItemsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.onIncrementPage = this.onIncrementPage.bind(this);
		this.onDecrementPage = this.onDecrementPage.bind(this);
		this.onChangePage = this.onChangePage.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.state = { activePage: 0, filter: '' };
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

  	const newItemButton = (
			<Link to='/items/new' className='btn btn-success btn-md pull-right' style={{ height: '34px' }}>
				<span className="glyphicon glyphicon-plus" aria-hidden="true" style={{ lineHeight: '18px' }} ></span>
			</Link>
		);

		const searchBar = (
			<div className='form-group pull-right' style={{ marginRight: '10px' }}>
				<input onChange={this.onSearchChange} type='text' className='form-control' placeholder='Search' />
			</div>
		);

		if (!items) {
			return (
				<div className='col-md-8 col-md-offset-2'>
					<h4 className='page-header'>Your Items {newItemButton}</h4>
					<h4>You don't have any items yet. <em>Ahem. Bummer...</em></h4>
				</div>
			);
		}

		const filteredItems = filter.length > 0 ? items.filter(item => item.title.indexOf(filter) !== -1) : items;
		const numPages = Math.ceil(filteredItems.length / PAGE_SIZE);
		const pageStart = activePage * PAGE_SIZE;
		const pageEnd = Math.min((activePage + 1) * PAGE_SIZE, filteredItems.length);
		const pageItems = filteredItems.slice(pageStart, pageEnd);

		const reviewCountStyle = {
			color: '#ffffff',
			background: '#66c067',
			borderRadius: '100%',
			width: '20px',
			height: '20px',
			display: 'inline-block',
			textAlign: 'center'
		};
		const reviewCountEl = item => <div style={reviewCountStyle}>{item.counter}</div>;
		const nextReviewEl = item => <span>{moment(item.nextReviewDate).toNow(true)}</span>;
		const itemTag = item => <span style={{ color: '#d5d5d5' }}>{nextReviewEl(item)} &middot; {reviewCountEl(item)}</span>;
		return (
			<Header className='items-page'>
				<div className='container'>
					<div className='col-md-8 col-md-offset-2'>
						<h4 className='page-header'>Your Items {newItemButton} {searchBar}</h4>
						<ul className='list-group'>
							{pageItems.map((item, key) => (
								<li key={key} className='list-group-item'>
									<Link to={`/items/${item._id}`} className='row'>
									<span className='col-xs-8'>{item.title}</span>
										<span className='col-xs-4 text-right'>{itemTag(item)}</span>
									</Link>
								</li>
							))}
						</ul>
						{numPages > 1 &&
							<PageNavigation
								numPages={numPages}
								onIncrementPage={this.onIncrementPage}
								onDecrementPage={this.onDecrementPage}
								onChangePage={this.onChangePage}
							/>
						}
					</div>
				</div>
			</Header>
		);
	}
}

const mapStateToProps = (state) => ({
	items: state.data.items,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
