import React from 'react';
import moment from 'moment';

export default function TimeLeft({ date }) {
  if (!date) {
    return false;
  }

  if (moment(date).isBefore(moment())) {
    return (
      <div className="badge badge-warning" style={{ padding: '6px' }}>
        <span>study due</span>
        <i className="fa fa-clock-o ml-1 fa-lg" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="badge badge-secondary" style={{ padding: '6px' }}>
      <span>study in {moment().to(date, true)}</span>
      <i className="fa fa-clock-o ml-1 fa-lg" aria-hidden="true" />
    </div>
  );
}
