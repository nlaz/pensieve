import React from 'react';
import cx from 'classnames';

export default function Footer({ className }) {
  return (
    <div className={cx('footer', 'text-center', className)}>
      <div className="footer-item">
        <span>Pensieve &copy; 2017</span>
      </div>
      {'|'}
      <div className="footer-item">
        <a href="mailto:hello@pensieve.space">Contact</a>
      </div>
    </div>
  );
}
