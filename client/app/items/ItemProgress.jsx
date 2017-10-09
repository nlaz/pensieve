import React from 'react';
import cx from 'classnames';
import moment from 'moment';

export default function ItemProgress({ item }) {
  const maxTime = Math.max(moment(item.nextReviewDate).diff(item.updatedAt, 'hours'), 0);
  const diffHours = moment(item.nextReviewDate).diff(moment(), 'hours');
  const progressTime = Math.max(diffHours, 0);
  const progress = progressTime / maxTime * 100 || 0;

  const dotClassNames = cx('progress-dot', {
    'progress-dot--good': progress > 60,
    'progress-dot--warm': progress > 30 && progress <= 60,
    'progress-dot--hot': progress <= 30
  });

  return (
    <div className="item-progress">
      <span className={dotClassNames} />
      {progress === 0 && <span className="progress-needsReview">Needs review</span>}
      <span className="progress-time">{diffHours} h</span>
    </div>
  );
}
