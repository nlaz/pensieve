import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

function Button({
  children,
  className,
  type,
  block,
  danger,
  disabled,
  primary,
  reset,
  onClick,
  ...other
}) {
  const classNames = cx(className, "Button btn", {
    "btn-default": !primary && !danger && !reset,
    "btn-primary": primary,
    "btn-block": block,
    "btn-danger": danger,
    "btn-reset": reset,
  });

  return (
    <button className={classNames} type={type} onClick={onClick} disabled={disabled} {...other}>
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
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  reset: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: "button",
};

export default Button;
