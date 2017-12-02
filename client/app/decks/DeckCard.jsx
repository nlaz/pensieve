import React from 'react';
import cx from 'classnames';
import pluralize from 'pluralize';
import { Link } from 'react-router';

export default function DeckCard({ deck, className }) {
  const { items } = deck;
  const classNames = cx(className);

  return (
    <div className={classNames}>
      <Link to={`/decks/${deck._id}`} className="DeckCard bg-white mt-4 position-relative">
        <span className="DeckCard__count text-secondary">
          {pluralize('cards', items.length, true)}
          {items.length > 1 ? (
            <i className="fa fa-files-o ml-2" aria-hidden="true" />
          ) : (
            <i className="fa fa-file-text-o ml-2" aria-hidden="true" />
          )}
        </span>
        <h4 className="text-dark font-weight-bold h6 m-0">{deck.title}</h4>
      </Link>
    </div>
  );
}
