import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from '../../../components/Header';
import * as itemActions from '../itemActions';

class ItemEditContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);

    // Set initial form values
    const { item = {} } = props;
    this.state = { title: item.title || '', description: item.description || '' };
  }

  componentWillMount() {
    const { item, params } = this.props;
    if (!item || item._id !== params.itemId) {
      this.props.actions.fetchItem(params.itemId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item !== this.props.item) {
      const { title, description } = nextProps.item;
      this.setState({ title: title, description: description });
    }
  }

  componentDidUpdate() {
    if (Object.keys(this.props.item).length === 0) {
      this.props.router.push('/items');
    }
  }

  onSave(event) {
    event.preventDefault();
    const { item } = this.props;
    const { title, description } = this.state;
    const itemId = item._id;
    this.props.actions.editItem({ itemId, title, description });
  }

  onChange(event) {
    const field = event.target.name;
    this.setState({ [field]: event.target.value });
  }

  onDeleteClick() {
    const itemId = this.props.item._id;
    this.props.actions.deleteItem(itemId);
  }

  render() {
    const deleteButton = (
      <button onClick={this.onDeleteClick} className="btn btn-danger pull-right">
        Delete
      </button>
    );

    return (
      <Header className="editItem-page">
        <div className="container">
          <div className="col-md-8 col-md-offset-2">
            <div className="page-header">
              <h2>Edit Item {deleteButton}</h2>
            </div>
            <form>
              <div className="form-group">
                <label htmlFor="titleInput">Title</label>
                <input
                  onChange={this.onChange}
                  value={this.state.title}
                  name="title"
                  id="titleInput"
                  className="form-control"
                  type="text"
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="descriptionInput">Description</label>
                <textarea
                  onChange={this.onChange}
                  value={this.state.description}
                  name="description"
                  id="descriptionInput"
                  className="form-control"
                  rows="5"
                />
              </div>

              <button onClick={this.onSave} type="submit" className="btn btn-primary btn-block">
                Update
              </button>
            </form>
          </div>
        </div>
      </Header>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(itemActions, dispatch)
});

const mapStateToProps = state => ({
  item: state.data.item
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemEditContainer);
