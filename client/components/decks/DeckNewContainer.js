import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../molecules/Header';
import * as deckActions from '../../actions/deckActions';

const EditItemCard = ({ item, onInputChange, onRemove }) =>
	<div className="col-xs-4 itemCard--wrapper">
		<div className="itemCard">
			<button onClick={onRemove} className="itemCard--close btn">
				<span className="glyphicon glyphicon-remove" aria-hidden="true" />
			</button>
			<div className="form-group">
				<label htmlFor="title">Item title</label>
				<input
					onChange={onInputChange}
					value={item.title}
					name="title"
					className="form-control"
					type="text"
					placeholder="Give me a name..."
				/>
			</div>
			<div className="form-group" style={{ flexGrow: '1' }}>
				<label htmlFor="description">Item description</label>
				<textarea
					onChange={onInputChange}
					value={item.description}
					name="description"
					className="form-control"
					type="textarea"
					placeholder="Add some details..."
				/>
			</div>
		</div>
	</div>;

class DeckNewContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = { title: '', description: '', items: [{ title: '', description: '' }] };
		this.onAddCard = this.onAddCard.bind(this);
		this.onRemoveCard = this.onRemoveCard.bind(this);
		this.onCreateDeck = this.onCreateDeck.bind(this);
		this.onItemInputChange = this.onItemInputChange.bind(this);
		this.onDeckInputChange = this.onDeckInputChange.bind(this);
	}

	onAddCard() {
		const { items } = this.state;
		this.setState(() => ({ items: [...items, { title: '', description: '' }] }));
	}
	onRemoveCard(index) {
		const { items } = this.state;
		items.splice(index, 1);
		this.setState(() => ({ items: items }));
	}
	onItemInputChange(e, key) {
		const { items } = this.state;
		items[key] = { ...items[key], [e.target.name]: e.target.value };
		this.setState(() => ({ items: items }));
	}
	onDeckInputChange(name, value) {
		this.setState(() => ({ [name]: value }));
	}
	onCreateDeck() {
		const { title, description, items } = this.state;
		this.props.actions.createDeck({
			title: title,
			description: description,
			items: items
		});
	}

	render() {
		const { title, description, items } = this.state;
		return (
			<Header className="newDeck-page">
				<div className="container">
					<div className="row">
						<h2>New deck page</h2>
						<div className="text-right col-xs-12">
							<button
								onClick={this.onAddCard}
								type="button"
								className="newItem--btn btn btn-primary"
							>
								New item +
							</button>
						</div>
					</div>
					<div className="row">
						<form onSubmit={e => e.preventDefault()} className="col-xs-3 editDeckInfo--wrapper">
							<div className="editDeckInfo">
								<div className="form-group">
									<label htmlFor="title">Deck title</label>
									<input
										onChange={e => this.onDeckInputChange(e.target.name, e.target.value)}
										value={title}
										name="title"
										className="form-control"
										type="text"
										placeholder="Give me a name..."
									/>
								</div>
								<div className="form-group">
									<label htmlFor="description">Deck description</label>
									<textarea
										onChange={e => this.onDeckInputChange(e.target.name, e.target.value)}
										value={description}
										name="description"
										className="form-control"
										type="textarea"
										placeholder="Add some details..."
									/>
								</div>
							</div>
							<button
								onClick={this.onCreateDeck}
								type="submit"
								className="btn btn-primary btn-block"
							>
								Create Deck
							</button>
						</form>
						<div className="col-xs-9 items--wrapper">
							{items &&
								items.length > 0 &&
								items.map((item, key) =>
									<EditItemCard
										item={item}
										onInputChange={e => this.onItemInputChange(e, key)}
										onRemove={() => this.onRemoveCard(key)}
										key={key}
									/>
								)}
						</div>
					</div>
				</div>
			</Header>
		);
	}
}

const mapStateToProps = state => ({
	deck: state.data.deck
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(deckActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckNewContainer);
