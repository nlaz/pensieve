import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
import ItemProgress from './ItemProgress';

export default function ItemCard({ item, className }) {
  return (
    <div className={`itemCard-wrapper ${className}`}>
      <Link
        to={`/items/${item._id}`}
        className={cx('itemCard', { 'itemCard--hidden': item.hidden })}
      >
        <ItemProgress item={item} />
        <h5 className="title">{item.title}</h5>
        <div className="hideIcon">
          {item.hidden ? (
            <span className="glyphicon glyphicon-eye-close" aria-hidden="true" />
          ) : (
            <span className="glyphicon glyphicon-eye-open" aria-hidden="true" />
          )}
        </div>
      </Link>
    </div>
  );
}
