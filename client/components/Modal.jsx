import React from 'react';
import cx from 'classnames';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.onClickOutside = this.onClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside);
  }
  onClickOutside(e) {
    if (this.modal && !this.modal.contains(e.target)) {
      this.props.onDismiss();
    }
  }

  render() {
    const { title, children, narrow, onDismiss } = this.props;
    const classNames = cx('modal', { 'modal--narrow': narrow });

    return (
      <div className={classNames} style={{ display: 'block', opacity: 1 }}>
        <div ref={c => (this.modal = c)} className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                onClick={onDismiss}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    );
  }
}
