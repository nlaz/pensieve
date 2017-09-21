import { FETCH_ACTIVITY } from './activityActions';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ACTIVITY:
      return action.payload;
  }

  return state;
}
