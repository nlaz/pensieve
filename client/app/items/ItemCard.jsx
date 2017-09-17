import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import ItemProgressBar from './ItemProgressBar';

export default function ItemCard({ item, className }) {
  const maxTime = Math.max(moment(item.nextReviewDate).diff(item.updatedAt, 'hours'), 0);
  const progressTime = Math.max(moment(item.nextReviewDate).diff(moment(), 'hours'), 0);
  const progress = progressTime / maxTime * 100 || 0;

  return (
    <div className={`itemCard-wrapper ${className}`}>
      <Link to={`/items/${item._id}`} className="itemCard">
        <ItemProgressBar progress={progress} />
        <h5 style={{ margin: '0', fontSize: '16px' }}>{item.title}</h5>
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
