import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_SELF, DISMISS_ERROR, ITEM_ERROR, UPDATE_MESSAGE } from '../actions/types';
import { SESSION_ERROR } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', authenticated: false, self: '' };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case AUTH_USER:
			return { ...state, error: '', message: '', authenticated: true, self: action.payload.user };
		case UNAUTH_USER:
			return { ...state, error: '', message: '', authenticated: false, self: {} };
		case FETCH_SELF:
			return { ...state, error: '', message: '', authenticated: true, self: action.payload.user };

		case AUTH_ERROR:
			return { ...state, error: action.payload.error, message: action.payload.message };
		case SESSION_ERROR:
			return { ...state, error: action.payload.error, message: action.payload.message };
		case ITEM_ERROR:
			return { ...state, error: action.payload.error, message: action.payload.message };
		case DISMISS_ERROR:
			return { ...state, error: '', message: '' };
		case UPDATE_MESSAGE:
			return { ...state, error: action.payload.error , message: action.payload.message };
	}

	return state;
}
