import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as deckActions from '../deckActions';

import Header from '../../../components/header';

import NewItemCard from './NewItemCard';

class DeckNewContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: '', description: '', items: [{}, {}] };

    this.onAddCard = this.onAddCard.bind(this);
    this.onRemoveCard = this.onRemoveCard.bind(this);
    this.onCreateDeck = this.onCreateDeck.bind(this);
    this.onItemInputChange = this.onItemInputChange.bind(this);
    this.onDeckInputChange = this.onDeckInputChange.bind(this);
  }

  componentWillMount() {
    if (this.props.deck) {
      this.props.actions.clearDeck();
    }
  }

  componentDidUpdate() {
    if (Object.keys(this.props.deck).length > 0) {
      this.props.router.push(`/decks/` + this.props.deck._id);
    }
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
        <div className="container margin-top">
          <div className="row">
            <form className="form-saveDeck col-md-8 offset-md-2" onSubmit={e => e.preventDefault()}>
              <div className="newDeck-infoWrapper">
                <div className="newDeck-info">
                  <div className="form-group">
                    <label htmlFor="title">Deck title</label>
                    <input
                      onChange={e => this.onDeckInputChange(e.target.name, e.target.value)}
                      value={title}
                      name="title"
                      className="form-control"
                      type="text"
                      placeholder="Add a deck title..."
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
                      placeholder="Add a deck description..."
                    />
                  </div>
                </div>
                <hr />
              </div>
              <div className="margin-top">
                {items &&
                  items.length > 0 &&
                  items.map((item, key) => (
                    <NewItemCard
                      item={item}
                      onInputChange={e => this.onItemInputChange(e, key)}
                      onRemove={() => this.onRemoveCard(key)}
                      key={key}
                      index={key}
                    />
                  ))}
              </div>
              <button
                onClick={this.onAddCard}
                type="button"
                className="button-addItem btn btn-block"
              >
                Add item +
              </button>
              <div className="margin-top" style={{ display: 'flex' }}>
                <button onClick={this.onCreateDeck} className="btn btn-default col-xs-6">
                  Cancel
                </button>
                <button
                  onClick={this.onCreateDeck}
                  type="submit"
                  className="button button-saveDeck btn-primary col-xs-6"
                >
                  Create Deck
                </button>
              </div>
            </form>
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
