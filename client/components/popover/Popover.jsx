import React from 'react';
import cx from 'classnames';

export default class Popover extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isActive: false };
    this.onClickOutside = this.onClickOutside.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutside);
  }

  onClickOutside(e) {
    if (this.popover && !this.popover.contains(e.target)) {
      this.setState(() => ({ isActive: false }));
    }
  }

  toggle() {
    this.setState(state => ({ isActive: !state.isActive }));
  }

  onToggle(e) {
    e.preventDefault();
    this.setState(state => ({ isActive: !state.isActive }));
  }

  render() {
    const { isActive } = this.state;
    const { trigger, align, children, className } = this.props;

    const classNames = cx('popover', {
      'popover--right': align === 'right',
      'popover--left': align === 'left'
    });

    return (
      <div ref={c => (this.popover = c)} className={cx(className, 'popover-wrapper')}>
        <div className="popver-trigger" onClick={this.onToggle}>
          {trigger}
        </div>
        {isActive && (
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
