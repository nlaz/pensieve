import React from 'react';
import cx from 'classnames';

export default function Footer({ className }) {
  return (
    <div className={cx('footer', 'text-center text-secondary mt-4', className)}>
      <small className="footer-item d-inline m-2">
        <span>Pensieve &copy; 2017</span>
      </small>
      &middot;
      <small className="footer-item d-inline m-2">
        <span>Feedback?</span>
        <a className="ml-2" href="mailto:hello@pensieve.space">
          Send me an email
        </a>
      </small>
      &middot;
      <small className="footer-item d-inline m-2">
        <a href="https://github.com/nlaz/pensieve">Contribute</a>
      </small>
    </div>
  );
}
