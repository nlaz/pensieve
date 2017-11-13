import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router';

import Popover from '../../../components/Popover';

export default class DeckListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item, onHideItemClick } = this.props;
    const classNames = cx('deckHome-item', {
      'deckHome-item--hidden': item.hidden
    });

    return (
      <Link className={classNames} to={`/items/${item._id}`}>
        <span className="title">{item.title}</span>
        <div className="itemActions">
          <Popover
            align="right"
            trigger={
              <div onClick={this.onTogglePopover} className="itemAction-overflow">
                <span className="glyphicon glyphicon-option-horizontal" aria-hidden="true" />
              </div>
            }
          >
            <div className="popoverActions">
              <div className="action">Reset Item</div>
              <div className="action">Remove from Deck</div>
              <div className="action border-top">Delete Item</div>
            </div>
          </Popover>
          <div onClick={e => onHideItemClick(e, item)} className="itemAction-hideItem">
            {item.hidden ? (
              <span className="glyphicon glyphicon-eye-close" aria-hidden="true" />
            ) : (
              <span className="glyphicon glyphicon-eye-open" aria-hidden="true" />
            )}
          </div>
        </div>
      </Link>
    );
  }
}
