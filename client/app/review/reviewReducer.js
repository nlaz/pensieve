import { CREATE_SESSION, FETCH_SESSION, FINISH_SESSION } from "./reviewActions";

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SESSION:
      return action.payload.session;
    case FINISH_SESSION:
      return action.payload.session;
    case CREATE_SESSION:
      return action.payload.session;
    default:
      return state;
  }
}
