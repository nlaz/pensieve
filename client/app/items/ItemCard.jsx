import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';
import moment from 'moment';
import ItemProgressBar from './ItemProgressBar';

export default function ItemCard({ item, className }) {
  const maxTime = Math.max(moment(item.nextReviewDate).diff(item.updatedAt, 'hours'), 0);
  const diffHours = moment(item.nextReviewDate).diff(moment(), 'hours');
  const progressTime = Math.max(diffHours, 0);
  const progress = progressTime / maxTime * 100 || 0;

  return (
    <div className={`itemCard-wrapper ${className}`}>
      <Link
        to={`/items/${item._id}`}
        className={cx('itemCard', { 'itemCard--hidden': item.hidden })}
      >
        <div className="progressWrapper" style={{ display: 'flex' }}>
          <ItemProgressBar progress={progress} />
          <span className="progress-time">{diffHours} h</span>
        </div>
        <h5 className="title" style={{ margin: '0', fontSize: '16px' }}>
          {item.title}
        </h5>
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
