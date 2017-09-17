import { CREATE_DECK, EDIT_DECK, DELETE_DECK, FETCH_DECK } from '../deckActions';

const INITIAL_STATE = {};

export default function deckReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_DECK:
      return { ...state, ...action.payload.deck };
    case EDIT_DECK:
      return { ...state, ...action.payload.deck };
    case CREATE_DECK:
      return { ...state, ...action.payload.deck };
    case DELETE_DECK: {
      return INITIAL_STATE;
    }
  }
  return state;
}
