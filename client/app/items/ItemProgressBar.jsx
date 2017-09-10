import React from 'react';

export default function ItemProgressBar({ progress }) {
  return (
    <div className="progress">
      <div
        className="progress-bar progress-bar-info"
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
