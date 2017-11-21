import { FETCH_ACTIVITY } from './activityActions';
import { FETCH_SESSION_TYPES } from '../review/reviewActions';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ACTIVITY:
      return { ...state, ...action.payload };
    case FETCH_SESSION_TYPES:
      return { ...state, sessionTypes: action.payload };
  }

  return state;
}
