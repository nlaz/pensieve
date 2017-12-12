import { CREATE_SESSION, FETCH_SESSION_SUCCESS } from "./reviewActions";

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "FETCH_SESSION_SUCCESS":
      return action.payload.session;
    case "CREATE_SESSION_SUCCESS":
      return action.payload.session;
    default:
      return state;
  }
}
