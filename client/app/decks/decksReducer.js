const INITIAL_STATE = [];

export default function decksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "FETCH_DECKS_SUCCESS":
      return action.payload.decks;
    case "DELETE_DECK_SUCCESS": {
      const decks = (state.decks || []).filter(deck => deck._id !== action.payload.itemId);
      return decks;
    }
    default:
      return state;
  }
}
