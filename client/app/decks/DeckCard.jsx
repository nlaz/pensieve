import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';

export default function DeckCard({ deck, className }) {
  return (
    <div className={cx('deckCard-wrapper', className)}>
      <Link to={`/decks/${deck._id}`} className="deckCard">
        <span className="deckCard-itemCount">
          {deck.items.length}
          <img className="deckCard-cardIcon" src={require('../../assets/images/icons/cards.svg')} />
        </span>
        <h4 className="deckCard-title">{deck.title}</h4>
      </Link>
    </div>
  );
}
