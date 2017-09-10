import React from 'react';
import ProgressBar from './ItemProgressBar';

export default function ItemCard({ item, className }) {
  const maxTime = Math.max(moment(item.nextReviewDate).diff(item.updatedAt, 'hours'), 0);
  const progressTime = Math.max(moment(item.nextReviewDate).diff(moment(), 'hours'), 0);
  const progress = progressTime / maxTime * 100 || 0;

  return (
    <div className={`itemCard-wrapper ${className}`}>
      <Link to={`/items/${item._id}`} className="itemCard">
        <ProgressBar progress={progress} />
        <h5 style={{ margin: '0', fontSize: '16px', textAlign: 'center' }}>{item.title}</h5>
        {item.hidden && (
          <div className="hideIcon">
            <span className="glyphicon glyphicon-eye-close" aria-hidden="true" />
          </div>
        )}
      </Link>
    </div>
  );
}
