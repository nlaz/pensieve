import React from 'react';
import cx from 'classnames';

export default class Popover extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showPopover: false };
    this.onToggle = this.onToggle.bind(this);
    this.onClickOutside = this.onClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside);
  }

  onClickOutside(e) {
    if (this.popover && !this.popover.contains(e.target)) {
      this.setState(() => ({ showPopover: false }));
    }
  }

  onToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState(state => ({ showPopover: !state.showPopover }));
  }

  render() {
    const { trigger, align, children } = this.props;
    const { showPopover } = this.state;
    const classNames = cx('popover', {
      'popover--right': align === 'right',
      'popover--left': align === 'left'
    });

    return (
      <div ref={c => (this.popover = c)} className="popover-wrapper">
        <div className="popver-trigger" onClick={this.onToggle}>
          {trigger}
        </div>
        {showPopover && (
          <div style={{ position: 'absolute' }}>
            <div style={{ display: 'block', opacity: 1 }} className={classNames}>
              <div className="popover-content" onClick={e => e.preventDefault()}>
                {children}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
