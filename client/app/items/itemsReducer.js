import { FETCH_ITEMS, EDIT_ITEM, DELETE_ITEM, CREATE_ITEM } from './itemActions';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.payload.items;
    case CREATE_ITEM:
      const { items = [] } = state;
      return [...items, action.payload.item];
    case EDIT_ITEM: {
      const updatedItem = action.payload.item;
      const items = state.map(item => (item._id === updatedItem._id ? updatedItem : item));
      return items;
    }
    case DELETE_ITEM: {
      const items = (state.items || []).filter(item => item._id != action.payload.itemId);
      return items;
    }
  }

  return state;
}
