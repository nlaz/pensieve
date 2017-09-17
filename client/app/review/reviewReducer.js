import { CREATE_SESSION, FETCH_SESSION, FINISH_SESSION } from './reviewActions';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SESSION:
    case FINISH_SESSION:
    case CREATE_SESSION:
      return action.payload.session;
  }

  return state;
}
