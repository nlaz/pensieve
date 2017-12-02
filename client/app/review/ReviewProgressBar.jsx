import React from 'react';

export default function ReviewProgressBar({ progress }) {
  return (
    <div className="ReviewProgressBar progress">
      <div
        className="ReviewProgressBar__progress-bar progress-bar"
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
