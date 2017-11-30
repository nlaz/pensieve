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

  toggle() {
    this.setState(state => ({ showPopover: !state.showPopover }));
  }

  onToggle(e) {
    e.preventDefault();
    this.setState(state => ({ showPopover: !state.showPopover }));
  }

  render() {
    const { trigger, align, children, className } = this.props;
    const { showPopover } = this.state;
    const classNames = cx('popover', {
      'popover--right': align === 'right',
      'popover--left': align === 'left'
    });

    return (
      <div ref={c => (this.popover = c)} className={cx(className, 'popover-wrapper')}>
        <div className="popver-trigger" onClick={this.onToggle}>
          {trigger}
        </div>
        {showPopover && (
          <div style={{ position: 'absolute', width: '100%' }}>
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
