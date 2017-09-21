import React from 'react';
import { Link } from 'react-router';

export default function DeckCard({ deck, className }) {
  return (
    <div className={`deckCard-wrapper ${className}`}>
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
