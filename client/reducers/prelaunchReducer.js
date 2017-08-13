import { EMAIL_SIGN_UP_PRELAUNCH, EMAIL_SIGN_UP_PRELAUNCH_ERROR } from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case EMAIL_SIGN_UP_PRELAUNCH:
			return { ...state, isSuccess: true };
		case EMAIL_SIGN_UP_PRELAUNCH_ERROR:
			return { ...state, hasErrored: true };
	}

	return state;
}
