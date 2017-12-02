import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

function Button({ children, className, type, block, danger, primary, onClick, ...other }) {
  const classNames = cx(className, 'Button btn', {
    'btn-primary': primary,
    'btn-block': block,
    'btn-danger': danger,
  });

  return (
    <button className={classNames} type={type} onClick={onClick} {...other}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
  block: PropTypes.bool,
  danger: PropTypes.bool,
  primary: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
