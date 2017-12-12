const INITIAL_STATE = {};

export default function deckReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "FETCH_DECK_SUCCESS":
      return { ...state, ...action.payload.deck };
    case "EDIT_DECK_SUCCESS":
      return { ...state, ...action.payload.deck };
    case "CREATE_DECK_SUCCESS":
      return { ...state, ...action.payload.deck };
    case "RESET_DECK_SUCCESS":
      return { ...state, ...action.payload.deck };
    case "DELETE_ITEM_SUCCESS": {
      const items = (state.items || []).filter(item => item._id !== action.payload.itemId);
      return { ...state, items };
    }
    case "CREATE_ITEM_SUCCESS": {
      const newItem = action.payload.item;
      return { ...state, items: [...state.items, newItem] };
    }
    case "EDIT_ITEM_SUCCESS": {
      const newItem = action.payload.item;
      const items = (state.items || []).map(item => (item._id === newItem._id ? newItem : item));
      return { ...state, items };
    }
    case "RESET_ITEM_SUCCESS": {
      const newItem = action.payload.item;
      const items = (state.items || []).map(item => (item._id === newItem._id ? newItem : item));
      return { ...state, items };
    }
    case "CLEAR_DECK":
      return INITIAL_STATE;
    case "DELETE_DECK_SUCCESS": {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}
