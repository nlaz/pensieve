import {
  CREATE_DECK,
  EDIT_DECK,
  DELETE_DECK,
  FETCH_DECK,
  CLEAR_DECK,
  RESET_DECK
} from '../deckActions';
import { DELETE_ITEM, EDIT_ITEM, CREATE_ITEM, RESET_ITEM } from '../../items/itemActions';

const INITIAL_STATE = {};

export default function deckReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_DECK:
      return { ...state, ...action.payload.deck };
    case EDIT_DECK:
      return { ...state, ...action.payload.deck };
    case CREATE_DECK:
      return { ...state, ...action.payload.deck };
    case RESET_DECK:
      return { ...state, ...action.payload.deck };
    case DELETE_ITEM: {
      const items = (state.items || []).filter(item => item._id !== action.payload.itemId);
      return { ...state, items };
    }
    case CREATE_ITEM: {
      const newItem = action.payload.item;
      return { ...state, items: [...state.items, newItem] };
    }
    case EDIT_ITEM: {
      const newItem = action.payload.item;
      const items = (state.items || []).map(item => (item._id === newItem._id ? newItem : item));
      return { ...state, items };
    }
    case RESET_ITEM: {
      const newItem = action.payload.item;
      const items = (state.items || []).map(item => (item._id === newItem._id ? newItem : item));
      return { ...state, items };
    }
    case CLEAR_DECK:
      return INITIAL_STATE;
    case DELETE_DECK: {
      return INITIAL_STATE;
    }
  }
  return state;
}
