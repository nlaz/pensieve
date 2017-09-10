import { AUTH_USER, UNAUTH_USER } from './authActions';

const INITIAL_STATE = { authenticated: false, self: {} };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, self: action.payload.user };
    case UNAUTH_USER:
      return { ...state, authenticated: false, self: {} };
  }

  return state;
}
