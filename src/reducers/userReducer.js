
export const FETCH_USER = 'fetchUser';
export const ERROR_RESPONSE = 'errorResponse';

const INITIAL_STATE = { profile: {}, message: '', error: '' };

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_USER:
			return { ...state, profile: action.payload.user };
		case ERROR_RESPONSE:
			return { ...state, error: action.payload };
	}

	return state;
}
