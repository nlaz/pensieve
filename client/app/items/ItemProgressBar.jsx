import React from 'react';
import cx from 'classnames';

export default function ItemProgressBar({ progress }) {
  const classNames = cx('progress-bar', {
    'progress-bar--good': progress > 60,
    'progress-bar--warm': progress > 30 && progress <= 60,
    'progress-bar--hot': progress <= 30
  });

  if (progress === 0) {
    return (
      <div className="progress progress-reviewNow">
        <button className="button-reviewNow">Review now</button>
      </div>
    );
  }

  return (
    <div className="progress">
      <div
        className={classNames}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: `${progress}%` }}
      >
        <span className="sr-only">{progress}% Complete</span>
      </div>
    </div>
  );
}
