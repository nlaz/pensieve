import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as itemActions from '../actions/itemActions';

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
		this.state = { activePage: 0 };
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

	render() {
		const { items } = this.props;
		const { activePage } = this.state;

		const newItemButton = <Link to='/items/new' className='btn btn-success pull-right'>New Item</Link>;

		if (!items) {
			return (
				<div className='col-md-8 col-md-offset-2'>
					<h2 className='page-header'>Your Items {newItemButton}</h2>
					<h4>You don't have any items yet. <em>Ahem. Bummer...</em></h4>
				</div>
			);
		}

		const numPages = Math.ceil(items.length / PAGE_SIZE);
		const pageStart = activePage * PAGE_SIZE;
		const pageEnd = Math.min((activePage + 1) * PAGE_SIZE, items.length);
		const pageItems = items.slice(pageStart, pageEnd);

		return (
			<div className='col-md-8 col-md-offset-2'>
				<h2 className='page-header'>Your Items {newItemButton}</h2>
				<ul className='list-group'>
					{pageItems.map((item, key) => (
						<li key={key} className='list-group-item'>
							<Link to={`/items/${item._id}`}>{item.title}</Link>
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
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	items: state.data.items,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsContainer);
