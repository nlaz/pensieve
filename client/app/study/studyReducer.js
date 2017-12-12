const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "FETCH_STUDY_TYPES_SUCCESS":
      return { ...state, types: action.payload };
    default:
      return state;
  }
}
