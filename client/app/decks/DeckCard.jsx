import React from 'react';
import { Link } from 'react-router';

export default function DeckCard({ deck, className }) {
  return (
    <div className={`deckCard-wrapper ${className}`}>
      <Link to={`/decks/${deck._id}`} className="deckCard">
        <div className="deckCard-stack-1" />
        <div className="deckCard-stack-2" />
        <span className="deckCard-itemCount">
          {deck.items.length}
          <img className="deckCard-cardIcon" src={require('../../assets/images/icons/cards.svg')} />
        </span>
        <h4 className="deckCard-title">{deck.title}</h4>
      </Link>
    </div>
  );
}
