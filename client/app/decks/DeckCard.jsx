import React from 'react';

export function DeckCard({ deck }) {
  return (
    <div className="col-xs-6 col-sm-3 deckCard-wrapper">
      <Link to={`/decks/${deck._id}`} className="deckCard">
        <span className="deckCard-itemCount">
          {deck.items.length}
          <span className="glyphicon glyphicon-file" aria-hidden="true" />
        </span>
        <h4 className="deckCard-title">{deck.title}</h4>
        <p className="deckCard-subtitle">{deck.description}</p>
      </Link>
    </div>
  );
}
