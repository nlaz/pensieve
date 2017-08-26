import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../Header';
import * as deckActions from '../../actions/deckActions';
import { PageNavigation } from '../organisms/ItemsContainer';

export const PAGE_SIZE = 16;

export function DeckCard({ deck }) {
	return (
		<div className="col-xs-6 col-sm-3 deckCard-wrapper">
			<Link to={`/decks/${deck._id}`} className="deckCard">
				<span className="deckCard-itemCount">
					{deck.items.length}
					<span className="glyphicon glyphicon-file" aria-hidden="true" />
				</span>
				<h4 className="deckCard-title">
					{deck.title}
				</h4>
				<p className="deckCard-subtitle">
					{deck.description}
				</p>
			</Link>
		</div>
	);
}

export const PageHeader = ({ count, onSearchChange }) => {
	return (
		<div className="page-header">
			<div className="info">
				<h4 className="title">Decks</h4>
				{count &&
					<p className="subtitle">
						{count} decks in your collection
					</p>}
			</div>
			<div className="actions">
				<div className="search">
					<input
						onChange={onSearchChange}
						type="text"
						id="search"
						className="form-control"
						placeholder="Search for decks..."
					/>
				</div>
				<div className="create">
					<Link to="decks/new" className="btn-newDeck btn btn-primary">
						Create Deck +
					</Link>
				</div>
			</div>
		</div>
	);
};

class DecksContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = { activePage: 0, filter: '' };
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onIncrementPage = this.onIncrementPage.bind(this);
		this.onDecrementPage = this.onDecrementPage.bind(this);
		this.onChangePage = this.onChangePage.bind(this);
	}

	componentWillMount() {
		if (!this.props.decks) {
			this.props.actions.fetchDecks();
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
		const { filter, activePage } = this.state;
		const { decks = [] } = this.props;

		const filteredDecks =
			filter.length > 0 ? decks.filter(deck => deck.title.indexOf(filter) !== -1) : decks;
		const numPages = Math.ceil(filteredDecks.length / PAGE_SIZE);
		const pageStart = activePage * PAGE_SIZE;
		const pageEnd = Math.min((activePage + 1) * PAGE_SIZE, filteredDecks.length);
		const pageItems = filteredDecks.slice(pageStart, pageEnd);

		return (
			<Header className="decks-page">
				<div className="container">
					<PageHeader count={decks.length} onSearchChange={this.onSearchChange} />
					<div className="row">
						{pageItems.map((deck, key) => <DeckCard deck={deck} key={key} />)}
					</div>
					{numPages > 1 &&
						<PageNavigation
							numPages={numPages}
							onIncrementPage={this.onIncrementPage}
							onDecrementPage={this.onDecrementPage}
							onChangePage={this.onChangePage}
						/>}
				</div>
			</Header>
		);
	}
}

const mapStateToProps = state => ({
	decks: state.data.decks
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(deckActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DecksContainer);
