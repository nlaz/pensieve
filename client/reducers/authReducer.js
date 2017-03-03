export const UNAUTH_USER = 'unauthUser';
export const AUTH_ERROR = 'authError';

import { AUTH_USER, FETCH_SELF } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', authenticated: false, self: '' };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case AUTH_USER:
			console.log(action.payload);
			return { ...state, error: '', message: '', authenticated: true, self: action.payload.user };
		case UNAUTH_USER:
			return { ...state, authenticated: false, error: action.payload };
		case AUTH_ERROR:
			return { ...state, error: action.payload };
		case FETCH_SELF:
			console.log('fetch reducer');
			return { ...state, error: '', message: '', authenticated: true, self: action.payload.user };
	}

	return state;
}
