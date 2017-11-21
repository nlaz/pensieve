import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Footer from '../../../components/Footer';
import Popover from '../../../components/Popover';
import PageTemplate from '../../../components/PageTemplate';
import * as itemActions from '../itemActions';

export function TimeLeft({ date }) {
  if (!date) {
    return false;
  }

  if (moment(date).isBefore(moment())) {
    return (
      <div className="item-timeLeft item-timeLeft--due">
        <span>due</span>
        <img className="icon-alarm" src={require('../../../assets/images/icons/alarm_red.svg')} />
      </div>
    );
  }

  return (
    <div className="item-timeLeft">
      <span>{moment().to(date, true)}</span>
      <img className="icon-alarm" src={require('../../../assets/images/icons/alarm.svg')} />
    </div>
  );
}

class ItemContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showAnswer: false };
    this.onItemClick = this.onItemClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onToggleHideItem = this.onToggleHideItem.bind(this);
  }

  componentWillMount() {
    const { item } = this.props;
    if (item._id !== this.props.params.itemId) {
      this.props.actions.fetchItem({ itemId: this.props.params.itemId, fields: 'deck' });
    }
  }

  onItemClick() {
    this.setState({ showAnswer: !this.state.showAnswer });
  }

  onEditClick() {
    const itemId = this.props.item._id;
    this.props.router.push(`/items/${itemId}/edit`);
  }

  onToggleHideItem(e, item) {
    e.preventDefault();
    e.stopPropagation();
    this.props.actions.toggleHideItem(item);
  }

  render() {
    const { item } = this.props;
    const { showAnswer } = this.state;

    if (!item || Object.keys(item).length === 0) {
      return (
        <PageTemplate className="item-page" footer={<Footer />}>
          <div className="col-md-8 col-md-offset-2 text-center margin-top">
            <span style={{ fontSize: '80px', fontWeight: 'bold' }}>😅</span>
            <h3 style={{ marginBottom: '40px' }}>Oops, that item does not seem to exist.</h3>
            <Link to="/" className="button button--primary">
              Go Home
            </Link>
          </div>
        </PageTemplate>
      );
    }

    const itemContent = showAnswer ? item.description : item.title;

    return (
      <PageTemplate className="item-page margin-top" footer={<Footer />}>
        <div className="container margin-top">
          <div className="row">
            <div className="col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
              <div className="item-header">
                <h5>ITEM</h5>
                <Popover
                  align="right"
                  ref={c => (this.overflow = c)}
                  className="itemPage-overflow"
                  trigger={
                    <span className="glyphicon glyphicon-option-vertical" aria-hidden="true" />
                  }
                >
                  <div className="popoverActions">
                    <div onClick={() => this.onShowModal(MODAL_TYPES.EDIT_DECK)} className="action">
                      Edit Card
                    </div>
                    <div
                      onClick={() => this.onShowModal(MODAL_TYPES.RESET_DECK)}
                      className="action border-top"
                    >
                      Reset Card
                    </div>
                    <div
                      onClick={() => this.onShowModal(MODAL_TYPES.DELETE_DECK)}
                      className="action"
                    >
                      Delete Card
                    </div>
                  </div>
                </Popover>
              </div>
              <hr />
              <div className="panel panel-default">
                <div className="panel-body" onClick={this.onItemClick}>
                  <div className="panel-face">
                    {!showAnswer ? <span>Front</span> : <span>Back</span>}
                  </div>
                  <TimeLeft date={item.nextReviewDate} />
                  <h3 className="text-center" style={{ margin: '0' }}>
                    {itemContent}
                  </h3>
                </div>
              </div>
              <div className="item-info">
                {item.deck && (
                  <p className="item-deckInfo">
                    Part of <span className="item-deckTitle">{item.deck.title}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }
}

const mapStateToProps = state => ({
  item: state.data.item
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(itemActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
