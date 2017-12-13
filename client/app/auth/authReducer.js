const INITIAL_STATE = { authenticated: false, self: {} };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "AUTH_USER_SUCCESS":
      return { ...state, authenticated: true, self: action.payload.user };
    case "LOGOUT_USER":
      return { ...state, authenticated: false, self: {} };
    default:
      return state;
  }
}
