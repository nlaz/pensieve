import React from 'react';

export default function ReviewProgressBar({ progress }) {
  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: `${progress}%`, backgroundColor: '#1574fb' }}
      >
        <span className="sr-only">{progress}% Complete</span>
      </div>
    </div>
  );
}
