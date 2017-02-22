export const AUTH_USER = 'authUser';
export const UNAUTH_USER = 'unauthUser';
export const AUTH_ERROR = 'authError';

import { LOGIN_SUCCESS } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return { ...state, error: '', message: '', authenticated: true };
		case UNAUTH_USER:
			return { ...state, authenticated: false, error: action.payload };
		case AUTH_ERROR:
			return { ...state, error: action.payload };
	}

	return state;
}
