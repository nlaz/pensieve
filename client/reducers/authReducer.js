export const UNAUTH_USER = 'unauthUser';
export const AUTH_ERROR = 'authError';

import { AUTH_USER, FETCH_SELF } from '../actions/types';
import { SESSION_ERROR } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', authenticated: false, self: '' };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case AUTH_USER:
			return { ...state, error: '', message: '', authenticated: true, self: action.payload.user };
		case UNAUTH_USER:
			return { ...state, authenticated: false, error: action.payload, self: {} };
		case AUTH_ERROR:
			return { ...state, error: action.payload };
		case FETCH_SELF:
			return { ...state, error: '', message: '', authenticated: true, self: action.payload.user };

		case SESSION_ERROR:
			return { ...state, error: action.payload, message: action.payload.message };
	}

	return state;
}
