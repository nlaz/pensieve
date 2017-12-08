import React from "react";
import cx from "classnames";

import Button from "../button";

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.onClickOutside = this.onClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onClickOutside);
  }

  onClickOutside(e) {
    if (this.modal && !this.modal.contains(e.target)) {
      this.props.onDismiss();
    }
  }

  render() {
    const { title, children, narrow, onDismiss } = this.props;
    const classNames = cx("modal", { "modal--narrow": narrow });

    return (
      <div className={classNames} style={{ display: "block", opacity: 1 }}>
        <div ref={c => (this.modal = c)} className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex">
              <h5 className="h6 m-auto">{title}</h5>
              <Button onClick={onDismiss} type="button" className="close" aria-label="Close" reset>
                <span aria-hidden="true">&times;</span>
              </Button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    );
  }
}
